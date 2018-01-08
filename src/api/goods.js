import axios from '@/fetch'

export function getGoods1() {
  return axios({
    method: 'post',
    url: '/shop/product/findbytype',
    params: {
      type: 1,
    }
  })
}
export function getGoods2() {
  return axios({
    method: 'post',
    url: '/shop/product/findbytype',
    params: {
      type: 2,
    }
  })
}
export function sxGoods(id,data) {
  return  axios({
    method: 'post',
    url: '/shop/product/update',
    params: {
      productid: id
    },
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

export function getGoodsid(oupid) {
  return axios({
    method: 'post',
    url: '/shop/product/getproduct',
    params: {
      productid: oupid
    }
  })
}

export  function upGoods(oupid,data) {
  return axios({
    method: 'post',
    url: '/shop/product/update',
    params: {
      productid: oupid
    },
    data: data
  })
}
