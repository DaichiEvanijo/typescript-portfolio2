import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns'

import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"



export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
  date?:string 
  reactions?:{
  [key:string]:number
  }
}
type PostsInitialStateType = {
  posts: Post[],
  status: string,
  error: string
}
const initialState: PostsInitialStateType = {
  posts: [],
  status: 'idle',
  error: ''
}

export const fetchPosts = createAsyncThunk('posts/fetschPosts', async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
  } catch (error) {
    throw new Error('error when fetching data')
  }
})

type addNewPostProps = {
  title:string,
  userId:string, 
  body:string,
}
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost:addNewPostProps) => {
  try{
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', initialPost)
    return response.data
  }catch(err){
    throw new Error('error when posting data')
  }
})


type updatePostProps = {
  userId:string,
  id:number,
  title:string, 
  body:string,
  reactions:{
    [key:string]:number
    }
}
export const updatePost = createAsyncThunk('posts/updatePost', async(initialPost:updatePostProps) => {
  const {id} = initialPost
  try{
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, initialPost)
    return response.data
  }catch(err){
    throw new Error('error when updating data')
  }
})

type deletePostProps ={
  id:number
}
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost:deletePostProps) => {
  const {id} = initialPost
  try{
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if(response?.status === 200 && response.status < 300){
      return initialPost
    }else{
      return `${response?.status}:${response?.statusText}`
    }   
  }catch(err){
    throw new Error('error when deleting data')
  }
})






const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost && existingPost.reactions) {
        existingPost.reactions[reaction] = (existingPost.reactions[reaction] || 0) + 1
        // in comparison : 
        // existingPost.reactions[reaction]++
        // これはreactionキーが存在するかしないかを確認しないで+1にする
      }
    }   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state,_action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.status = 'succeeded'
      let min = 1
      const loadedPosts = action.payload.map(post => ({
        ...post,
        date: sub(new Date(), { minutes: min++ }).toISOString(),
        reactions: {
          thumbUps: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      }));
      state.posts = state.posts.concat(loadedPosts)
      // return {
        //   ...state, posts:[...state.posts,...loadedPosts]
        // }
      })
      builder.addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'something went wrong'
      })
      builder.addCase(addNewPost.fulfilled, (state, action:PayloadAction<Post>) => {
        action.payload.userId = Number(action.payload.userId)
      action.payload.date = new Date().toISOString()
      action.payload.reactions ={
        thumbUps: 0,
        wow: 0,
        heart: 0,
          rocket: 0,
          coffee: 0,
      }
      state.posts.push(action.payload)
      // return {
      //   ...state, posts:[...state.posts, action.payload]
      // }
    })
    builder.addCase(updatePost.fulfilled, (state, action:PayloadAction<Post>) =>{
      if(!action.payload?.id){
        console.log('Update could not complete')
        console.log(action.payload)
        return
      }
      const {id} = action.payload
      const unchangedPosts = state.posts.filter(post => post.id !== id)
      action.payload.date = new Date().toISOString()
      action.payload.userId = Number(action.payload.userId)
      state.posts = [...unchangedPosts, action.payload]
      console.log(state.posts)
      console.log(state.status)
      // return {
        //   ...state, posts:[...unchangedPosts,action.payload]
        // }
      })
      builder.addCase(deletePost.fulfilled, (state,action: PayloadAction<deletePostProps|string>) =>{
        if (typeof action.payload === 'string') {
        console.log("Delete could not complete")
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = posts;
      // return {
      //   ...state, posts:unchangedPosts
      // }
    })
  }
})

export const selectAllPosts = (state:RootState) => state.posts.posts
export const getPostsStatus = (state:RootState) => state.posts.status
export const getPostsError = (state:RootState) => state.posts.error
export const selectPostById = (state:RootState,postId:string) => state.posts.posts.find(post => post.id === Number(postId))

export const selectPostByUserId =(state:RootState,userId:string) => state.posts.posts.filter(post => post.userId === Number(userId))

export default postsSlice.reducer

export const {reactionAdded} = postsSlice.actions
