import { request, config } from '../utils'
const { api } = config
const { train} = api

export async function query (params) {
  return request({
    url: train.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: train.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: train.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: train.deleteById,
    method: 'post',
    data: params,
  })
}



