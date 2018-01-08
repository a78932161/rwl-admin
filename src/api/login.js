import axios from '@/fetch'

export function  loginApi(data) {
  return  axios({
    url: "http://rtest.rwlai.cn/shop/shop/login",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: "post",
    data
  })

}
