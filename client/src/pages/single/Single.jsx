import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'
import  './single.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Single() {
  const [post,setPost] = useState({})
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  useEffect( () =>{
   const getPost = async()=>{
     const res = await axios.get('http://localhost:3000/api/posts/' + id)
     console.log(res.data.data)
     setPost(res.data.data)
   }
   getPost()
  },[])
  return (
    <>
    <Navbar/>
    <div className='single'>
        <SinglePost post={post}/>
        <Sidebar/>
    </div></>
    
  )
}
