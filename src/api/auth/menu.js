import request from '@/utils/request'

const user_url = '/admin/menu'

export function getMenuDropdown() {
  return request({
    url: `${user_url}/dropdown`,
    method: 'get',
  })
}

export function getAll() {
  return request({
    url: `${user_url}`,
    method: 'get',
  })
}

export function getById(id) {
  return request({
    url: `${user_url}/${id}`,
    method: 'get',
  })
}


export function create(data) {
  return request({
    url: `${user_url}`,
    method: 'post',
    data
  })
}

export function alter(data) {
  return request({
    url: `${user_url}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `${user_url}/${id}`,
    method: 'delete'
  })
}

export default {
  getMenuDropdown,
  getAll,
  getById,
  create,
  alter,
  remove
}
