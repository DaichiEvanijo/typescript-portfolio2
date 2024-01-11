import { useState } from "react"

import { useAppSelector } from "../../app/hooks"
import { selectAllUsers } from "../users/usersSlice"

import { useAppDispatch } from "../../app/hooks"
import { addNewPost } from "./postsSlice"

import { useNavigate } from "react-router"



const AddPostForm = () => {
  const [title, setTitle]= useState("")
  const [userId, setUserId] = useState("")
  const [body, setBody]= useState("")

  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState("idle")
  
  const canSave = [title,body,userId].every(Boolean) && addRequestStatus==="idle"

  const navigate = useNavigate()

  const onSavePostClicked = () => {
    if(canSave){
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({title,userId,body})).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigate('/')
      } catch (err) {
        console.log("Create could not complete");
      } finally {
        setAddRequestStatus("idle");
      }
    } 
  }

  return (
    <section className="addpostform">
      <h2>Add new Post</h2>
      <form >
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
        <div className="buttonafteradd">
          <button type="button" onClick={onSavePostClicked} disabled={!canSave} className={`${canSave? null:"disabled"}`}>Save Post</button>
        </div>
      </form>
    </section>
  )
}

export default AddPostForm