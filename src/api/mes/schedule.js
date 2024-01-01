import request from '@/utils/request'

// 查询计划排产列表
export function listSchedule(query) {
  return request({
    url: '/mesPlan/productSchedule/list',
    method: 'get',
    params: query
  })
}

// 查询计划排产详细
export function getSchedule(id) {
  return request({
    url: '/mesPlan/productSchedule/' + id,
    method: 'get'
  })
}

// 新增计划排产
export function addSchedule(data) {
  return request({
    url: '/mes/schedule',
    method: 'post',
    data: data
  })
}

// 修改计划排产
export function updateSchedule(data) {
  return request({
    url: '/mes/schedule',
    method: 'put',
    data: data
  })
}

// 删除计划排产
export function delSchedule(id) {
  return request({
    url: '/mesPlan/productSchedule/' + id,
    method: 'delete'
  })
}

// 导出计划排产
export function exportSchedule(query) {
  return request({
    url: '/mesPlan/productSchedule/export',
    method: 'get',
    params: query
  })
}