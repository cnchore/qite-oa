import { request, config } from '../utils'
const { api } = config
const { urgentOrder} = api

export async function query (params) {
  return request({
    url: urgentOrder.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: urgentOrder.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: urgentOrder.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: urgentOrder.deleteById,
    method: 'post',
    data: params,
  })
}



