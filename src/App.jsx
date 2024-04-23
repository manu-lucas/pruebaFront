import { useEffect } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import axios from 'axios'
function App() {

  //aca la logica deberia ser fijarme si estoy logeado o no 
  useEffect(() => {
    console.log('ver en que estoy')   
    //get_data()     
  }, [])
  
  async function get_data (){
    try{
      const response = await axios.get('http://localhost:4002/api/check-auth', { withCredentials: true })
      console.log(response)
      //el token es correcto      
    } catch (err) {
      //si el token no es correcto el usuario no esta logeado
      console.log(err)
    }
  }
  

  return (
    <>
      <>
        <AppRouter/>
      </>
    </>
  )
}

export default App
