import React from "react";
import { useState,useEffect } from 'react';
import Login from './components/login';
import { AuthProvider } from './context/authContext';
import Splash from './components/loading'
import {Routes,Route} from "react-router-dom";
import Signup from "./components/signup"
import ProtectedRoute from "./components/protectedroute"
import Dash from "./components/dash";
function App() {
  const[Loading,setLoading]=useState(false); //this is for splash animation
    useEffect(()=>{
      setLoading(true)
      setTimeout( ()=>{
        setLoading(false)
      },600)
    },[])
  return (
    <>
      {
        Loading?
         <Splash/>
         :
        
        <AuthProvider>
          <Routes>
            <Route path="/dash" element={<ProtectedRoute><Dash/></ProtectedRoute>} />
            <Route path="/" element={<Login/>} />
            <Route path="/lo" element={<Dash/>} />
            <Route path="/SignUp" element={<Signup/>} />
          </Routes>
        </AuthProvider>
        } 

    </>
  );
}

export default App;
