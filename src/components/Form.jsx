import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_USER } from "../redux/loginData/userReducer";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
});

class LoginForm extends React.Component {
  
  async login(values,setSubmitting, setFieldError) {
    let result
    try {
      result = await axios.post(this.props.api,{ email: values.email, password: values.password})      
      if(result?.status){
        setSubmitting(false);
        let navLink = ""
        if(this.props.isLogin){
          this.props.dispatch({type:SAVE_USER, payload:result.data.token});
          navLink="/Dashboard"
        } else {
          alert("Registration Successful. Please login")
          navLink="/login"
        }
        this.props.navigate(navLink)
      } 
    } catch (error) {
      setSubmitting(false);
      setFieldError("email", error?.response?.data?.error||"Something Went Wrong");
    }
  }

  handleSubmit = (values, { setSubmitting, setFieldError }) => {
    this.login(values, setSubmitting, setFieldError)
  };

  render(){
    const {isLogin, headerText}=this.props
    return (
      <>
        <h1>{headerText}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <label>
                  Email: <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </label>
                <label>
                  Password:
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
        <Link to={isLogin?"/registration":"/login"}>Click here to {isLogin?"Registration":"Login"}</Link>
      </>
  );
  }
};



function WithNavigate(props) {
  const userToken = useSelector(state=>state.token)
  const dispatch = useDispatch()
  let navigate = useNavigate();
  return <LoginForm {...props} navigate={navigate} userToken={userToken} dispatch={dispatch} />
}


export default WithNavigate;
