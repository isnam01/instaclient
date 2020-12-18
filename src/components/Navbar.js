import React,{useContext,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import Modal from 'react-modal'
import { post } from 'jquery';

const Navbar=()=>{
    var {state,dispatch}=useContext(UserContext)
    if(typeof(state)==="string")
    {
        state=JSON.parse(state)
    }
    const history=useHistory()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [search, setsearch] = useState("")
    const [userdetails,setuserdeatils]=useState([])
    const renderList=()=>{
        if(state)
        {
            return [
                <li style={{color:"black"}} key="1" onClick={() => setModalIsOpen(true)}><i className="material-icons">search</i></li>,
                <li style={{color:"black"}} key="2"><Link to="/profile">Profile</Link></li>,
                <li style={{color:"black"}} key="3"><Link to="/createpost">Create Post</Link></li>,
                <li style={{color:"black"}} key="4"><Link to="/explore">Explore</Link></li>,
                <li key="5">
                <button className="btn waves-effect waves-light" 
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}>
                    Logout
                </button>
                </li>
            ]
        }
        else{
            return [
                <li key="6"><Link to="/login">Login</Link></li>,
                <li key="7"><Link to="/signup">SignUp</Link></li>
            ]
        }
    }

    const fetchusers=((query)=>{
        setsearch(query)
        fetch('https://qwertians.herokuapp.com/search',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               query
            })
        })
        .then(resp=>resp.json())
        .then((results)=>{
            setuserdeatils(results)
        })
        .catch((err)=>{
            console.log(err)
        })
    }) 

    return(
        <>
        <nav>
            <div className="nav-wrapper white" style={{padding:"0px 30px"}}>
                <Link to={state?'/':'/login'} className="brand-logo left" ><span style={{fontSize:"40px",color:"#26466D"}}>Qwerty</span></Link>
                <Link to={state?'/':'/login'} data-target="mobile-demo" className="sidenav-trigger  right"><i className="material-icons">menu</i></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down items">
                   {renderList()}                    
                </ul>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="mymodal"
                ariaHideApp={false}
                overlayClassName="myoverlay"
                closeTimeoutMS={500}               
            >
                <input 
                type="text" 
                placeholder="Search a user" 
                value={search}
                onChange={(e)=>{fetchusers(e.target.value)}}>
                </input>
                <ul className="collection" style={{overflowY:"scroll",maxHeight:"150px"}}>
                    {
                        userdetails ?
                        (
                            userdetails.map((item)=>{
                                return (
                                <Link to={"/profile/"+item._id} onClick={()=>{setModalIsOpen(false); setsearch(''); setuserdeatils([])}}><li className="collection-item">{item.name}</li></Link>
                                )
                            })
                        )
                        :
                        null
                    }
                </ul>
                <div>
                <button onClick={() => setModalIsOpen(false)} style={{backgroundColor:"turquoise",border:"none",borderRadius:"3px",color:"white",padding:"7px"}}>Close</button>
                </div>
            </Modal>
        </nav>
        <ul className="sidenav" id="mobile-demo" style={{padding:"10px",textAlign:"center"}}>
            {renderList()} 
        </ul>
      </>
    )
}

export default Navbar;