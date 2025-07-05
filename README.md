# Smart Bed MQTT

This project enables remote control of adjustable smart beds from HomeAssistant.

## Supported integrations:

- Octo
- Scanner

# Installation

- In HomeAssistant click Settings, Add-ons, and Add-on Store.
- Click the 3 dot menu in the top right and select Repositories.
- Paste your repository URL, click Add, and Close
- Select the Smartbed MQTT add-on from the list, and click Install.
- Wait for the build to finish.
- Click on Configuration and set type followed by the necessary configuration as described below.
- Click on Info and click Start.

## MQTT broker

An MQTT broker is required. The [Mosquitto official Add-On](https://github.com/home-assistant/addons/tree/master/mosquitto) is recommended. Go to Add-ons and search for MQTT, then follow the provided instructions.

# Octo Support (BLE)

## Configuring

You must specify at least one Octo controller with `name`, `friendlyName`, and optional `pin`.

## Current features include:

* Button for under bed lights, if present
* Covers to control motors for raising, lowering, and stopping the head/legs

## Notes

This remains connected to the bed controller and due to the bed only accepting one connection it will stop you from using the app to control the bed.

# Scanner Support

## Configuring

Refer to the configuration options for Scanner in the add-on.

# Support

For help with setup, or for sharing feedback please join the Discord server <https://discord.gg/Hf3kpFjbZs>
