import { useParams } from "react-router"
import { useAppSelector } from "../../app/hooks";
import { deletePost, selectPostById } from "./postsSlice";
import { useState } from "react";
import { selectAllUsers } from "../users/usersSlice";

import { updatePost } from "./postsSlice";
import { useAppDispatch } from "../../app/hooks";

import { useNavigate } from "react-router";





type RouterParams ={
  postId?:string;
}
const EditPostForm = () => {
  const {postId}:RouterParams = useParams()
  const post = postId ? useAppSelector((state)=> selectPostById(state, postId)):null

  const users = useAppSelector(selectAllUsers)

  const dispatch = useAppDispatch()

  const [title, setTitle] = useState(post?.title||"")
  const [body, setBody] = useState(post?.body||"")
  const [userId, setUserId] = useState(post?.userId.toString()||"")
  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  const canSave = [title,body,userId].every(Boolean) && addRequestStatus==="idle"

  const navigate = useNavigate()

  const onSavePostClicked = () => {
    if(canSave && post){
      try {
        setAddRequestStatus("pending");
        dispatch(updatePost({userId, id:post.id, title, body, reactions:post?.reactions||{}})).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigate(`/post/${post.id}`)
      } catch (err) {
        console.log("Update could not complete");
      } finally {
        setAddRequestStatus("idle");
      }
    } 
  }

  const onDeletePostClicked =() => {
    if(post){
      try{
        setAddRequestStatus("pending")
        dispatch(deletePost({id:post.id})).unwrap()
        setTitle("");
        setBody("");
        setUserId("");
        navigate('/')
      } catch (err) {
        console.log("Delete could not complete");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  if(!post) {
    return (
      <section>
        <h2>page not found !!</h2>
      </section>
    )
  }
  
  return (
    <section className="editpostform">
      <h2>Edit new Post</h2>
      <form>
        <div>
          <label htmlFor="postTitle">Title:</label>
          <input type="text" id="postTitle" name="postTitle"value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={(e)=>setUserId(e.target.value)}>
            <option value=""></option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}
                </option>
                ))}
          </select>
        </div>
        <div>
          <label htmlFor="postBody">Content:</label>
          <textarea id="postBody" name="postBody" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="buttonsafteredit">
          <button type="button" onClick={onSavePostClicked} disabled={!canSave}
          className={`${canSave? null:"disabled"}`}>Save Post</button>
          <button type="button" onClick={onDeletePostClicked}>Delete Post</button>
        </div>
      </form>
    </section>
  )
}

export default EditPostForm