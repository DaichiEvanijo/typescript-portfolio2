import { useParams } from "react-router"

import { useAppSelector } from "../../app/hooks"
import { selectPostById } from "./postsSlice"

import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"




type RouterParams ={
  postId?:string;
}
const SinglePostPage = () => {
  const {postId} :RouterParams = useParams()
  const post = postId ? useAppSelector((state)=>selectPostById(state,postId)): null
  
  if(!post) {
    return (
      <section>
        <h2>page not found !!</h2>
      </section>
    )
  }
  
  return (
    <article className="singlepostpage container">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="linkauthordate">
        <Link to={`/post/edit/${post.id}`} className="link">Edit Post</Link>
        <Link to="/" className="link">Back to postlist</Link>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </div>
      <ReactionButtons post={post}/>
    </article>
  )
}

export default SinglePostPage