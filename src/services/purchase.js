import { request, config } from '../utils'
const { api } = config
const { purchase,employee,dictionary } = api

export async function query (params) {
  return request({
    url: purchase.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: purchase.queryById,
    method: 'get',
    data: params,
  })
}

export async function getApplyList (params) {
  return request({
    url: purchase.getApplyList,
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
    url: purchase.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: purchase.deleteById,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: purchase.submit,
    method: 'post',
    data: params,
  })
}
export async function storeInDetail (params) {
  return request({
    url: purchase.storeInDetail,
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


