import React, {  Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


//va a recirbir cita porque lo recibe como props
//se aplica destructuring para extraer la funcion crearCita
const Formulario = ({crearCita}) => {
  //Crear State de Citas

  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  //otro state de para errores
//inicia false porque no hay errores al inicio
  const [error, actualizarError ] = useState(false);

  //funcion que se ejecuta cada que se escribe en el input
  //pasar un evento (e)para que se actualice 
  const handleChange = (e) => {
    //console.log('escribiendo...')
    //console.log(e.target.name);
    //console.log(e.target.value);
    actualizarCita({
      //array destructuring para escribir la info del input dentro dela propiedad a la que se quiere agregar
      //..copia de la refrencia de state
      ...cita,
      [e.target.name] : e.target.value
    })
  }

 //extraer valores
 const { mascota, propietario, fecha, hora, sintomas } = cita;
  
  //funcion que envia formulario 
  const submitCita = (e) => {
    e.preventDefault();
    //alert('enviando...')
    //console.log('enviando')

    //validar
    //console.log(mascota)
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
      //console.log('error')
      //si falla la validacion -> pasa a true el error
      actualizarError(true)
      return;
    }
    //eliminar el mensaje de error
    actualizarError(false)
    //asignarID
    console.log(cita)
    cita.id = uuidv4();
    

    //crearCita(colocarla en el state principal)
    crearCita(cita)



    //reiniciar form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })

  }
  return(
    <Fragment>
      <h2>Crear cita</h2>
      { error ?  <p className="alerta-error">Todos los campos son obligatorios</p> : null}
      <form
      onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input 
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input 
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño  de la mascota"
          onChange={handleChange}
          value={propietario}
        />
        <label>Fecha</label>
        <input 
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />
        <label>Hora</label>
        <input 
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />
        <label>Síntomas</label>
        <textarea
        className="u-full-width"
        name="sintomas"
        onChange={handleChange}
        value={sintomas}
        >
        </textarea>
        <button
        type="submit"
        className="u-full-width button-primary">
        Agregar cita</button>

      </form>
    </Fragment>
  )
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
}
export default Formulario;