import { request, config } from '../utils'
const { api } = config
const { workflow,message,notice,knowledge } = api
export async function getMyTaskToDoPage(params){
  return request({
    url:workflow.getMyTaskToDoPage,
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
export async function getMessageList(params){
  return request({
    url:message.getPage,
    method:'get',
    data:params,
  })
}
export async function getNoticeList(params){
  return request({
    url:notice.query,
    method:'get',
    data:params,
  })
}
export async function getKnowledgeList(params){
  return request({
    url:knowledge.query,
    method:'get',
    data:params,
  })
}
