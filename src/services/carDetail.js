import { request, config } from '../utils'
const { api } = config
const { carDetail} = api

export async function getList (params) {
  return request({
    url: carDetail.getList,
    method: 'get',
    data: params,
  })
}
export async function query (params) {
  return request({
    url: carDetail.query,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: carDetail.getById,
    method: 'get',
    data: params,
  })
}

export async function save (params) {
  return request({
    url: carDetail.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: carDetail.deleteById,
    method: 'post',
    data: params,
  })
}