import React, { useContext, useEffect, useState } from 'react'
import { Button, Select } from 'antd';
import { DatePicker } from 'antd';
import { FaUserAlt } from "react-icons/fa";
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import { AppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import PrincipalCard from '../../components/Card/PrincipalCard';
import SelectComponent from '../../components/Select/SelectComponent';
import { TbFileDownload } from "react-icons/tb";
import { FaFileDownload } from "react-icons/fa";

import { PieChart } from '@mui/x-charts/PieChart';


const data1 = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group E', value: 278 },
  { label: 'Group F', value: 189 },
];

const data2 = [
  { label: 'Group A', value: 2400 },
  { label: 'Group B', value: 4567 },
  { label: 'Group C', value: 1398 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const HomeScreen = () => {

  const { menuOptions,setMenuOptions,menuOptionsinitialState } = useContext(AppContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [ VFOption,setVFOption ] = useState(0)
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
      },
    ],
  };

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // Agrega un event listener para el evento 'resize'
    window.addEventListener('resize', handleResize);
    // Elimina el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez, equivalente a componentDidMount en clases
  
  //esto es para actualizar la navbar
  useEffect(() => {
    setMenuOptions(menuOptionsinitialState)
  }, [])


  //esto es para saber donde estoy parado y setear las opciones del menu options
  
  
  return (
    <>
      <div>
        <h1>Hola Juan !</h1>
        <h2>Bienvenido a Appify</h2>
        {/*Seccion 1 */}
        <PrincipalCard>
          <div className='proyectos-section'>
            <div className='row-space-btw'>
              <div className='column'>
                <h3>Proyectos</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <div className='row'>
                <SelectComponent/>
                <Button type='primary' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <FaFileDownload/>
                </Button>
              </div>
            </div>

            <div className='row-space-btw home-proyectos-container' >
              <div style={{ 
                //border: "1px solid black", 
                width: "350px",
                height: "180px" }}>
                <PieChart
                  colors={['#fe7700', '#00C49F', '#FFBB28']} // Usa una paleta de colores
                  series={[
                    {
                      startAngle: -90,
                      endAngle: 90,
                      data: data2,
                      cx: 160,
                      cy: 150,
                      innerRadius: 80,
                      outerRadius: 140,
                    },
                  ]}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                />
              </div>
              <div style={{width:"calc(100% - 450px)",
              //border:"1px solid green"
              }} className='home-grid-proyectos'>
                  <div className='home-grid-proyectos-item'>
                    <div className='home-grid-proyectos-item-aside'></div>
                    <div className='column' style={{padding:20}}>
                      <span>Aceptado</span>                    
                      <span className='home-grid-proyectos-item-value'>20%</span>
                    </div>
                  </div>
                  <div className='home-grid-proyectos-item'>
                    <div className='home-grid-proyectos-item-aside'></div>
                    <div className='column' style={{padding:20}}>
                      <span>Consultas</span>                    
                      <span className='home-grid-proyectos-item-value'>20%</span>
                    </div>
                  </div>
                  <div className='home-grid-proyectos-item'>
                    <div className='home-grid-proyectos-item-aside'></div>
                    <div className='column' style={{padding:20}}>
                      <span>Consultas</span>                    
                      <span className='home-grid-proyectos-item-value'>20%</span>
                    </div>
                  </div>
              </div>
            </div>

          </div>

        </PrincipalCard>

        {/*Seccion 2*/}
        <div className='home-egresos-ingresos-grid'>
          <PrincipalCard>
            <div className='row-space-btw'>
              <div className='column'>
                <h3>Gastos</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <SelectComponent/>
            </div>
            <div style={{
              //border:"1px solid black",width:"260px",
              display:"flex",alignItems:"center",justifyContent:"center",margin:"20px auto"}}>
              <PieChart
                series={[
                  {
                    innerRadius: 75,
                    outerRadius: 115,
                    data:data1,
                  },
                ]}
                margin={{ right: 5 }}
                width={240}
                height={240}
                legend={{ hidden: true }}
              />
            </div>
            <div className='home-gastos-grid'>

              <div className='home-gastos-grid-item'>
                <div className='home-gastos-grid-item-aside'></div>
                <div className='column' style={{justifyContent:"center"}}>
                  <span>Lorem</span>
                  <span>20%</span>
                </div>
              </div>
              
              
              

              
            </div>
          </PrincipalCard>
          
          <PrincipalCard>
            <div className='row-space-btw' style={{marginBottom:20}}>
              <div className='column'>
                <h3>Ingresos</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <SelectComponent/>
            </div>

            <div style={{
              //border:"1px solid black",width:"260px",
              display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
              {/**Parte que tiene los Ingresos de la plataforma */}
              <PieChart
                series={[
                  {
                    innerRadius: 75,
                    outerRadius: 115,
                    data:data1,
                  },
                ]}
                margin={{ right: 5 }}
                width={240}
                height={240}
                legend={{ hidden: true }}
              />
            </div>
          </PrincipalCard>
        </div>

        {/*Seccion 3 */}
        <PrincipalCard>
          <div className='proyectos-section'>
            <div className='row-space-btw'>
              <div className='column'>
                <h3>Ventas</h3>
                <span>Del 1 al 13 de marzo</span>
              </div>
              <div className='row'>
                <SelectComponent/>
              </div>
            </div>
            <div>Grafico de ventas</div>
          </div>
        </PrincipalCard>
      </div>
      {
        /*
        <div className='home-screen-section home-screen-first-card-container'>
          <div className='card'>
            <div className='row-test'>
              <h3>Rentabilidad</h3>
              <Select defaultValue="this-year" style={{ width: 150 }} onChange={handleChange}>
                <Option value="3-month">Ultimos 3 meses</Option>
                <Option value="6-month">Ultimos 6 meses</Option>
                <Option value="9-month">Ultimos 9 meses</Option>
                <Option value="this-year">Este año</Option>
                <Option value="last-year">Año pasado</Option>
                <Option value="year-before-last">Año antepasado</Option>
              </Select>
            </div>
            ///flow icons 
            <span>$0</span>
            <div>
              <span>0% conciliado</span>
            </div>
            <div className='grid-test'>
              <div className='column-test'>
                <span>$0</span>
                <span>Ingresos</span>
              </div>
              <span>0 por revisar</span>
              <div className='column-test'>
                <span>$0</span>
                <span>Gastos</span>
              </div>
              <span>0 por revisar</span>
              
            </div>
          </div>
          <div className='card'>
            <div className='row-test'>
              <h3>Gastos</h3>
              <Select defaultValue="this-year" style={{ width: 150 }} onChange={handleChange}>
                <Option value="3-month">Ultimos 3 meses</Option>
                <Option value="6-month">Ultimos 6 meses</Option>
                <Option value="9-month">Ultimos 9 meses</Option>
                <Option value="this-year">Este año</Option>
                <Option value="last-year">Año pasado</Option>
                <Option value="year-before-last">Año antepasado</Option>
              </Select>
            </div>
            <span>$0</span>
            <div className='row-test'>
              <div style={{height:20,width:20,borderRadius:"50%",backgroundColor:"red"}}></div>
              <div className='column-test'>
                <span>$0</span>
                <span>Otros</span>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='row-test'>
              <h3>Documentos de venta</h3>
              <span>Últimos 365 días</span>
            </div>
            <div className='row-teste'>
              <span>$0</span>
              <span>por cobrar</span>
            </div>
            <div className='grid-test'>
              <span>$0</span>
              <span>$0</span>
              <span>Vencidos por cobrar</span>
              <span>Aun no vencen</span>
            </div>
            <div style={{width:"100%",height:40,backgroundColor:"grey"}}></div>
            <button>Ir a cobros</button>
          </div>
        </div>
        <div className='home-screen-section home-screen-second-card-container'>
          <div className='card'>
            <div className='row-space-btw-test'>
              <div className='row-test'>
                <div>
                  <h3>Ventas</h3>
                </div>
                <div>
                  <h3>Facturado</h3>
                </div>
              </div>
              <div className='row-test'>
                <DatePicker/>
                <Select defaultValue="monthly" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="monthly">Mensual</Option>
                  <Option value="quarterly">Trimestral</Option>
                  <Option value="annual">Anual</Option>
                </Select>
                <FaUserAlt/>
                <Select defaultValue="all" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="all">Todos</Option>
                  <Option value="6-month">Agos</Option>
                </Select>
              </div>
            </div>
            <LineChart/>
          </div>
          <div className='card'>         
            <BarChart />
          </div>
        </div>   
        <div className='home-screen-section home-screen-second-card-container'>
          <div className='card'>
            <div className='row-test'>
              <h3>FeedBack clientes</h3>
              <Select defaultValue="this-year" style={{ width: 150 }} onChange={handleChange}>
                <Option value="3-month">Ultimos 3 meses</Option>
                <Option value="6-month">Ultimos 6 meses</Option>
                <Option value="9-month">Ultimos 9 meses</Option>
                <Option value="this-year">Este año</Option>
                <Option value="last-year">Año pasado</Option>
                <Option value="year-before-last">Año antepasado</Option>
              </Select>
            </div>
            <div className='row-test'>
                <div className='row-test'>
                  <span>Desde</span>
                  <DatePicker/>
                </div>
                <div className='row-test'>
                  <span>Hasta</span>
                  <DatePicker/>
                </div>
            </div>
          </div>
          <div className='card'>
            <h3>Comentarios</h3>
          </div>
        </div>
        
        */
      }
    </>
  )
}

export default HomeScreen