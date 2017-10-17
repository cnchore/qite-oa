import { request, config } from '../utils'
const { api } = config
const { ad} = api

export async function query (params) {
  return request({
    url: ad.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: ad.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: ad.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: ad.deleteById,
    method: 'post',
    data: params,
  })
}



