export const D1 = (state, heartRates) => {
  const { vf } = state.ventricularRates
  return heartRates.filter(hr => hr > vf).length >= 8
}

export const D2 = (state, heartRates) => {

}

export const D3 = (state, heartRates) => {

}

export const D4 = (state, heartRates) => {

}

export const D5 = (state, heartRates) => {

}

export const D6 = (state, heartRates) => {

}

export const D7 = (state, heartRates) => {

}