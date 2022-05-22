import React from 'react'
import '../styles/singOut.scss'
import firebaseApp from '../firebase/firebase'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp);

function SignOut() {
  return (
    <button className='singOut' onClick={() => signOut(auth)}>Cerrar sesión</button>
  )
}

export default SignOut