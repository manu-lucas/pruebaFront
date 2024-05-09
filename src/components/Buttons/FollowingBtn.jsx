import React from 'react'
import { Button, ConfigProvider, DatePicker, Slider, Space, Switch, Table } from 'antd';
import { BsArrowRight } from "react-icons/bs";


const FollowingBtn = ({setStep,value,handleClick}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `#1E84FD`,
            colorPrimaryHover: `#1E84FD`,
            colorPrimaryActive: `#1E84FD`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button onClick={handleClick
        //setStep(value)

      } type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
        <span>Continuar</span>
        <BsArrowRight/>
      </Button>
    </ConfigProvider>
  )
}

export default FollowingBtn