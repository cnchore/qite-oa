import { request, config } from '../utils'
const { api } = config
const { car} = api

export async function query (params) {
  return request({
    url: car.getList,
    method: 'get',
    data: params,
  })
}

export async function queryById (params) {
  return request({
    url: car.getById,
    method: 'get',
    data: params,
  })
}

export async function save (params) {
  return request({
    url: car.save,
    method: 'post',
    data: params,
  })
}