import { request, config } from '../utils'
const { api } = config
const { seal} = api

export async function query (params) {
  return request({
    url: seal.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: seal.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: seal.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: seal.deleteById,
    method: 'post',
    data: params,
  })
}
