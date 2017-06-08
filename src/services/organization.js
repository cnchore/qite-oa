import { request, config } from '../utils'
const { api } = config
const { organization } = api

export async function query (params) {
  return request({
    url: organization.replace('/:id',''),
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: organization.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: organization,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: organization,
    method: 'patch',
    data: params,
  })
}
