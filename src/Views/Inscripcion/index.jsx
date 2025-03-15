import {useEffect, useState } from 'react'
import { Card,CardHeader,Button,Label, CardTitle, CardBody, Table, CardText,Row,Col, FormGroup, Input} from "reactstrap";
import { useParams,useNavigate,Link} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

import CenteredSpinner from '../../Components/CenteredSpinner';

import axios from 'axios';
import Swal from 'sweetalert2';



import {server} from '../../db/server'
import { formatoFecha} from '../../Functions/funciones'




export default function Inscripcion(){
    const { id } = useParams()
    const navigator = useNavigate()
    const [loading,setLoading] = useState(true)
    const [isFetched, setIsFetched] = useState(false);
    const [user,setUser] = useState({})
    
    
    


    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setLoading(true)
                const {data} = await axios.get(`${server}api/v1/managment/register/${id}`)
                if(data.success){
                    console.log(data.data)
                    setUser(data.data) 
                    
                }              
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            
            
        }
        if (!isFetched) {
            fetchData();
        }
    },[isFetched])

    const handleEdit =()=>{
        navigator(`/gestion/forms/inscripcion/${id}`)
    }
    return (
        <>
            {loading && (<CenteredSpinner />)}

       {!loading && (<div>
        <Card className='m-1 rounded-xl shadow mt-0  p-8 overflow-x-auto bg-white' >
        <div className='w-full flex justify-end text-[25px] text-curious-blue-500 cursor-pointer hover:text-curious-blue-600' >
        <FaEdit onClick={handleEdit}/>
        </div>
        {/* https://femepashidi.siradiacion.com.mx/images/users/ */}
            <CardTitle className="flex font-bold"> {user.curp} </CardTitle>
            <img className='w-40'
            src={`https://femepashidi.siradiacion.com.mx/images/users/${user.user.img}`} />
            <CardHeader className="flex flex-col justify-between bg-white">
                <CardTitle className='font-bold text-curious-blue-900'> </CardTitle>
                    
            </CardHeader> 
            <CardHeader className="flex flex-col justify-between bg-white">
                <CardTitle className='font-bold text-curious-blue-900'>Datos del participante </CardTitle>
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-1/2'> 
                        <span className='text-curious-blue-700'>Nombre</span> 
                        <h2 className='font-medium text-gray-600'>{user.user.nombre} {user.user.apellido_paterno} {user.user.apellido_materno}</h2>
                    </div>
                    <div className='w-1/2'>
                        <span className='text-curious-blue-700'>Fecha de nacimiento</span> 
                        <h2 className='font-medium text-gray-600'>{formatoFecha(user.user.fecha_nacimiento)}</h2>
                    </div>              
                </FormGroup>    
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-1/2'> 
                        <span className='text-curious-blue-700'>SEXO</span> 
                        <h2 className='font-medium text-gray-600'>{user.user.sexo} </h2>
                    </div>
                    <div className='w-1/2'>
                        <span className='text-curious-blue-700'>Lugar de nacimiento</span> 
                        <h2 className='font-medium text-gray-600'>{user.user.lugar_nacimiento}</h2>
                    </div>              
                </FormGroup>
                             
            </CardHeader>
            <CardHeader className="flex flex-col justify-between bg-white">
                <CardTitle className='font-bold text-curious-blue-900'>Datos de contacto </CardTitle>
               
                
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-1/2'> 
                        <span className='text-curious-blue-700'>Correo</span> 
                        <h2 className='font-medium text-gray-600'>{user.user.correo}</h2>
                    </div>
                    <div className='w-1/2'>
                        <span className='text-curious-blue-700'>Whatsapp</span> 
                        <h2 className='font-medium text-gray-600'>{user.user.telefono}</h2>
                    </div>
                   
                </FormGroup> 
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-1/2'> 
                        <span className='text-curious-blue-700'>Asociación</span> 
                        <h2 className='font-medium text-gray-600'>{user.association.nombre}</h2>
                    </div>
                    <div className='w-1/2'>
                        <span className='text-curious-blue-700'>Siglas</span> 
                        <h2 className='font-medium text-gray-600'>{user.association.abreviacion}</h2>
                    </div>
                   
                </FormGroup>      
                   
            </CardHeader>
            <CardHeader className="flex flex-col justify-between bg-white">
                <CardTitle className='font-bold text-curious-blue-900'>Datos de la competencia</CardTitle>
               
                
                <FormGroup className='flex flex-row gap-10'>
                    <div className=''> 
                        <span className='text-curious-blue-700'>Nombre de la competencia</span> 
                        <h2 className='font-medium text-gray-600'>{user.event.nombre}</h2>
                    </div>
                   
                   
                </FormGroup>  
                
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-11/12'> 
                        <span className='text-curious-blue-700'>Fecha de inicio</span> 
                        <h2 className='font-medium text-gray-600'>{formatoFecha(user.event.fecha_inicio)}</h2>
                    </div>
                    <div className='w-11/12'> 
                        <span className='text-curious-blue-700'>Fecha de finalización</span> 
                        <h2 className='font-medium text-gray-600'>{formatoFecha(user.event.fecha_fin)}</h2>
                    </div>
                   
                   
                </FormGroup>  
                
                   
            </CardHeader>
          
            <CardHeader className="flex flex-col justify-between bg-white">
                <CardTitle className='font-bold text-curious-blue-900'>Nivel de competencia en la Inscripcion</CardTitle>
               
                
                <FormGroup className='flex flex-row gap-10'>
                    <div className='w-1/2'> 
                        <span className='text-curious-blue-700'>Nivel a competir</span> 
                        <h2 className='font-medium text-gray-600'>{user.nivel_actual}</h2>
                    </div>
                    <div className='w-1/2'>
                        <span className='text-curious-blue-700'>Categoria</span> 
                        <h2 className='font-medium text-gray-600'>{user.categoria}</h2>
                    </div>
                   
                </FormGroup>  
               
                   
            </CardHeader>
          

       
            
        </Card>
        </div>)}
       

        </>
       
    )
}