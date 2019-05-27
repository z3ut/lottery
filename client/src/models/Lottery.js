import m from 'mithril'

export default {
  isNotFound: false,
  isLoading: false,
  lottery: null,
  
  loadLotteryById (id) {
    return this.loadLotteryByUrl(process.env.LOTTERY_SERVER_HOST + '/api/lotteries/' + id)
  },

  loadLotteryByUrl (url) {
    this.lottery = null
    this.isLoading = true
    this.isNotFound = false

    return m.request({
      method: 'GET',
      url: url
    }).then(lottery => {
      this.lottery = lottery
      this.isLoading = false
    }).catch(err => {
      this.isNotFound = true
      this.isLoading = false
    })
  }
};
