import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App.js' ;
import M from 'materialize-css';
import {Link} from 'react-router-dom';


const Home=()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch("/allpost",{
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
    fetch("/like",{
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
    fetch("/unlike",{
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
    fetch("/comments",{
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
    fetch("/comments",{
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

const deletePost=(postId)=>{
    fetch("/myposts",{
        method:"delete",
        headers:{
            "Content-Type":"Application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        body:JSON.stringify({
            postId
        })
        })
        .then(resp=>
            resp.json())
        .then((result)=>{
            M.toast({html:"Deleted Successfully",classes:"#4caf50 green"})
            const newData=data.filter((item)=>{
                return item._id.toString()!== result._id.toString()
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
                data && state ?
                (
                
                data.map((item)=>{
                    return(
                        
                        <div className="card home-card" key={item._id}>
                            
                            <h5><Link to={item.postedby._id!==state._id ? "/profile/"+item.postedby._id :"/profile"}>{item.postedby.name}</Link></h5>
                        {
                            item.postedby._id===state._id ?
                            <i className="material-icons" style={{float:"right"}} onClick={()=>{deletePost(item._id)}}>delete</i>
                            :
                            null
                        }
                        
                        <div className="card-image">
                            <img src={item.picture} alt="pic"></img>
                        </div>
                        <div className="card-content">
                            {
                            item.likes.includes(state._id) ?
                            <i className="material-icons" style={{color:"red"}} onClick={()=>{unlikepost(item._id)}}>favorite</i>
                            :
                            <i className="material-icons" style={{color:"red"}} onClick={()=>{likepost(item._id)}}>favorite_border</i>
                            }
                            <h5>{item.title}</h5>
                            <h5>{item.likes.length} likes</h5>
                            <p>{item.body}</p>
                            {
                                item.comments.map((record)=>{
                                    return(<div style={{display:"flex",justifyContent:"space-between"}}>
                                    <h6 key={record._id}><span style={{fontWeight:"700"}}>{record.postedby.name}</span>   {record.text}</h6>
                                    {
                                        record.postedby._id===state._id ?
                                            <i className="material-icons" onClick={()=>deleteComment(record._id,item._id)}>delete</i>
                                            :
                                            null
                                    }
                                    </div>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                               makeComment(e.target[0].value,item._id)
                               e.target.reset();
                            }}>
                                <input type="text" placeholder="Add a comment" on></input>
                            </form>
                            
                        </div>
                    </div>
                    )
                })
                )
                :
                null                     
                
            } 
                  
        </div>
    )
}

export default Home