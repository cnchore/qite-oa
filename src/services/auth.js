import { request, config } from '../utils'
const { api } = config
const { auth,menu,roles } = api

export async function query (params) {
  return request({
    url: menu.query,
    method: 'get',
    data: params,
  })
}

export async function queryRole (params) {
  return request({
    url: roles.getList,
    method: 'get',
    data: params,
  })
}

export async function saveMenuRole (params) {
  return request({
    url: auth.menuRole,
    method: 'post',
    data: params,
  })
}

export async function saveUserRole (params) {
  return request({
    url: auth.userRole,
    method: 'post',
    data: params,
  })
}
