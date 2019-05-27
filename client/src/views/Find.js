import m from 'mithril'
import Find from '../models/Find'

export default {
  oninit () {
    Find.id = null
  },
  view () {
    return m('.find', [
      m('label.label', 'Find lottery by id:'),
      m('input.input[placeholder=Lottery id]', {
        oninput (e) {
          Find.id = e.target.value
        },
        value: Find.id
      }),
      m('button.button', {
        onclick () {
          m.route.set('/lottery/' + Find.id)
        }
      }, 'Find')
    ])
  }
}
