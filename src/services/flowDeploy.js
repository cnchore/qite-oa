import { request, config } from '../utils'
const { api,baseURL } = config
const { workflow,employee,dictionary } = api

export async function getDeployPage (params) {
  return request({
    url: workflow.getDeployPage,
    method: 'get',
    data: params,
  })
}

export function getDiagramByDeployId (params) {
  return `${baseURL}${workflow.getDiagramByDeployId}`;
   
}
export async function getDic (params) {
  return request({
    url: dictionary.getList,
    method: 'get',
    data: params,
  })
}
export async function deploy (params) {
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open('POST', `${baseURL}${workflow.deploy}`);
    //xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    const data = new FormData(); // eslint-disable-line no-undef
    if (params) {
      Object.keys(params).map(function (key) {
        data.append(key, params[key]);
      });
    }

    data.append('file', params.file);
    //console.log(data)
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      //console.log(response)
      //resolve({ data: { link: response.data } });
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  })
}

export async function getPDPage (params) {
  return request({
    url: workflow.getPDPage,
    method: 'get',
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


