import { Link } from "react-router-dom"

import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";

import { useState } from "react";
import Hamburger from "hamburger-react";
import { useWindowSize } from "../app/useWindowSize";


const Header = () => {

  const [isClicked, setIsClicked] = useState(false);
  const windowSize = useWindowSize()

  return (
    <header className="container">
      <h1><Link to ="/"><FaReact className="icon" fontSize=" 40px" /><BiLogoTypescript fontSize=" 40px" className="icon" /></Link></h1>
      <nav>
        <ul className={` ${isClicked ? 'navbarchange' : ''}`}>
          <li onClick={() => windowSize < 767 ? setIsClicked(prev => !prev):null}><Link to="/">Home</Link></li>
          <li onClick={() => windowSize < 767 ? setIsClicked(prev => !prev):null}><Link to="/post">Create</Link></li>
          <li onClick={() => windowSize < 767 ? setIsClicked(prev => !prev):null}><Link to="/user">Users</Link></li>
        </ul>
      </nav>
      <div className="hamburger-menu">
        <Hamburger toggled={isClicked} toggle={setIsClicked} size={24} />
      </div>
    </header>
    
  )
}

export default Header