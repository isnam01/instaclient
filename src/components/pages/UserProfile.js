import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App.js' ;
import {useParams} from 'react-router-dom';


const UserProfile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [userProfile,setProfile]=useState([])
    const {userid}=useParams()
    const [showFollow,setFollow]=useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`https://qwertians.herokuapp.com/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(resp=>{
            resp.json()
            .then((data)=>{
                console.log(data)
                setProfile(data)
            }).catch((err)=>{
                console.log(err)
            })
        })        
        .catch((err)=>{
            console.log(err)
        })
    },[userid])

    const followUser=()=>{
        fetch('https://qwertians.herokuapp.com/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        })
        .then(resp=>{
            resp.json()
            .then((data)=>{
                console.log(data)
                dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:[
                                ...prevState.user.followers,
                                data._id
                            ]
                        }
                    }

                })
                setFollow(false)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

    const unfollowUser=()=>{
        fetch('https://qwertians.herokuapp.com/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        })
        .then(resp=>{
            resp.json()
            .then((data)=>{
                console.log(data)
                dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    const newfollower=prevState.user.followers.filter(item=>item.toString()!==data._id.toString())
                    return {
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:newfollower
                        }
                    }

                })
                setFollow(true)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <>
        {
            userProfile ?
            (
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
                    src={userProfile? userProfile.picture:null} alt="pic"></img>
                </div>
                <div>
                   <h5>
                       {
                           userProfile.user ?
                           (
                           userProfile.user.name
                           )
                           :
                           null
                       }
                   </h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"105%"}}>
                       <p>{
                           userProfile.posts ?
                           (
                           userProfile.posts.length 
                           )
                           :
                           "Loading..."
                       } posts</p>
                        <p>{
                           userProfile.user ?
                           (
                           userProfile.user.followers.length 
                           )
                           :
                           "Loading..."
                       } followers</p>
                        <p>{
                           userProfile.user ?
                           (
                           userProfile.user.following.length 
                           )
                           :
                           "Loading..."
                       } following</p>
                       
                       {showFollow ?
                       (
                       <button className="btn waves-effect waves-light" onClick={()=>followUser()}>
                            Follow
                        </button>
                       ) :
                        <button className="btn waves-effect waves-light" onClick={()=>unfollowUser()}>
                            Unfollow
                        </button>
                        }
                   </div>
                </div>

            </div>
            <div className="gallery">
                {
                    userProfile.posts ?
                    (
                    userProfile.posts.map((item)=>{
                        return(
                            <img className="item" key={item._id} src={item.picture} alt="pic"></img>
                        )
                    })
                    )
                    :
                    "Loading..."
                }
            </div>
        </div>
        )
        :
        <h3>Loading...</h3>
    }
    </>  
    )
}

export default UserProfile