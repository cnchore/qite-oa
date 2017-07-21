import { request, config } from '../utils'
const { api } = config
const { user,employee,menu } = api

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
export async function editPwd (params) {
  return request({
    url: user.editPwd,
    method: 'post',
    data: params,
  })
}

export async function getLoginUserMenu (params) {
  return request({
    url: menu.getLoginUserMenu,
    method: 'get',
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
