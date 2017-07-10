import { request, config } from '../utils'
const { api,bucket,baseURL } = config
const { knowledge,imgUpload } = api

export default function uploadImageCallBack(file,type) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', `${baseURL}${imgUpload}`);
      //xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('bucket', bucket);
      data.append('type', type);
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        //console.log(response)
        resolve({ data: { link: response.data } });
        //resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}
