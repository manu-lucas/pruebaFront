import React from 'react'
import PrincipalCard from '../../components/Card/PrincipalCard'
import { CiEdit } from "react-icons/ci";
import { MdImage } from "react-icons/md";


const Profile = () => {
  return (
    <div >
        <h1>Mi Perfil</h1>
        <PrincipalCard>
           <div className='profile-container'>
            {/*ICONO ABSOLUTO*/}
            <CiEdit style={{position:"absolute",top:0,right:0,fontSize:26,cursor:"pointer"}}/>
            {/*Primera seccion*/}
            <div className='profile-header-container'>
              <div className='profile-img-container'>
                <MdImage/>
              </div>
              <h2>Juan Gonzalez</h2>
              <span>Gestor Comercial</span>
            </div>
            <div style={{width:"100%",padding:"10px 0px"}}>
              <h2>Datos del perfil</h2>
            </div>
            {/*Segunda seccion*/}
            <div className='profile-grid'>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>+54 261 5734889</span>
                <span>N de telefono</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>06/02/1997</span>
                <span>Fecha de nacimiento</span>
              </div>
              <div className='column' style={{alignItems:"center"}}>
                <span className='profile-grid-value'>appemail@gmail.com</span>
                <span>Email</span>
              </div>
            </div>
          </div>
        </PrincipalCard>
    </div>
  )
}

export default Profile