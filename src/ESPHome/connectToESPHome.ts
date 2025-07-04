import { logInfo, logError } from '@utils/logger';
import { ESPConnection } from './ESPConnection';
import { IESPConnection } from './IESPConnection';
import { connect, ESPHomeConnection } from './connect';
import { BLEProxy, getProxies } from './options';
import WebSocket from 'ws';

export const connectToESPHome = async (): Promise<IESPConnection> => {
  logInfo('[ESPHome] Connecting...');

  const proxies = getProxies();
  const connections =
    proxies.length == 0
      ? []
      : await Promise.all(
          proxies.map(async (config: BLEProxy) => {
            const connection = new WebSocketESPHomeConnection(config);
            return await connect(connection);
          })
        );
  return new ESPConnection(connections);
};

class WebSocketESPHomeConnection implements ESPHomeConnection {
  private ws?: WebSocket;
  private eventListeners: Map<string, ((...args: any[]) => void)[]> = new Map();
  private messageId = 0;
  private pendingRequests: Map<number, { resolve: (value: any) => void; reject: (error: any) => void }> = new Map();

  constructor(public config: BLEProxy) {
    this.host = config.host;
    this.port = config.port || 6053;
    this.password = config.password;
    this.connected = false;
  }

  public host: string;
  public port: number;
  public password?: string;
  public connected: boolean;

  connect(): void {
    const url = `ws://${this.host}:${this.port}`;
    this.ws = new WebSocket(url);
    
    this.ws.on('open', () => {
      logInfo('[ESPHome] WebSocket connected to:', this.host);
      this.connected = true;
      this.emit('authorized');
    });

    this.ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(message);
      } catch (error) {
        logError('[ESPHome] Error parsing message:', error);
      }
    });

    this.ws.on('error', (error: any) => {
      logError('[ESPHome] WebSocket error:', error);
      this.emit('error', error);
    });

    this.ws.on('close', () => {
      this.connected = false;
      logInfo('[ESPHome] WebSocket disconnected from:', this.host);
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
    this.connected = false;
  }

  on(event: string, listener: (...args: any[]) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  once(event: string, listener: (...args: any[]) => void): void {
    const onceWrapper = (...args: any[]) => {
      this.off(event, onceWrapper);
      listener(...args);
    };
    this.on(event, onceWrapper);
  }

  private emit(event: string, ...args: any[]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  private sendRequest(type: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      const id = ++this.messageId;
      const message = { id, type, ...data };
      
      this.pendingRequests.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(message));
    });
  }

  private handleMessage(message: any): void {
    if (message.id && this.pendingRequests.has(message.id)) {
      const { resolve } = this.pendingRequests.get(message.id)!;
      this.pendingRequests.delete(message.id);
      resolve(message);
    } else if (message.type === 'BluetoothLEAdvertisementResponse') {
      this.emit('message.BluetoothLEAdvertisementResponse', message);
    } else if (message.type === 'BluetoothDeviceConnectionResponse') {
      this.emit('message.BluetoothDeviceConnectionResponse', message);
    } else if (message.type === 'BluetoothGATTNotifyDataResponse') {
      this.emit('message.BluetoothGATTNotifyDataResponse', message);
    }
  }

  async deviceInfoService(): Promise<any> {
    return this.sendRequest('DeviceInfoRequest');
  }

  async pairBluetoothDeviceService(address: number): Promise<{ paired: boolean }> {
    const response = await this.sendRequest('BluetoothDevicePairRequest', { address });
    return { paired: response.paired };
  }

  async connectBluetoothDeviceService(address: number, addressType: number): Promise<void> {
    await this.sendRequest('BluetoothDeviceConnectRequest', { address, addressType });
  }

  async disconnectBluetoothDeviceService(address: number): Promise<void> {
    await this.sendRequest('BluetoothDeviceDisconnectRequest', { address });
  }

  async writeBluetoothGATTCharacteristicService(address: number, handle: number, data: Uint8Array, response: boolean): Promise<void> {
    await this.sendRequest('BluetoothGATTWriteRequest', {
      address,
      handle,
      data: Buffer.from(data).toString('base64'),
      response
    });
  }

  async listBluetoothGATTServicesService(address: number): Promise<{ servicesList: any[] }> {
    const response = await this.sendRequest('BluetoothGATTGetServicesRequest', { address });
    return { servicesList: response.services || [] };
  }

  async readBluetoothGATTCharacteristicService(address: number, handle: number): Promise<{ data: string }> {
    const response = await this.sendRequest('BluetoothGATTReadRequest', { address, handle });
    return { data: response.data };
  }

  async notifyBluetoothGATTCharacteristicService(address: number, handle: number): Promise<void> {
    await this.sendRequest('BluetoothGATTNotifyRequest', { address, handle });
  }

  async subscribeBluetoothAdvertisementService(): Promise<void> {
    await this.sendRequest('BluetoothAdvertisementRequest');
  }
}
