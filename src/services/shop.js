import { request, config } from '../utils'
const { api } = config
const { shop} = api

export async function query (params) {
  return request({
    url: shop.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: shop.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: shop.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: shop.deleteById,
    method: 'post',
    data: params,
  })
}
