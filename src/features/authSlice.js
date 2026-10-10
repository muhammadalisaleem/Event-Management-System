import { createSlice } from '@reduxjs/toolkit'

// get saved data from local storage
const savedUser = JSON.parse(localStorage.getItem('currentUser'))
const savedUsers = JSON.parse(localStorage.getItem('users')) || []

const initialState = {
  user: savedUser,
  users: savedUsers,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload
      const exists = state.users.find((u) => u.email === email)
      if (exists) {
        state.error = 'An account with this email already exists'
        return
      }
      const newUser = { name, email, password }
      state.users.push(newUser)
      state.user = { name, email }
      state.error = null
      localStorage.setItem('users', JSON.stringify(state.users))
      localStorage.setItem('currentUser', JSON.stringify(state.user))
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload
      const found = state.users.find(
        (u) => u.email === email && u.password === password
      )
      if (!found) {
        state.error = 'Invalid email or password'
        return
      }
      state.user = { name: found.name, email: found.email }
      state.error = null
      localStorage.setItem('currentUser', JSON.stringify(state.user))
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('currentUser')
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions
export default authSlice.reducer
