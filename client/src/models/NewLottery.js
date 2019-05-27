import m from 'mithril'

const DEFAULT_ROLL_FROM = 0
const DEFAULT_ROLL_TO = 100
const DEFAULT_DATE_RANGE_MS = 24 * 60 * 60 * 1000


export default {
  lottery: {
    name: '',
    description: '',
    rollFrom: DEFAULT_ROLL_FROM,
    rollTo: DEFAULT_ROLL_TO,
    dateRoll: new Date(Date.now() + DEFAULT_DATE_RANGE_MS),
  },
  
  isValidForm: false,
  isSubmitted: false,

  reset() {
    this.lottery.name = ''
    this.lottery.description = ''
    this.lottery.rollFrom = DEFAULT_ROLL_FROM
    this.lottery.rollTo = DEFAULT_ROLL_TO
    this.lottery.dateRoll = new Date(Date.now() + DEFAULT_DATE_RANGE_MS)

    this.isValidForm = false
    this.isSubmitted = false
  },

  validate() {
    this.isValidForm = this.lottery.name != '' &&
      this.lottery.dateRoll != null
  },

  create() {
    this.validate()
    if (!this.isValidForm) {
      return Promise.reject('invalid form')
    }

    return m.request({
      method: 'POST',
      url: process.env.LOTTERY_SERVER_HOST + '/api/lotteries',
      data: this.lottery,
      extract (xhr) {
        return {
          location: xhr.getResponseHeader('Location')
        }
      },
    }).then(result =>{
      this.reset()
      return result
    })
  }
}
