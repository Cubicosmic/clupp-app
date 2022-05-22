import React, { useState } from 'react'
import '../styles/list.scss'
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import firebaseApp from '../firebase/firebase';
const firestore = getFirestore(firebaseApp);

function ListCar({ arrayCars, setAddCar, setArrayCars, emailUser }) {

  const [filterArrayCars, setFilterArrayCars] = useState(null);
  const [newArrayCars, setNewArrayCars] = useState(arrayCars.filter((e) => !e.delete));
  const [respuesta, setRespuesta] = useState(false);

  const changeSearch = (e) => {
    filtrar(e.target.value);
    console.log(newArrayCars, respuesta)
  }


  const filtrar = (s) => {
    setNewArrayCars(newArrayCars);
    var searchResult = newArrayCars.filter((e) => {
      if(
        e.brand.toString().toLowerCase().includes(s.toLowerCase()) || 
        e.model.toString().toLowerCase().includes(s.toLowerCase()) || 
        e.year.toString().toLowerCase().includes(s.toLowerCase()) 
      ) {
        return e;
      } else {
        return [];
      }
    })
    if(searchResult === 0){
      setRespuesta(false);
    } else {
      setRespuesta(true);
    }
    setFilterArrayCars(searchResult);
  }

  //eliminar (cambiar delete a true)
  async function deleteCar(e) {
    const brand = e.brand;
    const model = e.model;
    const year = e.year;
    const imgUrl = e.frontPictureURL;
    //crear nuevo vehículo pero con delete = true
    const arrayDeleteCars = newArrayCars.filter((c) => c.timestamp !== e.timestamp)
    const newNewArrayCars = [...arrayDeleteCars, {
      brand: brand,
      model: model,
      year: year,
      frontPictureURL: imgUrl,
      timestamp: + new Date(),
      delete: true
    }];
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${emailUser}`);
    updateDoc(docuRef, {cars: [...newNewArrayCars]});
    //actualizar state y limpiar form 
    setArrayCars(newNewArrayCars);
    alert('Vehículo añadido');
  }

  return (
    <div className='list'>
      <div className='nav'>
        <input placeholder='Busqueda por modelo, marca, año' onChange={changeSearch} type='text'></input>
        <button onClick={() => setAddCar(true)}>Añadir vehículo</button>
      </div>
      <ul>
        {filterArrayCars===null &&
          newArrayCars.map((car, index) => {
            return (
              <li key={index}>
                <img alt=' ' src={car.frontPictureURL}></img>
                <p>{car.brand} {car.model} {car.year}</p>
                <button onClick={()=> deleteCar(car)} className='delete'>X</button>
              </li>
            )
          })
        }
        {respuesta &&
          filterArrayCars.map((car, index) => {
              return (
                <li key={index}>
                  <img alt=' ' src={car.frontPictureURL}></img>
                  <p>{car.brand} {car.model} {car.year}</p>
                  <button onClick={()=> deleteCar(car)} className='delete'>X</button>
                </li>
              )
          })
        }
      </ul>
    </div>
  )
}

export default ListCar