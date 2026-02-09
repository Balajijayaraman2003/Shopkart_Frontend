import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name:"userData",
  initialState: {},
  reducers:{
    addUserData(state,action)
    {
      Object.assign(state,action.payload)
    },
    removeUserData(){
      return null
    }
  }
})

export const {addUserData,removeUserData} = userSlice.actions;
export default userSlice.reducer