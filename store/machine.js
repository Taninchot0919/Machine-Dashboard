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
      machineData = machineData.machine_data
      return machineData
    }
  },
  mutations: {
  },

}
export default machine