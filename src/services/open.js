import { request, config } from '../utils'
const { api } = config
const { open} = api

export async function query (params) {
  return request({
    url: open.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: open.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: open.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: open.deleteById,
    method: 'post',
    data: params,
  })
}
