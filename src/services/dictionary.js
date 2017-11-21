import { request, config } from '../utils'
const { api } = config
const { dictionary } = api

export async function query (params) {
  return request({
    url: dictionary.query,
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
    url: dictionary.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: dictionary.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: dictionary.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: dictionary.update,
    method: 'post',
    data: params,
  })
}
