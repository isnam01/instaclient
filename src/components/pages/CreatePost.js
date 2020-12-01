import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost=()=>{
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    useEffect(()=>{
        if(url)
        {
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url,
                })  
            }).then((res)=>{
                    res.json()
                    if(res.ok)
                    {
                    M.toast({html:"Created Post Successfully",classes:"#4caf50 green"})
                    history.push('/')
                    
                    }
                    else{
                    M.toast({html:res.err,classes:"#e53935 red darken-1"})
                    console.log("error")
                    }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[url])

    const postimage=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram")
        data.append("cloud_name","mansi-gupta")
        fetch("https://api.cloudinary.com/v1_1/mansi-gupta/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then((data)=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="card input-field" style={{
            maxWidth:"500px",
            margin:"40px auto",
            padding:"20px",
            textAlign:"center"
        }}>
            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>
                setTitle(e.target.value)
            } />
            <input 
            type="text" 
            placeholder="Enter some text"
            value={body}
            onChange={(e)=>
                setBody(e.target.value)
            }
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light" onClick={()=>postimage()}>
                    Post
            </button>
        </div>
    )
}

export default CreatePost