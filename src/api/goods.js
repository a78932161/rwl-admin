import axios from '@/fetch'

export function getGoods1(data) {
  return axios({
    method: 'post',
    url: '/shop/product/findbytype',
    params: data
  })
}
export function getGoods2(data) {
  return axios({
    method: 'post',
    url: '/shop/product/findbytype',
    params: data
  })
}
export function sxGoods(id,data) {
  return  axios({
    method: 'post',
    url: '/shop/product/update',
    params: id,
    data: data
  })
}
export  function  goodsAdd(data) {
  return axios({
    method: 'post',
    url: '/shop/product/save',
    data: data
  })
}

export function getGoodsid(data) {
  return axios({
    method: 'post',
    url: '/shop/product/getproduct',
    params: data
  })
}

export  function upGoods(oupid,data) {
  return axios({
    method: 'post',
    url: '/shop/product/update',
    params: oupid,
    data: data
  })
}
