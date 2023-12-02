import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { Posts } from '../../components/posts/Posts'
import { Sidebar } from '../../components/sidebar/Sidebar'
import axios from 'axios'
import './home.css'
import { useLocation } from 'react-router-dom'

export const Home = () => {
    const [posts,setPosts] = useState([])
    const { search } = useLocation()

    console.log(search)

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("http://localhost:3000/api/posts" + search );
          console.log(res.data.data)
          setPosts(res.data.data);
          console.log(posts)
        };
        fetchPosts();
      }, [search])
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
    </div>
  )
}
