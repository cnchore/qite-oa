import { request, config } from '../utils'
const { api } = config
const { dinnerBook,employee,dictionary,organizations } = api

export async function query (params) {
  return request({
    url: dinnerBook.query,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: dinnerBook.queryById,
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
    url: dinnerBook.save,
    method: 'post',
    data: params,
  })
}
export async function getDinnerInfo (params) {
  return request({
    url: dinnerBook.getDinnerInfo,
    method: 'get',
    data: params,
  })
}
export async function change (params) {
  return request({
    url: dinnerBook.change,
    method: 'post',
    data: params,
  })
}
export async function queryEmployee (params) {
  return request({
    url: employee.getList,
    method: 'get',
    data: params,
  })
}

export async function getOrg (params) {
  return request({
    url: organizations.query,
    method: 'get',
    data: params,
  })
}

