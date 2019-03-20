export const state = () => ({
  desk: '',
  signingOut: 'false',
  user: 'logged-out'
})

export const mutations = {
  SET_DESK: (state, payload) => {
    state.desk = payload
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  LOGIN_STATE: (state, payload) => {
    state.signingOut = payload
  }
}
