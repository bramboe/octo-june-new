import { logError, logInfo } from '@utils/logger';
import WebSocket from 'ws';

export interface ESPHomeConnection {
  host: string;
  port: number;
  password?: string;
  connected: boolean;
  connect(): void;
  disconnect(): void;
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  once(event: string, listener: (...args: any[]) => void): void;
  deviceInfoService(): Promise<any>;
  pairBluetoothDeviceService(address: number): Promise<{ paired: boolean }>;
  connectBluetoothDeviceService(address: number, addressType: number): Promise<void>;
  disconnectBluetoothDeviceService(address: number): Promise<void>;
  writeBluetoothGATTCharacteristicService(address: number, handle: number, data: Uint8Array, response: boolean): Promise<void>;
  listBluetoothGATTServicesService(address: number): Promise<{ servicesList: any[] }>;
  readBluetoothGATTCharacteristicService(address: number, handle: number): Promise<{ data: string }>;
  notifyBluetoothGATTCharacteristicService(address: number, handle: number): Promise<void>;
  subscribeBluetoothAdvertisementService(): Promise<void>;
}

export const connect = (connection: ESPHomeConnection) => {
  return new Promise<ESPHomeConnection>((resolve, reject) => {
    const errorHandler = (error: any) => {
      logError('[ESPHome] Failed Connecting:', error);
      reject(error);
    };
    connection.once('authorized', async () => {
      logInfo('[ESPHome] Connected:', connection.host);
      connection.off('error', errorHandler);
      try {
        const deviceInfo = await connection.deviceInfoService();
        const { bluetoothProxyFeatureFlags } = deviceInfo as any;
        if (!bluetoothProxyFeatureFlags) {
          logError('[ESPHome] No Bluetooth proxy features detected:', connection.host);
          return reject();
        }
        resolve(connection);
      } catch (err) {
        logError('[ESPHome] Error getting device info:', err);
        reject(err);
      }
    });
    const doConnect = (handler: (error: any) => void) => {
      try {
        connection.once('error', handler);
        connection.connect();
        connection.off('error', handler);
        connection.once('error', errorHandler);
      } catch (err) {
        errorHandler(err);
      }
    };
    const retryHandler = (error: any) => {
      logError('[ESPHome] Failed Connecting (will retry):', error);
      doConnect(errorHandler);
    };
    doConnect(retryHandler);
  });
};
