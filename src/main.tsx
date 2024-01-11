import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/index.scss'

import {HashRouter as Router, Routes, Route} from 'react-router-dom'

import {store} from "./app/store"
import {Provider} from "react-redux"

import {fetchUsers} from "./features/users/usersSlice";
store.dispatch(fetchUsers())
import { fetchPosts } from './features/posts/postsSlice.ts'
store.dispatch(fetchPosts())




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
