import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";


const Dashboard = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
      window.location = "/"
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };
  return (
    <div>
      <p>{`Welcome ${auth.currentUser.email}`}</p>

        <br />
        <br />
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
