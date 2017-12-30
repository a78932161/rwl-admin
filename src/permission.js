/**
 * Created by LHZQAQ on 2017/12/29.
 */


import router from '@/router'
import {getToken} from '@/auth'
  router.beforeEach((to, from, next) => {
  const nextRoute =['/login'];
  // console.log('beforeEach')
  // console.log(getToken())
  if(getToken()){
    if(to.path==='/login'){
      next({path: 'home'});
    }
    else{
      next();
    }
  }
  else{
    if(nextRoute.indexOf(to.path)!==-1){
      next();
    }
    else{
      next('/login');
    }
  }
});

