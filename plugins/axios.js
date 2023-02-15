export default function ({ $axios, store, app }) {

  $axios.onRequest(async (config) => {
    let accessToken = app.$cookiz.get('machine_dashboard.accessToken')
    if (accessToken) {
      $axios.setToken(accessToken, 'Bearer')
    }
    return config
  })

  $axios.onError(async (error) => {
    if (error.response) {
      let { data: errorData } = error.response
      if (errorData.message == "jwt malformed") {
        await store.dispatch('user/logoutAction')
      }
    }
  })
}