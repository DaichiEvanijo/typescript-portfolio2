import {Post} from "./postsSlice"

import { useAppDispatch } from "../../app/hooks"
import { reactionAdded } from "./postsSlice"





const reactionEmoji = {
  thumbUps:"👍",
  wow:"😮" ,
  heart:"❤️‍🔥" ,
  rocket: "🏎",
  coffee: "☕",
}


type ReacttionButtonsProps = {
  post : Post
}
const ReactionButtons = ({post}:ReacttionButtonsProps) => {
  const dispatch = useAppDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return(
      <button  key={name} type="button" onClick={()=> dispatch(reactionAdded({postId: post.id,reaction:name}))} className="reactionbutton">{emoji}{post.reactions?.[name]}</button>
    )
  })
  
  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButtons