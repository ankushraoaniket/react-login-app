import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { LOGOUT_USER } from "../redux/loginData/userReducer";

const Header = () =>{
    const location = useLocation()
    const dispatch = useDispatch()
    const userToken = useSelector(state=>state.token)
    
    const logoutClickHandler = () =>{
      dispatch({ type: LOGOUT_USER })
    }
    return <header style={style.headerStyle}>
      <span style={{marginRight:"10px"}}>{userToken ? "Welcome ":location.pathname === "/registration"?"Registration ":"Login "}Page</span>
      <span style={style.sSpanStyle}>
        {!userToken ? 
            location.pathname === "/registration" ? <NavLink style={style.navStyle} to="/login">Login</NavLink>
            : <NavLink style={style.navStyle} to="/registration">Registration</NavLink> : 
            <button style={style.btnStyle} onClick={logoutClickHandler}>Logout</button>}
        </span>
    </header>
}

export default Header

const style = {
    btnStyle:{backgroundColor:"gray", height:"90%", border:"1px", color:"#e5e906", cursor:"pointer"},
    navStyle:{color:"#e5e906"},
    sSpanStyle:{marginLeft:"10px",position:"absolute", right:"15px", height:"30px", cursor:"pointer"},
    headerStyle:{width:'100%', height:"35px", backgroundColor:"gray", color:"#e5e906", display:"flex", flexDirection:"row", justifyContent:"center"}
}