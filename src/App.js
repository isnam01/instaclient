import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import UserProfile from './components/pages/UserProfile';
import Myposts from './components/pages/myposts';
import CreatePost from './components/pages/CreatePost';
import Reset from './components/pages/resetPassword';
import Newp from './components/pages/newpassword';
import {reducer,initialState} from './reducer/Userreducer';


export const UserContext=createContext()


const Routing=()=>
{
  const history=useHistory()
  const {dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=localStorage.getItem("user")
    if(user)
    {
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/resetpassword'))
      history.push('/login')
    }
  },[dispatch,history])
  return(
  <Switch>
        <Route exact path='/'>
          <Myposts/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <SignUp/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route path='/createpost'>
          <CreatePost/>
        </Route>
        <Route path='/profile/:userid'>
          <UserProfile/>
        </Route>
        <Route path='/explore'>
          <Home/>
        </Route>
        <Route path='/resetpassword/:token'>
          {
            console.log("here")
          }
          <Newp/>
        </Route>
        <Route exact path='/resetpassword'>
          <Reset/>
        </Route>
       
  </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routing></Routing>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App
