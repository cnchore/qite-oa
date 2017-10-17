import { request, config } from '../utils'
const { api } = config
const { pick} = api

export async function query (params) {
  return request({
    url: pick.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: pick.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: pick.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: pick.deleteById,
    method: 'post',
    data: params,
  })
}
