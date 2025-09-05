import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state, setState] = React.useState("Login");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const changeHandler=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const login = async()=>{
    console.log(formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then(data => {
      responseData = data;
    })

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  }

  const signup = async()=>{
    console.log(formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(res => res.json()).then(data => {
      responseData = data;
    })
    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" ? <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder="Votre nom" /> : <></>}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Adresse e-mail" />
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Mot de passe" />
        </div>
        <button onClick={state === "Login" ? login : signup}>Continuer</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Vous avez déjà un compte? <span onClick={() => setState("Login")}>Connexion</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Creer un compte? <span onClick={() => setState("Sign Up")}>Inscription</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=''/>
          <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité</p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup;