import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Inscription</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Votre nom" />
          <input type="email" placeholder="Adresse e-mail" />
          <input type="password" placeholder="Mot de passe" />
        </div>
        <button>Continuer</button>
        <p className="loginsignup-login">Vous avez déjà un compte? <span>Connexion</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=''/>
          <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité</p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup;