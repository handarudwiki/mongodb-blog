import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        const getCategories = async ()=>{
            const res = await axios.get('http://localhost:3000/api/categories')
            console.log(res.data.data)
            setCategories(res.data.data)
        }
        getCategories()
    },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img
          src="https://media.istockphoto.com/id/1458680071/photo/thoughtful-male-students-looking-through-window-on-a-break-in-the-classroom.webp?b=1&s=170667a&w=0&k=20&c=1_j8CPFnZ97dcTA30qiACWYZG-8ISIABOXDRHKo-PtI="
          alt=""
        />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta eos
          eum neque atque fugiat incidunt ipsam nobis excepturi sed totam ex,
          exercitationem fugit est cum rem aspernatur officiis facere dolorem
          iste repellat ut eligendi qui amet nesciunt? Culpa, dicta at sint
          harum eius, voluptate impedit magni eum, labore maiores eaque.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
            {categories.map((category)=>(
                <li className="sidebarListItem" key={category._id}>
                    <Link to={`/?cat=${category.name}`} className="link" >{category.name}</Link>                  
                    </li>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};
