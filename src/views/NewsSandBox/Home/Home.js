import React from 'react'
import { Button } from 'antd';
import axios from 'axios'

export default function Home() {
  const ajax = () => {
    // get
    // axios.get("http://localhost:8000/posts").then(res =>
    //   console.log(res.data)
    // ) 

    //post
    // axios.post("http://localhost:8000/posts",{
    //   title:"33333333",
    //   author:"lixing3"
    // }) 

    //replace
    // axios.put("http://localhost:8000/posts/1",{
    //   title: "111111111-modify"
    // }) 

    //update/patch
    // axios.patch("http://localhost:8000/posts/1",{
    //   title: "111111111",
    //   author: "luxing11"
    // }) 

    //delete
    //axios.delete("http://localhost:8000/posts/1") 

    // _embed
    // axios.get("http://localhost:8000/posts?_embed=comments").then
    // (res=>{
    //   console.log(res.data)
    // })

    // _expand
    axios.get("http://localhost:8000/comments?_expand=post").then(res =>{
      console.log(res.data)
    })

  }
  
  return (
    <div>
      <Button type="primary" onClick={ajax}>Button</Button>
    </div>
  )
}
