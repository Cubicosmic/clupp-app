import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebase/firebase';
import ListCar from './list';
import AddCar from './add';

const firestore = getFirestore(firebaseApp);

function Home({ emailUser }) {

    const [addCar, setAddCar] = useState(true);
    const [arrayCars, setArrayCars] = useState([]);

    async function searchOrAddDoc(idDoc) {
        //referencia del doc
        const docuRef = doc(firestore, `usuarios/${idDoc}`)
        //buscar doc
        const consult = await getDoc(docuRef);
        //ver si existe el doc
        if(consult.exists()){
            const infoDoc = consult.data();
            return infoDoc.cars;
        } else {
            setDoc(docuRef, {cars:[]});
            const consult = await getDoc(docuRef);
            const infoDoc = consult.data();
            return infoDoc.cars;
        }
    }

    useEffect(() => {
        async function fetchCars() {
            const fetchedCars = await searchOrAddDoc(emailUser);
            setArrayCars(fetchedCars);
        }
        fetchCars();
    });

    return (
        <React.Fragment>
            {addCar ? 
                <AddCar
                    arrayCars={arrayCars}
                    setArrayCars={setArrayCars}
                    emailUser={emailUser}
                    setAddCar={setAddCar}
                    />
                    :
                    <ListCar 
                    arrayCars={arrayCars}
                    setArrayCars={setArrayCars}
                    emailUser={emailUser}
                    setAddCar={setAddCar}
                />
            }
        </React.Fragment>
    )
}

export default Home