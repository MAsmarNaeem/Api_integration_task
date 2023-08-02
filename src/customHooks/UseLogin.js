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
  //console.log("eroror is ", error.Error);
 

  const submitbutton = (e) => {
    e.preventDefault();
    const { email, password } = logindata;

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: email,
        password: password,
      })
      .then((response) => {
      
        if (response.status === 200) {
       //   const d = response.data.token;
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("image", response.data.image);
          localStorage.setItem("id",response.data.id)

        //  console.log(localStorage.getItem("image"),"aaaa");
          navigate("/dashboard");
        }
      })
      .catch((error) => {

      //  console.log("Error:", error.response.data.message);
        seterror({ Error: error.response.data.message });
      });
  };

  return {
    getdata,
    submitbutton,
    error,
    logindata,
  };
}

export default UseLogin;
