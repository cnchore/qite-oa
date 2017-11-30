import { request, config } from '../utils'
const { api } = config
const { logistics} = api

export async function query (params) {
  return request({
    url: logistics.getList,
    method: 'get',
    data: params,
  })
}
export async function getPage (params) {
  return request({
    url: logistics.query,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: logistics.getById,
    method: 'get',
    data: params,
  })
}

export async function save (params) {
  return request({
    url: logistics.save,
    method: 'post',
    data: params,
  })
}
export async function change (params) {
  return request({
    url: logistics.change,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: logistics.deleteById,
    method: 'post',
    data: params,
  })
}