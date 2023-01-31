const machine = {
  namespaced: true,
  actions: {
    async getMachines() {
      let machines = await this.$axios.$get('/get-machine', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookiz.get('machine_dashboard.accessToken')
        }
      })
      return machines
    },
    async getMachineData({ commit }, payload) {
      let machineData = await this.$axios.$get(`/get-machine/${payload}`, {
        headers: {
          'Authorization': 'Bearer ' + this.$cookiz.get('machine_dashboard.accessToken')
        }
      })
      if (!machineData) {
        throw new Error('Machine Not Found!')
      }
      machineData.machineValues = [
        {
          name: 'Now',
          value: machineData.data.current_value
        },
        {
          name: 'Yesterday',
          value: machineData.data.day
        },
        {
          name: 'Last Month',
          value: machineData.data.month
        },
        {
          name: 'Last Year',
          value: machineData.data.year
        }
      ]
      return machineData
    }
  },
  mutations: {
  },

}
export default machine