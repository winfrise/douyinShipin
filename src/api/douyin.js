import request from './request'


// 扫描目录
export const scanDir = (params) => {
  return request({
    url: '/scan-dir.php',
    method: 'get',
    params
  })
}


