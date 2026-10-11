import { createSlice } from '@reduxjs/toolkit'

// registrations are saved by user email
// example: { "ali@gmail.com": [ {event}, {event} ] }
const saved = JSON.parse(localStorage.getItem('registrations')) || {}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    byUser: saved,
  },
  reducers: {
    registerEvent: (state, action) => {
      const { email, event } = action.payload
      if (!state.byUser[email]) {
        state.byUser[email] = []
      }
      // stop duplicate registration
      const already = state.byUser[email].find((e) => e.id === event.id)
      if (already) return

      state.byUser[email].push({ ...event, registeredOn: new Date().toISOString() })
      localStorage.setItem('registrations', JSON.stringify(state.byUser))
    },
    cancelRegistration: (state, action) => {
      const { email, eventId } = action.payload
      if (!state.byUser[email]) return
      state.byUser[email] = state.byUser[email].filter((e) => e.id !== eventId)
      localStorage.setItem('registrations', JSON.stringify(state.byUser))
    },
  },
})

export const { registerEvent, cancelRegistration } = registrationsSlice.actions
export default registrationsSlice.reducer
