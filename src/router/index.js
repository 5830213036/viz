import Vue from 'vue'
import Router from 'vue-router'

//User
import Main from '@/components/User/Main'
import Detail from '@/components/User/Detail'
import Readmore from '@/components/User/Readmore'


// admin
import Overviews from '@/components/Admin/Overviews'
import Test from '@/components/Admin/Test'
import Editblog from '@/components/Admin/Editblog'
import Detailblog from '@/components/Admin/Detailblog'
import Addblog from '@/components/Admin/Addblog'
import Signin from '@/components/Admin/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/add-blog',
      name: 'Addblog',
      component: Addblog
    },
    // {
    //   path: '/sign-in',
    //   name: 'Signin',
    //   component: Signin
    // }
    
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
    ,
    {
      path: '/edit-blog/:edit_slug',
      name: 'Editblog',
      component: Editblog
    }
    ,
    {
      path: '/detailblog/:detail_slug',
      name: 'Detailblog',
      component: Detailblog
    }
    ,
    {
      path: '/test/',
      name: 'Test',
      component: Test
    }
    ,
    {
      path: '/Overviews',
      name: 'Overviews',
      component: Overviews
    },
    {
      path: '/Readmore',
      name: 'Readmore',
      component: Readmore
    }


  
    
  ]
})
