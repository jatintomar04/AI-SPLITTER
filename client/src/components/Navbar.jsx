import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Searchmodel from "./Searchmodel";
import CreateGroupModal from "./Creategroupmodel";
import { logoutUser } from "../features/auth/authSlice";


const Navbar = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const dispatch = useDispatch()
  const location = useLocation();

  const {user} = useSelector ((state)=>state.auth)
  const [scrolled, setScrolled] = useState(false);
  
  const handleLogout =(e)=>{
    e.preventDefault()
    dispatch (logoutUser())
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  return (
    <nav

      className={`fixed top-0 left-0 right-0 z-50 flex items-cente justify-between px-6 md:px-12 py-5 border-b border-white/[0.07] transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl"
          : "bg-black"
      }`}
    >
      {/* Logo */}
      <Link to={'/'} className="text-[#c9a96e] font-serif-disp text-2xl tracking-tight">
        Splitwise
        <em className="not-italic text-amber-50">-Ai</em>
      </Link>

      {/* Nav Links */}
     

       {location.pathname === "/" && (
  <ul className="hidden md:flex gap-8">
    {["Features", "How it works", "Pricing"].map((l) => (
      <li key={l}>
        <a
          href={`#${l.toLowerCase().replace(/ /g, "-")}`}
          className="text-sm text-[#f0ede8]/45 hover:text-[#f0ede8] transition-colors duration-200 font-dm"
        >
          {l}
        </a>
      </li>
    ))}
  </ul>
)}
      
    { !user ?( 
      
      
     <div>
      
    
    <Link to={"/login"}
      aria-label="Get Started"
      className="bg-[#c9a96e] hover:bg-[#e8c990] text-[#0a0a0a] text-sm font-medium px-5 py-2 rounded-md transition-all duration-200 hover:-translate-y-0.5 font-dm"
    >
      Get Started
    </Link>
    </div>):(
         <div className="flex gap-3">
          <button
            onClick={() => setShowCreateGroupModal(true)}
            className=" bg-[#f3f1ee] hover:bg-[#e8c990] px-4 py-2 border border-zinc-700 rounded-md text-sm "
          >
            + Create Group
          </button>

         
           <button
    onClick={handleLogout}
    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
  >
    Logout
  </button>
        </div>
        
    )}
     <CreateGroupModal
      open={showCreateGroupModal}
      onClose={() => setShowCreateGroupModal(false)}
    />

    </nav>
  );
};


export default Navbar;  