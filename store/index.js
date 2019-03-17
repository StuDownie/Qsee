export const state = () => ({
  desk: ''
})

export const mutations = {
  SET_DESK: (state, payload) => {
    state.desk = payload
  }
}
