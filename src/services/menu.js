import { request, config } from '../utils'
const { api } = config
const { menu } = api

export async function query (params) {
  return request({
    url: menu.query,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: menu.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: menu.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: menu.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: menu.update,
    method: 'post',
    data: params,
  })
}
