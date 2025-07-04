# Octo June

This project enables remote control of Octo smart beds from Home Assistant via MQTT.

## Support

### Local Bluetooth Low Energy (BLE)

<em>NOTE: This requires an [ESPHome BLE Proxy](#ble-proxy)</em>

- [Octo](#octo-support-ble) - Smart bed control via BLE

# Installation

- In HomeAssistant click Settings, Add-ons, and Add-on Store.
- Click the 3 dot menu in the top right and select Repositories.
- Paste https://github.com/bramboe/octo-june-new, click Add, and Close
- Select the Octo June add-on from the list, and click Install.
- Wait patiently for the build to finish.
- Click on Configuration and set type followed by the necessary configuration as described below.
- Click on Info and click Start.

## MQTT broker

An MQTT broker is required. The [Mosquitto official Add-On](https://github.com/home-assistant/addons/tree/master/mosquitto) is recommended. Go to Add-ons and search for MQTT, then follow the provided instructions.

## BLE proxy

For BLE controlled beds a dedicated ESP32 running ESPHome's bluetooth proxy is required. Due to limitations in ESPHome, specifically since 2023.7 only one connection can use the bluetooth proxy of an ESP32 at a time, the BLE proxy will need to not be added (or disabled if already added) to HomeAssistant. Use the [ESPHome Ready-Made Projects](https://esphome.io/projects/?type=bluetooth) page to create an ESPHome bluetooth proxy and join it to your network.

# Octo Support (BLE)

## Configuring

You must specify at least one bleProxy as demonstrated in the config defaults. You also need to supply at least one Octo controller with `name`, `friendlyName`, and optionally `pin`.

## Current features include:

- Buttons to trigger the presets
- Buttons to program the presets
- Switch for under bed lights
- Covers to control motors for raising, lowering, and stopping the head/feet

## Notes

This remains connected to the bed controller and due to the bed only accepting one connection it will stop you from using the app to control the bed.

If your bed has a PIN lock enabled, you must provide the 4-digit PIN in the configuration.

## Configuration Example

```json
{
  "mqtt_host": "<auto_detect>",
  "mqtt_port": "<auto_detect>",
  "mqtt_user": "<auto_detect>",
  "mqtt_password": "<auto_detect>",
  "type": "octo",
  "bleProxies": [
    {
      "host": "bluetooth-proxy.local"
    }
  ],
  "octoDevices": [
    {
      "name": "RC2",
      "friendlyName": "Octo Bed",
      "pin": "1234"
    }
  ]
}
```

## Author

Bram

## License

MIT
