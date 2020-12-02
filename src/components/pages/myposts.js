import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App.js' ;
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import { rgbToHex } from '@material-ui/core';


const Myposts=()=>{
    const [data,setData]=useState([])
    const {state}=useContext(UserContext)
    useEffect(()=>{
        fetch("https://qwertians.herokuapp.com/posts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(resp=>{
            resp.json()
            .then((data)=>{
                setData(data.posts)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

const likepost=(id)=>{
    fetch("https://qwertians.herokuapp.com/like",{
        method:"put",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId:id
        })
        }).then(resp=>{
            resp.json()
            .then((result)=>{
                const newData=data.map((item)=>{
                    if(item._id.toString()===result._id.toString())
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

const unlikepost=(id)=>{
    fetch("https://qwertians.herokuapp.com/unlike",{
        method:"put",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId:id
        })
        }).then(resp=>{
            resp.json()
            .then((result)=>{
                const newData=data.map((item)=>{
                    if(item._id.toString()===result._id.toString())
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

const makeComment=(text,id)=>{
    fetch("https://qwertians.herokuapp.com/comments",{
        method:"put",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId:id,
            text,
        })
        }).then(resp=>{
            resp.json()
            .then((result)=>{
                const newData=data.map((item)=>{
                    if(item._id.toString()===result._id.toString())
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}
const deleteComment=(commId,id)=>{
    fetch("https://qwertians.herokuapp.com/comments",{
        method:"delete",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId:id,
            commId
        })
        }).then(resp=>{
            resp.json()
            .then((result)=>{
                M.toast({html:"Deleted Successfully",classes:"#4caf50 green"})
                const newData=data.map((item)=>{
                    if(item._id.toString()===result._id.toString())
                    {
                        return result
                    }
                    else{
                        return item
                    }
                })
                setData(newData)
            }).catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
}

const deletePost=(id)=>{
    fetch("https://qwertians.herokuapp.com/myposts",{
        method:"delete",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId:id
        })
        })
        .then(resp=>
            resp.json())
        .then((result)=>{
            M.toast({html:"Deleted Successfully",classes:"#4caf50 green"})
            const newData=data.filter((item)=>{
                return item._id.toString() !== result._id.toString()
            })
            setData(newData)
        }).catch((err)=>{
            M.toast({html:err,classes:"#e53935 red darken-1"})
            console.log(err)
        })
}
    return(
        <div className="home">
            {
                state && data ?
                (
                    
                data.map((item)=>{
                    return(
    
                        <div className="card home-card" key={item._id}>
                            <div className="head">
                            {console.log(typeof(state))}
                            <h5><Link to={item.postedby._id!==state._id? "/profile/"+item.postedby._id :"/profile"} style={{fontSize:"19px"}}>{item.postedby.name}</Link></h5>
                            {
                                item.postedby._id===state._id ?
                                <i className="material-icons" style={{float:"right",fontSize:"18px" ,color:"#282828"}} onClick={()=>{deletePost(item._id)}}>delete</i>
                                :
                                null
                            }
                        </div>
                        
                        <div className="card-image">
                            <img src={item.picture} alt="pic"></img>
                        </div>
                        <div className="card-content">
                            <div style={{display:"flex",justifyContent:"flex-start",fontSize:"15px"}}>
                                {                           
                                    item.likes.includes(state._id) ?
                                    <i className="material-icons" style={{color:"red"}} onClick={()=>{unlikepost(item._id)}}>favorite</i>
                                    :
                                    <i className="material-icons" style={{color:"red"}} onClick={()=>{likepost(item._id)}}>favorite_border</i>
                                }
                                    <h7 style={{margin:"5px"}}>{item.likes.length} likes</h7>
                            </div>
                            <h5 style={{fontWeight:"900",fontSize:"17px" }}>{item.title}</h5>
                            
                            <div style={{paddingTop:"15px"}}>
                            <p style={{fontWeight:"900",fontSize:"15px"}}>{item.comments.length} Comments</p>
                            <div style={{backgroundColor:"#F0F0F0",borderRadius:"5px",padding:"0 6px",margin:"3px"}}>
                            {
                                item.comments.map((record)=>{
                                    return(
                                    <div style={{display:"flex",justifyContent:"space-between",paddingTop:"5px"}}>
                                        <div style={{display:"flex"}}>
                                            <span style={{fontWeight:"900",fontSize:"14px" }}><b>{record.postedby.name} : </b></span>
                                            <span key={record._id} style={{fontSize:"14px",marginLeft:"4px", color:"#505050"}}>{record.text}</span>
                                        </div>
                                        {
                                            record.postedby._id===state._id ?
                                                <i className="material-icons" style={{fontSize:"14px"}} onClick={()=>deleteComment(record._id,item._id)}>delete</i>
                                                :
                                                null
                                        }
                                    </div>
                                    )
                                })
                            }
                            </div>
                            </div>
            
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                               makeComment(e.target[0].value,item._id)
                               e.target.reset();
                            }} style={{backgroundColor:"#F0F0F0",borderRadius:"5px",margin:"3px",marginTop:"10px",padding:"0 3px"}}>
                                <input type="text" placeholder="Add a comment" style={{fontSize:"13px",padding:"0",margin:"0",height:"26px"}} ></input>
                            </form>
                            
                        </div>
                    </div>
                    )
                })
                )
                : null      
                
            }   
        </div>
    )
}

export default Myposts