import { request, config } from '../utils'
const { api } = config
const { promotionExpense} = api

export async function query (params) {
  return request({
    url: promotionExpense.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: promotionExpense.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: promotionExpense.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: promotionExpense.deleteById,
    method: 'post',
    data: params,
  })
}



