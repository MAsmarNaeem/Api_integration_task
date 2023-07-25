import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Alert from 'react-bootstrap/Alert';

function UseLogin() {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });


  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const getdata = (e) => {
    const { value, name } = e.target;

    setlogindata((prevState) => ({
     ...prevState,
      [name]: value,
    }));
  };
  console.log("eroror is ",error.Error);
//console.log("login data :",logindata);
   
     
    //  useEffect(()=>
    //  {

    //  },[error.Error])

  const submitbutton = (e) => {
    e.preventDefault();
    const { email, password } = logindata;
    if (email === "") {
      seterror({ email: "Email Field is required" });
    }  else if (password === "") {
      seterror({ password: "Password Field is required" });
    } else {
    
      axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
          username: email,
          password: password,
        })
        .then((response) => {
          console.log("resposse is :",response);
         // console.log("API Response:", response.data);
        
          const data = response.data;
          if(data.id===15)
          {
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/dashboard");
          }
         
        
        })
        .catch((error) => {
          console.log("Error:", error);
          seterror({ Error: "An error occurred during login" });
      
          
        });
    }
  };

  return {
    getdata,
    submitbutton,
    error,
    logindata
  };
}

export default UseLogin;
