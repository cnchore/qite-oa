import { request, config } from '../utils'
const { api } = config
const { roles } = api

export async function query (params) {
  return request({
    url: roles.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: roles.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: roles.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: roles.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: roles.update,
    method: 'post',
    data: params,
  })
}
