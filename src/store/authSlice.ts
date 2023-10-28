import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user_id: -1,
	user_name: "asf",
	is_authenticated: true,
}

const authSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			state.user_id = action.payload.user_id
			state.user_name = action.payload.user_name
			state.is_authenticated = action.payload.is_authenticated
			state.is_moderator = action.payload.is_moderator
		},
		logOut: (state) => {
			state.is_authenticated = false
			state.user_id = -1
			state.user_name = ""
		}
	}
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer