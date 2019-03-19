export const state = () => ({
  desk: '',
  user: ''
})

export const mutations = {
  SET_DESK: (state, payload) => {
    state.desk = payload
  },
  SET_USER: (state, payload) => {
    state.user = payload
  }
}
