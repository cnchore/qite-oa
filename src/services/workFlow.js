import { request, config } from '../utils'
const { api,baseURL } = config
const { workflow,employee,dictionary,organizations } = api

//startProcess,getMyTaskToDoPage,getMyTaskDonePage,getTaskFiledPage,getTaskInfo,audit,
//getDiagramByBusiness,getCommentListBybusiness,getTaskWaitSignPage,signTask
export function getDiagram (params) {
  return `${baseURL()}${workflow.getDiagram}?procDefId=${params.procDefId}&procInstId=${params.procInstId}`;
}
export async function getDic (params) {
  return request({
    url: dictionary.getList,
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
  return `${baseURL()}${workflow.getDiagramByBusiness}?busiId=${params.busiId}&busiCode=${params.busiCode}`;
}
export async function getCommentListBybusiness(params){
  return request({
    url:workflow.getCommentListBybusiness,
    method:'get',
    data:params,
  })
}
export async function getTaskWaitSignPage(params){
  return request({
    url:workflow.getTaskWaitSignPage,
    method:'get',
    data:params,
  })
}
export async function signTask(params){
  return request({
    url:workflow.signTask,
    method:'post',
    data:params,
  })
}

export async function getTaskListByBusinessKey(params){
  return request({
    url:workflow.getTaskListByBusinessKey,
    method:'get',
    data:params,
  })
}
export async function turnToDoTask(params){
  return request({
    url:workflow.turnToDoTask,
    method:'post',
    data:params,
  })
}