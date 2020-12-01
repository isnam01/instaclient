import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App.js' ;

const Profile=()=>{
    const {state}=useContext(UserContext)
    const [data,setdata]=useState([])
    useEffect(()=>{
        fetch("https://qwertians.herokuapp.com/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(resp=>{
            resp.json()
            .then((data)=>{
                setdata(data)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return(
        <div style={{maxWidth:"700px",margin:"0px auto"}}>
            <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-around",
            margin:"18px auto",
            borderBottom:"1px solid gray"
            }}>
                <div>
                    <img style={{height:"100px" ,width:"100px",borderRadius:"50px"}}
                    src={state?state.picture:null} alt="pic"></img>
                </div>
                
                <div>
                   <h5> 
                    {                     
                    state ?
                    (
                        state.name
                    )
                    :"Loading..."
                    }
                    </h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"105%"}}>
                       <p>{
                           data ?
                           (
                           data.length 
                           )
                           :
                           "Loading..."
                       } posts</p>
                        <p>{
                           state ?
                           (
                            state.followers.length 
                           )
                           :
                           "Loading..."
                       } followers</p>
                        <p>{
                           state ?
                           (
                            state.following.length 
                           )
                           :
                           "Loading..."
                       } following</p>
                   </div>
                </div>

            </div>
            <div className="gallery">
                {
                    data.map((item)=>{
                        return(
                            <img className="item" key={item._id} src={item.picture} alt="pic"></img>
                        )
                    })
                }
            </div>
        </div>
    )
            
}

export default Profile