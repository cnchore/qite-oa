import { request, config } from '../utils'
const { api } = config
const { position,organizations,dictionary } = api

export async function query (params) {
  return request({
    url: position.query,
    method: 'get',
    data: params,
  })
}
export async function getOrg (params) {
  return request({
    url: organizations.query,
    method: 'get',
    data: params,
  })
}

export async function getDic (params) {
  return request({
    url: dictionary.getList,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: position.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: position.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: position.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: position.update,
    method: 'post',
    data: params,
  })
}
