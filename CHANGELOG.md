# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-01-XX

### Added
- Initial release of Octo June addon
- Support for Octo smart beds via BLE
- MQTT integration for Home Assistant
- BLE proxy support via ESPHome
- Motor control (head/feet raising/lowering/stopping)
- Light switch control (if supported by bed)
- Preset buttons and programming
- PIN lock support for secured beds

### Technical
- Based on smartbed-mqtt project
- Simplified to only support Octo bed type
- Maintains MQTT and BLE proxy functionality
- TypeScript implementation with proper type safety
