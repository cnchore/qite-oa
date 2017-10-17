import { request, config } from '../utils'
const { api } = config
const { salesPromotion} = api

export async function query (params) {
  return request({
    url: salesPromotion.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: salesPromotion.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: salesPromotion.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: salesPromotion.deleteById,
    method: 'post',
    data: params,
  })
}



