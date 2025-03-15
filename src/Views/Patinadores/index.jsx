import { useEffect, useState } from 'react'
import { TablaServicios } from '../../Components/Tabla'
import CenteredSpinner  from '../../Components/CenteredSpinner'

import { server } from '../../db/server'
import { ordenarPorNombre,ordenarPorItem, formatoFecha } from '../../Functions/funciones'

import axios from 'axios';

const useFetchDataTables = ({collection,server})=>{
    const [data,setData]=useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(null)
    const [isFetched, setIsFetched] = useState(false);


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true)
                console.log(`${server}api/v1${collection}`)
                const { data } = await axios.get(`${server}api/v1${collection}`)
                console.log(data)
    
                if(data.success){
                    const dataOrder = ordenarPorItem(data.data,'apellido_paterno')
                    const orderArray = dataOrder.map(item=>({
                        id:item.id,
                        data:[item.curp, `${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`,item.nivel_actual,formatoFecha(item.fecha_nacimiento),item.asociacion.nombre],
                        content:item
                    }))
                    setData(orderArray)
                    setIsFetched(true);
            
                }else{console.log('No funciona')}
                }catch (error) {
                setError(error) 
                }finally{
                setLoading(false)
                }
        }
        
        if (!isFetched) {
            fetchData();
        }
        
    },[isFetched])

    return {
        data,error,loading
    }
}

export default function Patinadores(){
    const { data,error,loading } = useFetchDataTables({
        collection:'/managment/users',
        server
    }) 
    
    return (
    <>
        <div className='flex flex-col basis-4 scroll-y' > 
        {loading && (<CenteredSpinner />)}

        {!loading && (<div>
            <TablaServicios 
                className='w-100'
                path={'/gestion/view/patinadores/'} 
                encabezados={['CURP','NOMBRE','NIVEL','FECHA DE NACIMEINTO','ASOCIACIÓN','VER']}
                data={data}
                title={'Patinadores'}
                collection={'users'}
            />
        </div>)}
           
        </div>
    </>
        
    )

}