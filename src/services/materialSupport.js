import { request, config } from '../utils'
const { api } = config
const { materialSupport} = api

export async function query (params) {
  return request({
    url: materialSupport.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: materialSupport.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: materialSupport.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: materialSupport.deleteById,
    method: 'post',
    data: params,
  })
}
