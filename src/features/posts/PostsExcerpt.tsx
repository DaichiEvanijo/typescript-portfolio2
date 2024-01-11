import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

import { Link } from "react-router-dom"

import {Post} from "./postsSlice"
type PostsExcerptProps = {
  post : Post
}
const PostsExcerpt = ({post}:PostsExcerptProps) => {
  return (
    <li className="individualpost">
      <h3>{post.title}</h3>
      <p>{`${(post.body).slice(0,50)}...`}</p>
      <div className="linkauthordate">
        <Link to={`/post/${post.id}`} className="link">View Post</Link>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </div>
      <ReactionButtons post={post}/>
    </li>
  )
}

export default PostsExcerpt