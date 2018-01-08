import axios from '@/fetch'

export function getOrder1() {
  return  axios({
    method: 'post',
    url: '/shop/order/findbyproducttype',
    params: {
      producttype: 1,
    }
})}
  export function getOrder2() {
    return axios({
      method: 'post',
      url: '/shop/order/findbyproducttype',
      params: {
        producttype: 2
      }
    })
  }
