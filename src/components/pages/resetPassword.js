import React from 'react';
import {useState,useContext} from 'react';
import {UserContext} from '../../App.js' ;
import {Link,useHistory} from 'react-router-dom';
import pic from '../../images/pic.png'; 
import M from 'materialize-css';

const Reset=()=>{
    const history=useHistory()
    const [email,setEmail]=useState("")
    const postData=()=>{
        fetch("https://qwertians.herokuapp.com/resetpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
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
                               
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset