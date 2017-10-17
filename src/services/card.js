import { request, config } from '../utils'
const { api } = config
const { card} = api

export async function query (params) {
  return request({
    url: card.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: card.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: card.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: card.deleteById,
    method: 'post',
    data: params,
  })
}
