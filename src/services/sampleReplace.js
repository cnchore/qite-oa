import { request, config } from '../utils'
const { api } = config
const { sampleReplace} = api

export async function query (params) {
  return request({
    url: sampleReplace.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: sampleReplace.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: sampleReplace.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: sampleReplace.deleteById,
    method: 'post',
    data: params,
  })
}
