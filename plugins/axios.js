import ErrorConstant from "../constants/ErrorConstant"

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
      if (errorData.message == ErrorConstant.JWT_MALFORM) {
        await store.dispatch('user/logoutAction')
      }
      if (errorData.code == 401) {
        if (errorData.message == ErrorConstant.AUTH_HEADER_REQUIRED) {
          await store.dispatch('user/logoutAction')
        }
      }
      app.$toast.error(errorData.message)
      throw new Error(errorData.message)
    }
  })
}