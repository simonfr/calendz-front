import ApiCalendarService from './api-calendar.service'

const CalendarService = {
  // ================================================
  // == Methods
  // ================================================
  getCurrentWeek: (email) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    return ApiCalendarService.get(`/week?firstname=${firstname}&lastname=${lastname}`)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  },

  getWeek: (email, date, force = false) => {
    const firstname = email.split('@')[0].split('.')[0]
    const lastname = email.split('@')[0].split('.')[1]

    // TODO: recreate date object in order to make sure it has the right format
    // /!\ date has to be of format: MM-DD-YY
    const url = force
      ? `/week/${date}?firstname=${firstname}&lastname=${lastname}&ignoreCache=true`
      : `/week/${date}?firstname=${firstname}&lastname=${lastname}`

    return ApiCalendarService.get(url)
      .then(res => res.data)
      .catch(err => Promise.reject(err.data))
  }
}

export default CalendarService
