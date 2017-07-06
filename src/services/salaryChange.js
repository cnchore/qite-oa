import { request, config } from '../utils'
const { api } = config
const { salaryChange,employee,dictionary } = api

export async function query (params) {
  return request({
    url: salaryChange.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: salaryChange.queryById,
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
    url: salaryChange.save,
    method: 'post',
    data: params,
  })
}
export async function submit (params) {
  return request({
    url: salaryChange.submit,
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


