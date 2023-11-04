export const D1 = (vf, heartRates) => {
  return heartRates.filter(hr => hr > vf).length >= 8
}

export const D2 = (vf, heartRates) => {
  const belowVf = heartRates.filter(hr => hr < vf).length >= 6
  const lastOneBelowVf = heartRates[heartRates.length - 1] < vf

  return belowVf && lastOneBelowVf
}

export const D3 = (vt1, heartRates) => {
  return heartRates.filter(hr => hr > vt1).length >= 8
}

export const D4 = (vt1, heartRates) => {
  const belowVt1 = heartRates.filter(hr => hr < vt1).length >= 6
  const lastOneBelowVt1 = heartRates[heartRates.length - 1] < vt1

  return belowVt1 && lastOneBelowVt1
}

export const D5 = (vRate, aRate) => {
  return vRate - aRate >= 10
}

export const D6 = (state, heartRates) => {

}

export const D7 = (state, heartRates) => {

}