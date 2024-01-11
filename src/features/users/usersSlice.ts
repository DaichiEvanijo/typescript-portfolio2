import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../app/store"
import { PayloadAction } from "@reduxjs/toolkit";


type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type UserInitialStateType = User[]
const initialState:UserInitialStateType = []


export const fetchUsers = createAsyncThunk('users/fetchUsers', async() =>{
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
  }catch(err){
    throw new Error('Error fetching data')
  }
})



const usersSlice = createSlice({
name:'users',
initialState,
reducers:{},
extraReducers:(builder) => {
  builder.addCase(fetchUsers.fulfilled, (_state, action:PayloadAction<User[]>) => {
    return action.payload
  })
}
})

export const selectAllUsers = (state:RootState) => state.users
export const selectUserById = (state:RootState, userId:string) => state.users.find(user => user.id === Number(userId))

export default usersSlice.reducer

