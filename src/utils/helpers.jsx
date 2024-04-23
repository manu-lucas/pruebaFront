import axios from "axios";
import { useNavigate } from "react-router-dom";

//function para setear los proveedores

export const getDataProveedores = async (userLoggedData) => {
  try {
    const response = await axios.get(`http://localhost:8080/proveedores/${userLoggedData.id}`);
    return response.data.data; // Devuelve los datos en caso de éxito
  } catch (err) {
    throw new Error('Error al obtener los datos de proveedores'); // Lanza un error en caso de fallo
  }
};

export const setNavigationHelper = (name,index,menuOptions,setMenuOptions) => {
    let updatedMenuOptions = menuOptions;
    
    updatedMenuOptions[index].submenuOptions.forEach((option) => {
      if (option.name === name) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    
    setMenuOptions(updatedMenuOptions);
}



export const renderComponentByPath = (path_name, componentsMap) => {
    const Component = componentsMap[path_name];
    return Component ? <Component /> : null;
};


export const updateSubMenuAsideOptions = (menuOptions,section,path_name) =>{
  const updateAsideOptions = menuOptions.map((item)=>{
    if(item.text === section){
      //object principal
      const updateSubmenuOptions = item.submenuOptions.map((suboption)=>{
        if(suboption.route === path_name){
          return {...suboption,selected:true}
        }
        return {...suboption,selected:false}
      })
      return {...item,submenuOptions:updateSubmenuOptions,submenuOpen:true}
    }
    return item
  })
  return updateAsideOptions
}


export const redirectToUserDetailRoute = (id) =>{
  const navigate = useNavigate();
  navigate(`/users/${record.id}`)
}