import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.css"
import Footer from "./components/Footer";
import Header from "./components/Header";
const LazyForm  = React.lazy(()=>import("./components/Form"));
const LazyWelcome  = React.lazy(()=>import("./components/Welcome"));

const LOGIN_API = "https://reqres.in/api/login"
const REGISTRAION_API = "https://reqres.in/api/register"

const App = () => {
  const userToken = useSelector(state=>state.token)
  
  return (
    <div style={{width:"100%", height:"100vh"}}>
    <BrowserRouter>
      <Header />
      <hr />
      <Routes>
        <Route path="/" element={userToken ? <Navigate to="/Dashboard" /> : <Navigate to="/login" />} />
        <Route path="/Dashboard" element={userToken ? <React.Suspense fallback='Loading....'><LazyWelcome api={LOGIN_API} headerText={"Login"} isLogin={true} /></React.Suspense> : <Navigate to="/" />}></Route>
        <Route path="/login" element={<React.Suspense fallback='Loading....'><LazyForm api={LOGIN_API} headerText={"Login"} isLogin={true} /></React.Suspense>}></Route>
        <Route path="/registration" element={<React.Suspense fallback='Loading....'><LazyForm api={REGISTRAION_API} headerText={"Registration"} /></React.Suspense>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
};

export default App;