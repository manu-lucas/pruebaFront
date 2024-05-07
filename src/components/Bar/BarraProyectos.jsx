import React from 'react';
const GraficoBarra = ({ facturado, noFacturado, produccion }) => {
  const total = facturado + noFacturado + produccion;
  const porcentajeFacturado = Math.round((facturado / total) * 100);
  const porcentajeNoFacturado = Math.round((noFacturado / total) * 100);
  const porcentajeProduccion = Math.round((produccion / total) * 100);

  return (
    <div className="containerBarraProyectos">
      <div className="labelsBProyectos">
        <h3 className='titleFacturado'>Facturado (<span className="facturadoPorcent">{porcentajeFacturado}%</span>)</h3>
        <h3 className='titleProduccion'>En producción (<span className="produccionPorcent">{porcentajeProduccion}%</span>)</h3>
        <h3 className='titleNoFacturado'>No facturado (<span className="noFacturadoPorcent">{porcentajeNoFacturado}%</span>)</h3>
      </div>
      <div className="barBProyectos">
        <div style={{ width: `${porcentajeFacturado}%` }} className="barSection facturado"></div>
        <div style={{ width: `${porcentajeProduccion}%` }} className="barSection produccion"></div>
        <div style={{ width: `${porcentajeNoFacturado}%` }} className="barSection noFacturado"></div>
      </div>
    </div>
  );
};

export default GraficoBarra;
{/* <div className='presupuesto-bar-container'>
<GraficoBarra facturado={13} noFacturado={15} produccion={15} />
</div> */}