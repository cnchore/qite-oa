import { request, config } from '../utils'
const { api } = config
const { user } = api

export async function login (data) {
  return request({
    url: user.login,
    method: 'post',
    data,
  })
}
