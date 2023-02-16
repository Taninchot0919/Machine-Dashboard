const machine = {
  namespaced: true,
  actions: {
    async getMachines() {
      let machines = await this.$axios.$get('/get-machine')
      return machines
    },
    async createMachine(store, payload) {
      let machines = await this.$axios.$post('/create-machine', payload)
      return machines
    },
    async getMachineData({ commit }, payload) {
      let machineData = await this.$axios.$get(`/get-machine/${payload}`)
      if (!machineData) {
        throw new Error('Machine Not Found!')
      }
      machineData.machineValues = [
        {
          name: 'Now',
          value: machineData.data.now_value
        },
        {
          name: 'Yesterday',
          value: machineData.data.yesterday
        },
        {
          name: 'Last Month',
          value: machineData.data.last_month
        },
        {
          name: 'Last Year',
          value: machineData.data.last_year
        }
      ]
      return machineData
    },
    async getChartData({ commit }, payload) {
      let { machineId, findByCondition } = payload
      let chartData = await this.$axios.$get(`/get-machine-history/${machineId}`, {
        params: {
          find_by: findByCondition
        }
      })
      return chartData
    },
    async getMachineNow({ commit }, machineId) {
      let machineNow = await this.$axios.$get(`/get-machine-now/${machineId}`)
      return machineNow
    },
    async updateMachine({ commit }, payload) {
      let machine = await this.$axios.$patch(`/update-machine/${payload._id}`, {
        machineName: payload.machine_name,
        spreadSheetId: payload.spread_sheet_id,
      })
      return machine
    },
    async deleteMachine({ commit }, machineId) {
      let machine = await this.$axios.$delete(`/update-machine/${machineId}`)
      return machine
    }
  },
  mutations: {
  },

}
export default machine