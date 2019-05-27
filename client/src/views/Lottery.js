import m from 'mithril'
import Lottery from '../models/Lottery'

export default {
  oninit (vnode) {
    if (vnode.attrs.key) {
      Lottery.loadLotteryById(vnode.attrs.key)
        .then(() => this.initLottery())
    }
  },

  view () {
    if (Lottery.isLoading) {
      return m('.loading', 'Loading . . .')
    }
    if (Lottery.isNotFound) {
      return m('.not-found', [
        m('p', 'Lottery with this id was not found'),
        m('a[href="/find"]', { oncreate: m.route.link }, 'Find another?')
      ])
    }
    return m('.lottery', [
      m('p', `Id: ${Lottery.lottery.id}`),
      m('p', `Name: ${Lottery.lottery.name}`),
      Lottery.lottery.description ? m('p', `Description: ${Lottery.lottery.description}`) : '',
      m('p', `Roll from: ${Lottery.lottery.rollFrom}`),
      m('p', `Roll to: ${Lottery.lottery.rollTo}`),
      Lottery.lottery.roll != null ? m('p', `Roll: ${Lottery.lottery.roll}`) : '',
      m('p', `Date roll: ${Lottery.lottery.dateRoll}`),
      m('p', `Date created: ${Lottery.lottery.dateCreated}`)
    ])
  }
}
