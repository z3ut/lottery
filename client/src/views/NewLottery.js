import m from 'mithril'
import DateTimePicker from '../components/DateTimePicker'
import NewLottery from '../models/NewLottery'

export default {
  view () {
    return m('form', {
        onsubmit (e) {
          e.preventDefault()
          NewLottery.create().then(result => {
            const parts = result.location.split('/')
            const id = parts[parts.length - 1]
            m.route.set('/lottery/' + id)
          }).catch(err => {
            alert('Error creating new lottery')
            console.log('Error creating new lottery', err)
          })
        }
      }, [
        m('label.label', 'Name'),
        m('input.input[type=text][placeholder=Name]', {
          oninput (e) {
            NewLottery.lottery.name = e.target.value
            NewLottery.validate()
          },
          value: NewLottery.lottery.name
        }),
        (NewLottery.isSubmittedWithError && NewLottery.lottery.name == '') ? m('.error', 'Enter name') : '',

        m('label.label', 'Description'),
        m('input.input[type=text][placeholder=Description]', {
          oninput (e) {
            NewLottery.lottery.description = e.target.value
            NewLottery.validate()
          },
          value: NewLottery.lottery.description
        }),

        m('label.label', 'Time'),
        m(DateTimePicker, {
          onChange (date) {
            NewLottery.lottery.date = date
            NewLottery.validate()
          },
          defaultDate: NewLottery.lottery.dateRoll
        }),

        m('label.label', 'Roll from'),
        m('input.input[type=number][placeholder=From]', {
          oninput (e) {
            NewLottery.lottery.rollFrom = e.target.value
            NewLottery.validate()
          },
          value: NewLottery.lottery.rollFrom
        }),

        m('label.label', 'Roll to'),
        m('input.input[type=number][placeholder=To]', {
          oninput (e) {
            NewLottery.lottery.rollTo = e.target.value
            NewLottery.validate()
          },
          value: NewLottery.lottery.rollTo
        }),

        m('button.button[type=submit]', {
          disabled: !NewLottery.isValidForm
        }, 'Create'),

        m('button.button[type=button]', {
          onclick () {
            NewLottery.reset()
          }
        }, 'Reset'),
      ]
    )
  }
}
