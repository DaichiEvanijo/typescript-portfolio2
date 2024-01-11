import { useAppSelector } from "../../app/hooks" 
import { selectAllUsers } from "../users/usersSlice"

type PostAuthorProps = {
  userId:number
}
const PostAuthor = ({userId}:PostAuthorProps) => {
  const users = useAppSelector(selectAllUsers)
  const author = users.find(user => user.id === userId ) 
  
  return (
    <span>by {author?.name}</span>
  )
}

export default PostAuthor