import React, { useState } from 'react'
import '../styles/login.scss'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase/firebase';
const auth = getAuth(firebaseApp);

function Login() {

  const [isLogin, setIsLogin] = useState(true);

  async function loginUser(email, password) {
    await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirebase) => {return usuarioFirebase})
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    if(isLogin){
      loginUser(email, password);
    } else {
      signInWithEmailAndPassword(auth,email,password);
    }
  }

  return (
    <div className='login'>
      <h1>{isLogin ? 'Crear cuenta':'Iniciar sesión'}</h1>
      <form onSubmit={submitHandler}>
        <input className='input' type='email' id='email'/>
        <label htmlFor='email'>Correo electrónico</label>
        <input className='input' type='password' id='password'/>
        <label htmlFor='password'>Contraseña</label>
        <input className='submit' type='submit' value={isLogin ? 'Crear cuenta':'Iniciar sesión'}/>
      </form>
      <button className='is-login' onClick={() => setIsLogin(!isLogin)}>
      {isLogin ? 'Ya tengo cuenta':'Registrarme'}
      </button>
    </div>
  )
}

export default Login