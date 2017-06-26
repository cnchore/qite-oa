import { request, config } from '../utils'
const { api } = config
const { missClock,employee } = api

export async function query (params) {
  return request({
    url: missClock.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: missClock.queryById,
    method: 'get',
    data: params,
  })
}

export async function save (params) {
  return request({
    url: missClock.save,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: missClock.submit,
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


