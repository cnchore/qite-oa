import { request, config } from '../utils'
const { api } = config
const { segaApply} = api

export async function query (params) {
  return request({
    url: segaApply.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: segaApply.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: segaApply.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: segaApply.deleteById,
    method: 'post',
    data: params,
  })
}
