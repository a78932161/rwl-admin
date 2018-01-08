import axios from '@/fetch'

export function getOrder1(data) {
  return axios({
    method: 'post',
    url: '/shop/order/findbyproducttype',
    params: data

  })
}

export function getOrder2(data) {
  return axios({
    method: 'post',
    url: '/shop/order/findbyproducttype',
    params: data

  })
}
