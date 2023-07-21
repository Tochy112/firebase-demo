import React from "react";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { Route } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const [form, setform] = useState({
  //   email: "",
  //   password: "",
  // });
  // const formUpdate = (e) => {
  //   setform({ ...form, [e.target.value]: e.target.id });
  // };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(auth.currentUser.email);
  };

  // sign in via email and password
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.alert("Account Created");
      window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // sign in via google account
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.alert("Account created");
      window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <br />
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          value={email}
        />
        <br /> <br />
        <input
          type="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
        />
        <p style={{ color: "red" }}>{error}</p>
        <br /> <br />
        <button onClick={signIn}>Sign In</button> || <vr />
        <button onClick={signInWithGoogle}>Google</button>
      </form>
    </div>
  );
};

export default AuthPage;
