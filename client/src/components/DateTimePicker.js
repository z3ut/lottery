import m from 'mithril'
import flatpickr from 'flatpickr'

export default function() {
  var fp

  return {
    oncreate (vnode) {
      fp = flatpickr(vnode.dom, {
        enableTime: true,
        time_24hr: true,
        minDate: 'today',
        defaultDate: vnode.attrs.defaultDate,
        
        onChange (selectedDates) {
          vnode.attrs.onChange(selectedDates[0])
        }
      });
    },
    onremove () {

    },
    view () {
      return m('input')
    }
  }
}