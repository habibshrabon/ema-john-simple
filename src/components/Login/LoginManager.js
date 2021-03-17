import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginInFramework = () => {
  if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  } 
}

export const handelGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // console.log("sign in");
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        };
        return signedInUser;
        // console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.massage);
      });
  };

  export const handelFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
      return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        user.success = true;
        return user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }

  export const handelSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false
        };
        return signedOutUser;
      })
      .catch((err) => {});
    console.log("Sign out click");
  };

  export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      // console.log(res);
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    //   console.log('sign in user info', res.user);
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name
      }).then(function() {
        console.log('User name updated successfully');
        // Update successful.
      }).catch(function(error) {
        console.log(error);
        // An error happened.
      });
  }