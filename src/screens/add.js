import React, { useState } from 'react'
import '../styles/add.scss'
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage'
import firebaseApp from '../firebase/firebase';
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

function AddCar({ arrayCars, setArrayCars, emailUser, setAddCar }) {

  //precarga de imagen
  const [imgPrev, setImgPrev] = useState('no-photo.png');
  const changeImg = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      e.preventDefault();
      setImgPrev(e.target.result);
    }
  }

  async function addCar(e) {
    const brand = e.target.brand.value;
    const model = e.target.model.value;
    const year = e.target.year.value;
    if(imgPrev==='no-photo.png'){
      alert('Agrega una imagen')
    } else {
      if(!brand || !model || !year){
        alert('Completa todos los campos')
      } else {
        //no recargar página
        e.preventDefault();
        //subir a imagen a firebase
        const imgFile = e.target.frontPictureURL.files[0];
        const imgName = await imgFile.name;
        const imgRef = ref(storage, `imagenes/${imgName}`);
        await uploadBytes(imgRef, imgFile);
        const imgUrl = await getDownloadURL(imgRef);
        //crear nuevo vehículo
        const frontPictureURL = e.target.frontPictureURL.value;
        const newArrayCars = [...arrayCars, {
          brand: brand,
          model: model,
          year: year,
          frontPictureURL: imgUrl,
          timestamp: + new Date(),
          delete: false
        }];
        //actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${emailUser}`);
        updateDoc(docuRef, {cars: [...newArrayCars]});
        //actualizar state y limpiar form 
        setArrayCars(newArrayCars);
        e.target.brand.value = '';
        e.target.model.value = '';
        e.target.year.value = '';
        e.target.frontPictureURL.value = '';
        alert('Vehículo añadido');
      }
    }
  }

  return (
    <form className='add' onSubmit={addCar}>
      <h1>Añadir vehículo</h1>
      <div className='foto'>
        <input type='file' accept='image/*' id='frontPictureURL' onChange={changeImg}></input>
        <img alt=' ' src={imgPrev}></img>
      </div>
      <div className='inputs'>
        <input type='text' id='brand'></input>
        <label htmlFor='brand'>Marca</label>
        <input type='text' id='model'></input>
        <label htmlFor='model'>Modelo</label>
        <input type='password' id='year'></input>
        <label htmlFor='year'>Año</label>
      </div>
      <button className='gris' onClick={() => setAddCar(false)}>Ver vehiculos</button>
      <button className='azul' type='submit'>Añadir vehículo</button>
    </form>
  )
}

export default AddCar