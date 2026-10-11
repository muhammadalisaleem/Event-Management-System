import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getEvents, getEventById } from '../api/ticketmaster'
import { formatEvent } from '../utils/formatEvent'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await getEvents(filters)
      return {
        events: data.events.map(formatEvent),
        page: data.page,
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getEventById(id)
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  list: [],
  totalPages: 0,
  currentPage: 0,
  loading: false,
  error: null,
  selectedEvent: null,
  detailsLoading: false,
  detailsError: null,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.events
        state.totalPages = action.payload.page ? action.payload.page.totalPages : 0
        state.currentPage = action.payload.page ? action.payload.page.number : 0
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.detailsLoading = true
        state.detailsError = null
        state.selectedEvent = null
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.detailsLoading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.detailsLoading = false
        state.detailsError = action.payload || 'Something went wrong'
      })
  },
})

export const { clearSelectedEvent } = eventsSlice.actions
export default eventsSlice.reducer
