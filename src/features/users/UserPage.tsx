import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersSlice";
import {selectPostByUserId } from "../posts/postsSlice";

import { useParams, Link } from "react-router-dom";


type RouterParams ={
  userId?:string;
}
const UserPage = () => {
  const {userId}:RouterParams = useParams()

  const user = userId ? useAppSelector(state => selectUserById(state, userId)) : null

  const postsForUser = userId ? useAppSelector(state => 
    selectPostByUserId(state,userId)) : null
  // 代替は以下
  // const postsForUser = useAppSelector(state => {
  //   const allPosts = selectAllPosts(state)
  //   return allPosts.filter(post => post.userId === Number(userId))
  // })

  const postTitles = postsForUser?.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))
  

  return (
    <section className="userpage">
      <h2>{`${user?.name}'s Posts`}</h2>
      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage
