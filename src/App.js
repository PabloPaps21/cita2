import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import Formulario from './components/Formulario.js';
import Cita from './components/Cita';


function App() {
  
  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  
  //arreglo de citas
  const [citas, guardarCitas] = useState([]);

  //useEffect para realizar operaciones cuando el state cambia
  //similar a componentDidMount o componentDidUpdate
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    //es necesario re-declarar 
    console.log('hubo cambios')
    if(citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas))
    }else {
      localStorage.setItem('citas',JSON.stringify([]))
    }
  }, [citas])

  //funcion que tome las citas actuales y agregue la nueva
  //se va a pasar como props

  const crearCita = cita => {

    //console.log(cita)
    //la cita se pasa al arreglo 
    //...citas copia el arreglo para llevar las citas y no borrarlas
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina cita por ID
  const eliminarCita = id => {
    //console.log(id)
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)

  }

  //Mensaje condicional 
  const titulo = citas.length === 0 ? 'No hay citas' : 'administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita
              key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default App;
