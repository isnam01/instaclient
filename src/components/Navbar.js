import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App';


const Navbar=()=>{

    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const renderList=()=>{
        if(state)
        {
            return [
                <li style={{color:"black"}}><Link to="/profile">Profile</Link></li>,
                <li style={{color:"black"}}><Link to="/createpost">Create Post</Link></li>,
                <li style={{color:"black"}}><Link to="/explore">Explore</Link></li>,
                <button className="btn waves-effect waves-light" 
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}>
                    Logout
                </button>
            ]
        }
        else{
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
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
        </nav>
        <ul className="sidenav" id="mobile-demo">
            {renderList()} 
        </ul>
      </>
    )
}

export default Navbar;