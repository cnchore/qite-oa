import { request, config } from '../utils'
const { api } = config
const { notice,employee,organizations } = api

export async function query (params) {
  return request({
    url: notice.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: notice.queryById,
    method: 'get',
    data: params,
  })
}
export async function getDic (params) {
  return request({
    url: organizations.query,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: notice.save,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: notice.submit,
    method: 'post',
    data: params,
  })
}
export async function queryEmployee (params) {
  return request({
    url: employee.query,
    method: 'get',
    data: params,
  })
}


