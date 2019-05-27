import m from 'mithril'

// import dotenv from 'dotenv'
// dotenv.config()

import About from './views/About'
import Find from './views/Find'
import Lottery from './views/Lottery'
import Layout from './views/Layout'
import NewLottery from './views/NewLottery'
import NotFound from './views/NotFound'

m.route(document.body, '/about', {
  '/about': {
    render () {
      return m(Layout, m(About))
    }
  },
  '/find': {
    render () {
      return m(Layout, m(Find))
    }
  },
  '/lottery/:key': {
    render (vnode) {
      return m(Layout, m(Lottery, vnode.attrs))
    }
  },
  '/new': {
    render () {
      return m(Layout, m(NewLottery))
    }
  },
  '/:any': {
    render () {
      return m(Layout, m(NotFound))
    }
  }
})
