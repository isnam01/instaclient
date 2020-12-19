import React from 'react';
import {useState} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import pic from '../../images/pic.png'; 
import M from 'materialize-css';

const Newp=()=>{
    const history=useHistory()
    const [password,setPassword]=useState("")
    const {token}=useParams()
    const postData=()=>{
        fetch("https://qwertians.herokuapp.com/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
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
                type="password" 
                placeholder="Enter new password" 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}>
                </input>
                               
                <button className="btn waves-effect waves-light" onClick={()=>postData()}>
                    Create new password
                </button>
            </div>
        </div>
    )
}

export default Newp