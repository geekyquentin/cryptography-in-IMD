const defaultParams = {
  lowBatteryValue: 20,
  randomRange: {
    min: 30,
    max: 220
  },
  minHeartRate: {
    min: 30,
    max: 75
  },
  vtDetection: {
    min: 120,
    max: 180
  },
  vt2Detection: {
    min: 160,
    max: 210
  },
  vfDetection: {
    min: 140,
    max: 190
  },
  minCounter: 10,
  shockDose: {
    min: 10,
    max: 80
  },
  nightHeartRate: {
    min: 50,
    max: 120
  },
  upperHeartRate: 220,
  modes: [
    "Shelf Mode",
    "Therapy Off Mode",
    "Therapy On Mode",
    "MRI Protection Mode"
  ],
  defaultMode: 0,
  mriSwitchMode: 2,
  mriTimeout: [6, 9, 12, 24],
  maxBatteryLevel: 100,
  defaultDepletionRate: 0.1,
  rescueShockChargingTime: 5
}

export default defaultParams