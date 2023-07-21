import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

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
//console.log("login data :",logindata);

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
         // console.log("API Response:", response.data);
        
          const data = response.data;
          if(data.id===15)
          {
            navigate("/");
          }
          else{
            alert("incorrect details")
          }
        
          // if (data.success) {
          //   console.log("data.success:",data.success);
           
          //   alert("User logged in successfully");
          //   navigate("/");
          // } else {
           
          //   alert("Incorrect details");
          // }
        })
        .catch((error) => {
          console.log("Error:", error);
      
          alert("An error occurred during login");
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
