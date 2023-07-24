import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function UseLogin() {
  const [logindata, setlogindata] = useState({
    username: "",
    firstName: "",
  });
  const[authData,setAuthData]=useState("")

      // eslint-disable-next-line
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const getdata = (e) => {
    const { value, name } = e.target;

    setlogindata((prevState) => ({
     ...prevState,
      [name]: value,
    }));
  };
    useEffect(()=>
    {
     //submitbutton()
     

    },[logindata])
    console.log("authdata",authData);
  

  const submitbutton = (e) => {
    e.preventDefault();
    const { username, firstName } = logindata;
    console.log("username is :",username);
    console.log("username is :",firstName);
    if (username === "") {
      seterror({ username: "username Field is required" });
    }  else if (firstName === "") {
      seterror({ firstName: "firstName Field is required" });
    } else {
    
      axios.post(`https://dummyjson.com/auth/login`, {
          username: username,
          firstName: firstName,
        })
        .then((response) => {
     
            setAuthData(response.data)
        //  const data = response.data;
    //    console.log("autj",authData.username,"log",logindata.username,"authpass",authData.firstName,"authuser",authData.firstName);
          
        
          if (authData.username === logindata.username && authData.firstName === logindata.firstName) {
            navigate("/");
          }
         
          else{
            alert("incorrect details")
          }

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
