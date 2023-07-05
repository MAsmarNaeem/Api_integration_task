import  { useState } from "react";
import { useNavigate } from "react-router-dom";


function UseSignup() {
  const [signupInputs, setSignupInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const[error,seterror]=useState({})
  const dompush=useNavigate()
  const[userData,setUserData]=useState([])


  const getUserData = (e) => {
    const { value, name } = e.target;

    setSignupInputs(() => {
      return {
        ...signupInputs,
        [name]: value,
     
      };
    });
  };

  const addDataButton = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = signupInputs;
   

    if (name === "") {
     // alert("name field is required");
      seterror({name:"name field is required"})
    } else if (email === "") {
      seterror({email:"Email Field is required"})
     // alert("email field is required");
    } else if (password === "") {
      seterror({password:"Password Field is required"})
     // alert("password field is required");
    } else if (confirmPassword === "") {
      seterror({confirmPassword:"confirm password Field is required"})
      //alert("confirm Password field is required");
    } else if (password !== confirmPassword) {
      alert("Password and confirm Password should be same");
    } else if (!email.includes("@")) {
      alert(" Enter valid Email");
    } else if (password.length < 5) {
      alert("Enter Password strong or greater than 5 digits ");
    } else {
      alert("Enter data successfully");
      localStorage.setItem("key",JSON.stringify([...userData,signupInputs]))
      dompush("/Login")
     

    }
  };

  return {
    getUserData,
    signupInputs,
    setSignupInputs,
    addDataButton,
    error
  };
}

export default UseSignup;
