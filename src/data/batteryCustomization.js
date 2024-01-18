import defaultParams from "./defaultParams"

const batteryCustomization = {
  readingText: {
    fontSize: 30,
  },
  batteryBody: {
    cornerRadius: 8,
  },
  batteryCap: {
    cornerRadius: 5,
    capToBodyRatio: 0.5
  },
  batteryMeter: {
    lowBatteryValue: defaultParams.lowBatteryValue,
    outerGap: 0
  },
}

export default batteryCustomization