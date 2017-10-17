import { request, config } from '../utils'
const { api } = config
const { adReimburse} = api

export async function query (params) {
  return request({
    url: adReimburse.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: adReimburse.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: adReimburse.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: adReimburse.deleteById,
    method: 'post',
    data: params,
  })
}



