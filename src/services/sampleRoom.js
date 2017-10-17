import { request, config } from '../utils'
const { api } = config
const { sampleRoom} = api

export async function query (params) {
  return request({
    url: sampleRoom.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: sampleRoom.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: sampleRoom.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: sampleRoom.deleteById,
    method: 'post',
    data: params,
  })
}



