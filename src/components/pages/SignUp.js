import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import pic from '../../images/pic.png';
import M from 'materialize-css';


const SignUp=()=>{
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    useEffect(()=>{
        if(url)
        {
            uploadFields()
        }
    },[url])
    
    const uploadimage=()=>{
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
            console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            return M.toast({html:"Email Invalid",classes:"#e53935 red darken-1"})
        }
        if(name.length<3)
        {
            return M.toast({html:"Name must be greater than 2 characters",classes:"#e53935 red darken-1"})
        }
        if(password.length<6)
        {
            return M.toast({html:"Password must be greater than 5 characters",classes:"#e53935 red darken-1"})
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
            
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html:data.error,classes:"#e53935 red darken-1"})
            }
            else{
                M.toast({html:data.message,classes:"#4caf50 green"})
                history.push('/login')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const postData=()=>{
        if(image)
        {
            uploadimage()
        }
        else{
            uploadFields()
        }
        
    }
    return(
        <div className="mycard">
            <img src={pic} alt="pic" height="400px"></img>
            <div className="card authcard">
                <h2>Qwerty</h2>
                <h4 style={{fontSize:"13px"}}>--- Let's Connect ! ---</h4>
                <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e)=>{setName(e.target.value)}}>
                </input>
                <input 
                type="text" 
                placeholder="email" 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}>
                </input>
                <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}>
                </input>
                <div className="file-field input-field">
                <div className="btn">
                    <span>Upload pic</span>
                    <input type="file"
                    onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>
                    SignUp
                </button>
                <h5 style={{fontSize:"17px"}}>
                    <Link to='/login'>Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp