import { request, config } from '../utils'
const { api } = config
const { organizations } = api

export async function query (params) {
  return request({
    url: organizations.query,
    method: 'get',
    data: params,
  })
}
export async function queryAll (params) {
  return request({
    url: organizations.queryAll,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: organizations.queryById,
    method: 'get',
    data: params,
  })
}
export async function create (params) {
  return request({
    url: organizations.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: organizations.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: organizations.update,
    method: 'post',
    data: params,
  })
}
export async function change (params) {
  return request({
    url: organizations.change,
    method: 'post',
    data: params,
  })
}

