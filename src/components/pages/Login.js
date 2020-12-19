import React from 'react';
import {useState,useContext} from 'react';
import {UserContext} from '../../App.js' ;
import {Link,useHistory} from 'react-router-dom';
import pic from '../../images/pic.png'; 
import M from 'materialize-css';

const Login=()=>{
    const {dispatch}=useContext(UserContext)
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const postData=()=>{
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
            
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html:data.error,classes:"#e53935 red darken-1"})
            }
            else{
                console.log(data)
                console.log(typeof(data.user))
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed In Successfully",classes:"#4caf50 green"})
                history.push('/')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <img src={pic} alt="pic" height="400px"></img>
            <div className="card authcard">
                <h2>Qwerty</h2>
                <h4 style={{fontSize:"13px"}}>--- Let's Connect ! ---</h4>
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
                               
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>
                    Login
                </button>
                <h5 style={{fontSize:"17px"}}>
                    <Link to='/signup'>Don't have an account?</Link>
                </h5>
                <h6 style={{fontSize:"13px"}}>
                    <Link to='/resetpassword'>Forgotten Password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login