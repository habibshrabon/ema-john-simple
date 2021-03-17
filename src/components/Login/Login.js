
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handelFbSignIn, handelGoogleSignIn, handelSignOut, initializeLoginInFramework } from "./LoginManager";



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  initializeLoginInFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || { from: { pathname: "/"}};


  const googleSignIn = () =>{
      handelGoogleSignIn() 
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const fbSignIn = () =>{
    handelFbSignIn()
    .then(res =>{
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
    })
    
}

  const signOut = () =>{
      handelSignOut()
      .then(res =>{
          setUser(res);
          setLoggedInUser(res);
      })
  }

  


  const handelBlur = (event) =>{
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(event.target.value)
      isFormValid = isPasswordValid && passwordHasNumber ;
    }
    if(isFormValid){
    const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      // console.log(newUserInfo);
    }
  }
  const handelSubmit = (event) =>{
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      
    }

    if(!newUser && user.email && user.password){
      
    }

    event.preventDefault();
  }

  

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br/>
      <button onClick={fbSignIn}>Sign In facebook</button>
      {user.isSignIn && (
        <div>
          <p>welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      )}

      <h1>Our own Authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> New User Sign Up</label>
      <form onSubmit={handelSubmit}>
        {newUser && <input type="text" name="name" onBlur={handelBlur} placeholder="Your Name" />}
        <br/>
        <input type="text" name="email" onBlur={handelBlur} placeholder="Your Email Address" required />
        <br/>
        <input type="password" name="password" onBlur={handelBlur} placeholder="Your Password" required />
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'logged In'} successfully</p>}
    </div>
  );
}

export default Login;
