import { request, config } from '../utils'
const { api } = config
const { travelReimburse,employee,dictionary,travel } = api

export async function query (params) {
  return request({
    url: travelReimburse.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: travelReimburse.queryById,
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

export async function getTravelList (params) {
  return request({
    url: travel.getList,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: travelReimburse.save,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: travelReimburse.submit,
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


