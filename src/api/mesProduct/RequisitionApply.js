import request from '@/utils/request'

// 查询领料申请列表
export function listRequisitionApply(query) {
  return request({
    url: '/mes/RequisitionApply/list',
    method: 'get',
    params: query
  })
}

// 查询领料申请详细
export function getRequisitionApply(id) {
  return request({
    url: '/mes/RequisitionApply/' + id,
    method: 'get'
  })
}

// 新增领料申请
export function addRequisitionApply(data) {
  return request({
    url: '/mes/RequisitionApply',
    method: 'post',
    data: data
  })
}

// 修改领料申请
export function updateRequisitionApply(data) {
  return request({
    url: '/mes/RequisitionApply',
    method: 'put',
    data: data
  })
}

// 删除领料申请
export function delRequisitionApply(id) {
  return request({
    url: '/mes/RequisitionApply/' + id,
    method: 'delete'
  })
}

// 导出领料申请
export function exportRequisitionApply(query) {
  return request({
    url: '/mes/RequisitionApply/export',
    method: 'get',
    params: query
  })
}