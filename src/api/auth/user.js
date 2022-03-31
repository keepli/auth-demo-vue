import request from '@/utils/request'

const user_url = '/admin/user'

export function getByPage(data) {
  return request({
    url: `${user_url}/page`,
    method: 'post',
    data
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

export function remove(userId) {
  return request({
    url: `${user_url}/${userId}`,
    method: 'delete'
  })
}

export default {
  getByPage,
  getById,
  create,
  alter,
  remove
}
