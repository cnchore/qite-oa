import { request, config } from '../utils'
const { api } = config
const { auditConfig} = api

export async function query (params) {
  return request({
    url: auditConfig.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: auditConfig.queryById,
    method: 'get',
    data: params,
  })
}
export async function add (params) {
  return request({
    url: auditConfig.add,
    method: 'post',
    data: params,
  })
}
export async function update (params) {
  return request({
    url: auditConfig.update,
    method: 'post',
    data: params,
  })
}
export async function saveUserAudit (params) {
  return request({
    url: auditConfig.saveUserAudit,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: auditConfig.deleteById,
    method: 'post',
    data: params,
  })
}



