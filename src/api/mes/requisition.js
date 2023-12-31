import request from '@/utils/request'

// 查询领料单列表
export function listRequisition(query) {
  return request({
    url: '/mes/requisition/list',
    method: 'get',
    params: query
  })
}

// 查询领料单详细
export function getRequisition(id) {
  return request({
    url: '/mes/requisition/' + id,
    method: 'get'
  })
}

// 新增领料单
export function addRequisition(data) {
  return request({
    url: '/mes/requisition',
    method: 'post',
    data: data
  })
}

// 修改领料单
export function updateRequisition(data) {
  return request({
    url: '/mes/requisition',
    method: 'put',
    data: data
  })
}

// 删除领料单
export function delRequisition(id) {
  return request({
    url: '/mes/requisition/' + id,
    method: 'delete'
  })
}

// 导出领料单
export function exportRequisition(query) {
  return request({
    url: '/mes/requisition/export',
    method: 'get',
    params: query
  })
}