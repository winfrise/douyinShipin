import request from './request'
// 获取文件树
export const getFileTree = (params) => {
  return request({
    url: '/file-tree.php',
    method: 'get',
    params
  })
}

// 扫描目录
export const scanDir = (params) => {
  return request({
    url: '/scan-dir.php',
    method: 'get',
    params
  })
}
