import { request, config } from '../utils'
const { api } = config
const { renoSubsidy} = api

export async function query (params) {
  return request({
    url: renoSubsidy.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: renoSubsidy.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: renoSubsidy.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: renoSubsidy.deleteById,
    method: 'post',
    data: params,
  })
}
