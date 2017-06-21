import { request, config } from '../utils'
const { api,bucket } = config
const { knowledge,imgUpload } = api

export async function query (params) {
  return request({
    url: knowledge.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: knowledge.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: knowledge.add,
    method: 'post',
    data: params,
  })
}

export async function change (params) {
  return request({
    url: knowledge.change,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: knowledge.update,
    method: 'post',
    data: params,
  })
}
export async function fileUpload (params) {
  return request({
    url: imgUpload,
    method: 'post',
    data: {...params,bucket},
  })
}
