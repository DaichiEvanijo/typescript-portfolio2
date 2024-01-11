import { Post } from "./postsSlice"

type PaginationProps = {
  posts:Post[]
  postsPerPage:number,
  currentPage:number,
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}
const Pagination = ({posts, postsPerPage, currentPage, setCurrentPage}:PaginationProps) => {
  
  let pages :number[]=[]
  for(let i = 0; i<Math.ceil(posts.length/postsPerPage);i++){
    pages.push(i+1)
  }

  return (
    <div className="paginationbuttonlist">
      {pages.map((page, index) => {
        return(
          <button key={index} onClick={()=>setCurrentPage(page)} className={currentPage === page ? "activebutton" : ""}>{page}</button>
        )
      })}
    </div>
  )
}

export default Pagination