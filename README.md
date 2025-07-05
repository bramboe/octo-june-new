# Smart Bed MQTT

<<<<<<< HEAD
This project aims to enable remote control of adjustable smart beds from HomeAssistant.

## Support is for:

### Local Bluetooth Low Energy (BLE)

<em>NOTE: The following requires an [ESPHome BLE Proxy](#ble-proxy)</em>

- [Octo](#octo-support-ble) [prototype]
=======
This project enables remote control of adjustable smart beds from HomeAssistant.

## Supported integrations:

- Octo
- Scanner
>>>>>>> upstream-main

# Installation

- In HomeAssistant click Settings, Add-ons, and Add-on Store.
- Click the 3 dot menu in the top right and select Repositories.
<<<<<<< HEAD
- Paste https://github.com/bramboe/octo-june-new/, click Add, and Close
- Select the Smartbed MQTT add-on from the list, and click Install.
- Wait patiently for the build to finish.
=======
- Paste your repository URL, click Add, and Close
- Select the Smartbed MQTT add-on from the list, and click Install.
- Wait for the build to finish.
>>>>>>> upstream-main
- Click on Configuration and set type followed by the necessary configuration as described below.
- Click on Info and click Start.

## MQTT broker

An MQTT broker is required. The [Mosquitto official Add-On](https://github.com/home-assistant/addons/tree/master/mosquitto) is recommended. Go to Add-ons and search for MQTT, then follow the provided instructions.

<<<<<<< HEAD
## BLE proxy

For BLE controlled beds a dedicated ESP32 running ESPHome's bluetooth proxy is required. Due to limitations in ESPHome, specifically since 2023.7 only one connection can use the bluetooth proxy of an ESP32 at a time, the BLE proxy will need to not be added (or disabled if already added) to HomeAssistant. Use the [ESPHome Ready-Made Projects](https://esphome.io/projects/?type=bluetooth) page to create an ESPHome bluetooth proxy and join it to your network.

=======
>>>>>>> upstream-main
# Octo Support (BLE)

## Configuring

<<<<<<< HEAD
You must specify at least one bleProxy as demonstrated in the config defaults. You also need to supply at least one Octo controller with `name`, `friendlyName`, and optional `pin`.
=======
You must specify at least one Octo controller with `name`, `friendlyName`, and optional `pin`.
>>>>>>> upstream-main

## Current features include:

* Button for under bed lights, if present
* Covers to control motors for raising, lowering, and stopping the head/legs

## Notes

This remains connected to the bed controller and due to the bed only accepting one connection it will stop you from using the app to control the bed.

<<<<<<< HEAD
Initial prototyping was only possible due to assistance from Murp on Discord.
=======
# Scanner Support

## Configuring

Refer to the configuration options for Scanner in the add-on.
>>>>>>> upstream-main

# Support

For help with setup, or for sharing feedback please join the Discord server <https://discord.gg/Hf3kpFjbZs>
