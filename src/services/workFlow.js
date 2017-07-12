import { request, config } from '../utils'
const { api,baseURL } = config
const { workflow,employee,dictionary } = api

//startProcess,getMyTaskToDoPage,getMyTaskDonePage,getTaskFiledPage,getTaskInfo,audit,
//getDiagramByBusiness,getCommentListBybusiness
export function getDiagram (params) {
  return `${baseURL}${workflow.getDiagram}?procDefId=${params.procDefId}&procInstId=${params.procInstId}`;
}
export async function getDic (params) {
  return request({
    url: dictionary.getList,
    method: 'get',
    data: params,
  })
}
export async function startProcess(params){
  return request({
    url:workflow.startProcess,
    method:'post',
    data:params,
  })
}
export async function getMyTaskToDoPage(params){
  return request({
    url:workflow.getMyTaskToDoPage,
    method:'get',
    data:params,
  })
}
export async function getMyTaskDonePage(params){
  return request({
    url:workflow.getMyTaskDonePage,
    method:'get',
    data:params,
  })
}
export async function getTaskFiledPage(params){
  return request({
    url:workflow.getTaskFiledPage,
    method:'get',
    data:params,
  })
}
export async function getTaskInfo(params){
  return request({
    url:workflow.getTaskInfo,
    method:'get',
    data:params,
  })
}
export async function audit(params){
  return request({
    url:workflow.audit,
    method:'post',
    data:params,
  })
}

export function getDiagramByBusiness (params) {
  return `${baseURL}${workflow.getDiagramByBusiness}?busiId=${params.busiId}&busiCode=${params.busiCode}`;
}
export async function getCommentListBybusiness(params){
  return request({
    url:workflow.getCommentListBybusiness,
    method:'get',
    data:params,
  })
}

