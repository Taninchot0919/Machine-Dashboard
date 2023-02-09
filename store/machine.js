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
    async createMachine(store, payload) {
      let machines = await this.$axios.$post('/create-machine', payload, {
        headers: {
          'Authorization': 'Bearer ' + this.$cookiz.get('machine_dashboard.accessToken')
        }
      },)
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
        headers: {
          'Authorization': 'Bearer ' + this.$cookiz.get('machine_dashboard.accessToken')
        },
        params: {
          find_by: findByCondition
        }
      })
      return chartData
    }
  },
  mutations: {
  },

}
export default machine