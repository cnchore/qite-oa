import { request, config } from '../utils'
const { api } = config
const { user,employee } = api

export async function login (params) {
  return request({
    url: user.login,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: user.logout,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: employee.queryById,
    method: 'get',
    data: params,
  })
}
