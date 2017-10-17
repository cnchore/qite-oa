import { request, config } from '../utils'
const { api } = config
const { shopUpgrade} = api

export async function query (params) {
  return request({
    url: shopUpgrade.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: shopUpgrade.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: shopUpgrade.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: shopUpgrade.deleteById,
    method: 'post',
    data: params,
  })
}
