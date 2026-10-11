import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import eventsReducer from '../features/eventsSlice'
import registrationsReducer from '../features/registrationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

export default store
