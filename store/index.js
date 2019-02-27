export const state = () => ({
  counter: 0,
  tickets: [
    {
      id: 1,
      topic: 'Payments',
      printed: '2019/02/14 13:03:27',
      seen: '2019/02/14 13:45:27',
      wait: '42:00',
      completed: '2019/02/14 14:45:27',
      interaction: '60:00',
      desk: 1
    },
    {
      id: 2,
      topic: 'Council Tax enquiry',
      printed: '2019/02/14 13:50:53',
      seen: '2019/02/14 13:52:27',
      wait: '02:67',
      completed: '2019/02/14 13:59:27',
      interaction: '08:12',
      desk: 1
    },
    {
      id: 3,
      topic: 'Council Tax',
      printed: '2019/02/14 14:01:18',
      seen: '2019/02/14 14:10:00',
      wait: '09:02',
      completed: '2019/02/14 14:30:00',
      interaction: '20:00',
      desk: 3
    }
  ]
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}
