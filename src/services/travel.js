import { request, config } from '../utils'
const { api } = config
const { travel,employee,dictionary } = api

export async function query (params) {
  return request({
    url: travel.query,
    method: 'get',
    data: params,
  })
}
export async function getList (params) {
  return request({
    url: travel.getList,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: travel.queryById,
    method: 'get',
    data: params,
  })
}
export async function getDic (params) {
  return request({
    url: dictionary.getList,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: travel.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: travel.deleteById,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: travel.submit,
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


