import m from 'mithril'

export default {
  view (vnode) {
    return m('main.layout', [
      m('nav.menu', [
        m('a.menu-item[href="/about"]', { oncreate: m.route.link }, 'About'),
        m('a.menu-item[href="/new"]', { oncreate: m.route.link }, 'New'),
        m('a.menu-item[href="/find"]', { oncreate: m.route.link }, 'Find')
      ]),
      m('section', vnode.children)
    ])
  }
}
