import React, { useState } from 'react'
import BalanceComponent from './BalanceComponent/BalanceComponent';
import BalanceClasificado from './BalanceClasificado/BalanceClasificado';

const BalanceDashboard = () => {
  
  const [ layout,setLayout ] = useState(0);

  function RenderPrincipalComponent () {
    switch (layout){
      case 0:
        return <BalanceComponent/>
      case 1:
        return <BalanceClasificado/>
    }
  }

  return (
    <>
      <div className='row-space-btw-test'>
        <div className='row-test'>
          <button className={layout === 0 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(0)}}>BALANCE</button>
          <button className={layout === 1 ? 'btn-cta' : 'btn'} onClick={()=>{setLayout(1)}}>BALANCE CASIFICADO</button>
        </div>
        <div className='row-test'>
          <div>Ic1</div>
          <div>Ic2</div>
        </div>
      </div>
      {RenderPrincipalComponent()}
    </>
  )
}

export default BalanceDashboard