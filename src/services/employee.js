import { request, config } from '../utils'
const { api } = config
const { position,organizations,employee } = api

export async function query (params) {
  return request({
    url: employee.query,
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

export async function getPosition (params) {
  return request({
    url: position.getList,
    method: 'get',
    data: params,
  })
}
export async function queryById (params) {
  return request({
    url: employee.queryById,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: employee.add,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: employee.delete,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: employee.update,
    method: 'post',
    data: params,
  })
}
