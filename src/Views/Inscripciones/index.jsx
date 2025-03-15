import { useEffect, useState } from 'react'
import { TablaInscripciones } from '../../Components/Tabla'
import CenteredSpinner  from '../../Components/CenteredSpinner'
import ExportToExcel from './../../Components/ExportToExcel'

import { server } from '../../db/server'
import { ordenarPorNombre,ordenarPorItem, formatoFecha,formatoNombre } from '../../Functions/funciones'


import axios from 'axios';
import Swal from 'sweetalert2'
import GenerateXml from '../../Components/GenerateXml'

const useFetchDataTables = ({collection,server})=>{
    const [data,setData]=useState([])
    const [excelData,setExcelData]=useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState(null)
    const [isFetched, setIsFetched] = useState(false);
    const [selectedEvent,setSelectedEvent] = useState('')
    const [isSelected,setIsSelected] = useState(false)


    const handleSelectedEvent = (e)=>{  
        e.preventDefault()
        setSelectedEvent(e.target.value)
        setIsSelected(true)
    } 
    const fetchData = async()=>{
        try {
            setLoading(true)
            
            const { data } = await axios.get(`${server}api/v1/${collection}/get/event/by/${selectedEvent}`)
            console.log(data)

            if(data.success){
                
                const orderArray = data.data.map(item=>({
                    id:item.id,
                    data:[item.user.curp, `${formatoNombre(item.user.nombre)} ${item.user.apellido_paterno.toUpperCase()} ${item.user.apellido_paterno.toUpperCase()}`,item.fecha_solicitud,item.association.nombre,item.status],
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
    useEffect(()=>{
        fetchData()
    },[selectedEvent])

    useEffect(()=>{
        if (!isFetched) {
            fetchData();
        }      
    },[isFetched])

    return {
        data,error,loading,handleSelectedEvent,selectedEvent,isSelected
    }
}

export default function Inscripciones(){
    const { data,loading,handleSelectedEvent,selectedEvent,isSelected } = useFetchDataTables({
        collection:'register',
        server
    }) 
    
    
    
    return (
    <>
        <div className='flex flex-col basis-4 scroll-y' > 
        {loading && (<CenteredSpinner />)}
       


       

        {data && selectedEvent && (<ExportToExcel data={data} fileName={selectedEvent}/>)}

        {!loading && (<div>
        <p>{selectedEvent}</p>
            <TablaInscripciones 
                className='w-100'
                path={'/gestion/view/inscripciones/'} 
                encabezados={['CURP','NOMBRE','FECHA DE INSCRIPCIÓN','ASOCIACION']}
                data={data}
                title={'Inscripciones'}
                collection={'users'}
                server={server}
                handleSelectedEvent={handleSelectedEvent}
                selectedEvent={selectedEvent}
                isSelected={isSelected}
            />
        </div>)}

        {data && selectedEvent && (<GenerateXml data={data} />)}
           
        </div>
    </>
        
    )

}