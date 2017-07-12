import { request, config } from '../utils'
const { api } = config
const { payment,employee,dictionary,purchase } = api

export async function query (params) {
  return request({
    url: payment.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: payment.queryById,
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
export async function getPurchaseList (params) {
  return request({
    url: purchase.getList,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: payment.save,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: payment.submit,
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

