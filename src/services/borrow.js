import { request, config } from '../utils'
const { api } = config
const { borrow} = api

export async function query (params) {
  return request({
    url: borrow.query,
    method: 'get',
    data: params,
  })
}
export async function getList (params) {
  return request({
    url: borrow.getList,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: borrow.queryById,
    method: 'get',
    data: params,
  })
}
export async function save (params) {
  return request({
    url: borrow.save,
    method: 'post',
    data: params,
  })
}
export async function deleteById (params) {
  return request({
    url: borrow.deleteById,
    method: 'post',
    data: params,
  })
}



