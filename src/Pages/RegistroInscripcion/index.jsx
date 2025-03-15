import { useState,useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, Container,Card, Input,FormGroup,Label, Button, CardFooter,CardHeader,CardBody,Form
    , CardTitle} from "reactstrap"
import axios from "axios"
import { server } from "../../db/server"
import Swal from "sweetalert2"
import './styles.css'




export default function RegistroInscripcion(){
  const [curp,setCurp] = useState('')
  const [formData,setFormData] = useState({})
  const [dataToSend,setDataToSend] = useState({
    id_events:'',

  })
  const [events,setEvents] = useState({})
  const [formError,setFormError] = useState({})
  const [isRegister,setIsRegister] = useState(false)
  const [isAdult,setisAdult] = useState(false)
  const [isConfirmed,setIsConfirmed] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchEvents = async()=>{
        try {
            const { data } = await axios.get(`${server}api/v1/managment/events`)
            if(data.success){
                setEvents(data.data.filter(item=>item.status === 'Activo'))
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    fetchEvents()

  },[])


    
    const handleSearch = async(e)=>{
        e.preventDefault()
        const upperCurp = curp.toUpperCase()
        console.log('Nuevo curp',upperCurp)
        setCurp(upperCurp)
        
        try {
            const { data } = await axios.get(`${server}api/v1/users/obtain/by/curp/one/user/${upperCurp}`)
            console.log('respuesta',data)
            if(data.success){
                setIsRegister(true)
                setFormData(data.data)
                setDataToSend({...dataToSend,
                    id_user:data.data.id,
                    id_association:data.data.id_asociacion,
                    categoria:data.data.categoria,
                    nivel_actual:data.data.nivel_actual
                })
                console.log('ES ADULTO?',data.data.nivel_actual.toLowerCase())
                if(data.data.nivel_actual.toLowerCase().includes('adulto')){
                    setisAdult(true)
                }
            }

        } catch (error) {
            Swal.fire('EL CURP NO FUE ENCONTRADO','Verifica que estes registrado','error').then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                }
            })
            
        }
        

    }

    const handleChange = (e)=>{
        e.preventDefault()
        const { name, value} = e.target
        setDataToSend({...dataToSend,[name]:value})
    }
    const handleCheckboxChange = (event) => {
        setIsConfirmed(event.target.checked);
      };

    const handleSubmit = async()=>{

        
      
       
        Swal.fire({
            position: "center",
            icon: "question",
            title: "ESTAS A PUNTO DE INSCRIBIRTE",
            html:`¿Revisate que la información sea correcta?`,
            showConfirmButton: true,
            showCancelButton:true,
            confirmButtonText:'Si, claro',
            cancelButtonText:'No, espera'
        }).then(async(result)=>{
            if(result.isConfirmed){
                let empty={}
                for(let input in dataToSend){
                    if(!dataToSend[input]){
                        empty[input]='empty'
                console.log('Vacio')
        
                    }
                }
                
                if(Object.keys(empty).length > 0){
                    setFormError(empty)
                    Swal.fire('Todos los campos deben ser llenados','','warning')
                    console.log('Ocurrio un error')
                    return
                }
                dataToSend['status']='Preinscrito'
                dataToSend['fecha_solicitud']=new Date().toISOString().split('T')[0]
        
                const { data } = await axios.post(`${server}api/v1/register`,dataToSend)
               console.log(data)
                
                if(data.success){
                    Swal.fire(
                        {
                          position: "center",
                          icon: "success",
                          title: 'Solicitud enviada',
                          html:`Te enviamos un correo,revisalo para continuar con tu proceso`,
                          showConfirmButton: true,
                          // timer: 1500
                        }
                        ).then(result=>{
                            if(result.isConfirmed){
                                window.location.href = 'https://femepashidi.com.mx/inicio/';
                            }
                        })
                }else{
                    Swal.fire(`Algo salio mal`,data.message,'error')
                }
            }
        })







       

        

    }
    return (
        <>
        <div> {!isRegister && (
            <Container className='flex items-center justify-center min-h-screen bg-[#ecf0f1] w-full p-4'>
                <Card className='w-full md:w-[50%] p-6 md:p-10 flex flex-col shadow-lg'>
                    <CardTitle className="text-center text-blue-900 mb-4">
                    <h1 className='text-blue-600 font-bold text-lg md:text-xl mb-2'>Inscripción a competencias Femepashidi</h1>
                    <h2 className='text-base md:text-lg'>Bienvenido</h2>
                    </CardTitle>
                    <form className="flex flex-col">
                    <FormGroup>
                        <Label className='text-yellow-600'>CURP</Label>
                        <Input 
                        type="text" 
                        value={curp}
                        onChange={(e)=> setCurp(e.target.value)}
                        placeholder="Ingresa tu CURP para accesar"
                        required
                        className="p-2 text-sm md:text-base"
                        />
                    </FormGroup>
                    <Button className="mt-4 bg-[#3498db] text-white py-2 px-4 rounded-lg self-center md:self-start w-full md:w-auto" onClick={handleSearch}>
                        Ingresar
                    </Button>
                    </form>
                    <a 
                    href="https://www.femepashidi.com.mx/inicio/registro/" 
                    className={`
                        mt-4
                        p-2
                        bg-blue-200
                        rounded-lg
                        text-blue-500
                        border-solid
                        border-blue-900
                        hover:bg-blue-400
                        hover:text-white
                        text-center
                        block
                    `}
                    >
                    Si aún no te has registrado en la plataforma, regístrate aquí
                    </a>
                </Card>
            </Container>

            )}
            </div>


        <div className='flex justify-center w-full mb-10'> 
        {isRegister && (
            <Card className='m-2 rounded-xl shadow mt-4 mb-2 w-[90%]'>
            <CardHeader className='text-blue-900'>
                <h2>Selecciona la competencia a la que deseas Inscribirte.</h2>
                <h2>Se te enviara un correo de notificación cuando tu solicitud haya sido aprobada</h2>
                <h3>Te sugerimos estar atento</h3>
            </CardHeader>
            <CardBody>
                <Form className="text-blue-500" > 
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="curp" >CURP</Label>
                                <Input type="text" name="curp" id="curp"  onChange={handleChange} className={`${formError.curp === 'empty' ? 'border-red-600' : ''}`} value={formData.curp} disabled={isRegister}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="nombre" >Nombre(s) </Label>
                                <Input type="text" name="nombre" id="nombre" placeholder="" onChange={handleChange} className={`${formError.nombre === 'empty' ? 'border-red-600' : ''} `} value={formData.nombre} disabled={isRegister}/>
                            </FormGroup>
                        </Col>
                        
                        <Col md={4}>
                            <FormGroup>
                                <Label for="apellido_paterno" >Apellido Paterno </Label>
                                <Input type="text" name="apellido_paterno" id="apellido_paterno" placeholder="" onChange={handleChange} className={`${formError.apellido_paterno === 'empty' ? 'border-red-600' : ''} `} value={formData.apellido_paterno} disabled={isRegister}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="apellido_materno" >Apellido Materno </Label>
                                <Input type="text" name="apellido_materno" id="apellido_materno" placeholder="" onChange={handleChange} className={`${formError.apellido_materno === 'empty' ? 'border-red-600' : ''} `} value={formData.apellido_materno} disabled={isRegister}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={4}>
                            <FormGroup>
                                <Label for="asociacion" >Asociación</Label>
                                <Input type="text" name="asociacion" id="asociacion" placeholder="" onChange={handleChange} className={`${formError.asociacion === 'empty' ? 'border-red-600' : ''} `} value={formData.asociacion.nombre} disabled={isRegister}>

                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="correo" >Correo</Label>
                                <Input type="text" name="correo" id="correo" placeholder="" onChange={handleChange} className={`${formError.correo === 'empty' ? 'border-red-600' : ''} `} value={formData.correo} disabled={isRegister}/>
                            </FormGroup>
                        </Col>
                       
                        <Col md={4}>
                            <FormGroup>
                                <Label for="telefono" >Telefono</Label>
                                <Input type="text" name="telefono" id="telefono" placeholder="" onChange={handleChange} className={`${formError.telefono === 'empty' ? 'border-red-600' : ''} `} value={formData.telefono} disabled={isRegister}>

                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="nivel_actual" >Nivel actual </Label>
                                {isAdult && (
                                    <Input type="select" name="nivel_actual" id="nivel_actual" placeholder="" onChange={handleChange} className={`${formError.nivel_actual === 'empty' ? 'border-red-600' : ''} `}  >
                                    <option value="">--Selecciona un NIVEL--</option>
                                    <option value="Adulto Bronce">Adulto Bronce</option>
                                    <option value="Adulto Bronce Artistico">Adulto Bronce Artistico</option>
                                    <option value="Adulto Plata">Adulto Plata</option>
                                    <option value="Adulto Plata Artistico">Adulto Plata Artistico</option>
                                    <option value="Adulto Oro">Adulto Oro</option>
                                    <option value="Adulto Oro Artistico">Adulto Oro Artistico</option>
                                    <option value="Adulto Master">Adulto Master</option>
                                    <option value="Adulto Master Artistico">Adulto Master Artistico</option>
                                    <option value="Adulto Master Elite">Adulto Master Elite</option>
                                    <option value="Adulto Master Elite Artistico">Adulto Master Elite Artistico</option>
                                    <option value="ADULTO PAREJAS">ADULTO PAREJAS</option>
                                    <option value="ADULTO PAREJAS Artistico">ADULTO PAREJAS Artistico</option>
                                    <option value="ADULTO PAREJAS INTERMEDIATE">ADULTO PAREJAS INTERMEDIATE</option>
                                    <option value="ADULTO PAREJAS INTERMEDIATE Artistico">ADULTO PAREJAS INTERMEDIATE Artistico</option>
                                    <option value="ADULTO PAREJAS MASTER">ADULTO PAREJAS MASTER</option>
                                    <option value="ADULTO PAREJAS MASTER Artistico">ADULTO PAREJAS MASTER Artistico</option>
                                    
                                    </Input>
                                    
                                    
                                )}

                                {!isAdult && (
                                    <Input type="text" name="nivel_actual" id="nivel_actual" placeholder="" onChange={handleChange} className={`${formError.nivel_actual === 'empty' ? 'border-red-600' : ''} `} value={formData.nivel_actual} disabled={isRegister} />
                                )}
                                   
                                {/* <option value="Debutantes 1">Debutantes 1</option>
                                <option value="Debutantes 1 Artistico">Debutantes 1 Artistico</option>
                                <option value="Debutantes 1 Especial">Debutantes 1 Especial</option>
                                <option value="Debutantes 2">Debutantes 2</option>
                                <option value="Debutantes 2 Artistico">Debutantes 2 Artistico</option>
                                <option value="Debutantes 2 Especial">Debutantes 2 Especial</option>
                                <option value="Pre-Básicos">Pre-Básicos</option>
                                <option value="Pre-Básicos Artistico">Pre-Básicos Artistico</option>
                                <option value="Pre-Básicos Especial">Pre-Básicos Especial</option>
                                <option value="Básicos">Básicos</option>
                                <option value="Básicos Especial">Básicos Especial</option>
                                <option value="Básicos Artistico">Básicos Artistico</option>
                                <option value="Pre-preliminar">Pre-preliminar</option>
                                <option value="Pre-preliminar Especial">Pre-preliminar Especial</option>
                                <option value="Preliminar">Preliminar</option>
                                <option value="Intermedios 1">Intermedios 1</option>
                                <option value="Intermedios 2">Intermedios 2</option>
                                <option value="Novicios">Novicios</option>
                                <option value="Avanzados 1">Avanzados 1</option>
                                <option value="Avanzados 2">Avanzados 2</option>
                                <option value="Adulto Bronce Artistico">Adulto Bronce Artistico</option>
                                <option value="Adulto Plata Artistico">Adulto Plata Artistico</option>
                                <option value="Adulto Oro Artistico">Adulto Oro Artistico</option>
                                <option value="Adulto Master Artistico">Adulto Master Artistico</option>
                                <option value="Adulto Master Elite Artistico">Adulto Master Elite Artistico</option>
                                <option value="ADULTO PAREJAS Artistico">ADULTO PAREJAS Artistico</option>
                                <option value="ADULTO PAREJAS INTERMEDIATE Artistico">ADULTO PAREJAS INTERMEDIATE Artistico</option>
                                <option value="ADULTO PAREJAS MASTER Artistico">ADULTO PAREJAS MASTER Artistico</option>
                                <option value="ADULTO PAREJAS MASTER ELITE Artistico">ADULTO PAREJAS MASTER ELITE Artistico</option> */}
                                    
                               
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
    
                                <Label for="categoria" >Categoria</Label>
                                {isAdult && (
                                    <Input type="select" name="categoria" id="categoria" placeholder="" onChange={handleChange} className={`${formError.categoria === 'empty' ? 'border-red-600' : ''} `} >
                                    <option value="">--Selecciona una categoria--</option>
                                    <option value="CLASS I">CLASS I(NACIDOS ENTRE EL 1 DE JULIO DE1985 Y 30 DE JUNIO DE 1995)</option>
                                    <option value="CLASS II">CLASS II(NACIDOS ENTRE EL 1 DE JULIO DE1975 Y 30 DE JUNIO DE 1985)</option>
                                    <option value="CALSS III">CLASS III(NACIDOS ENTRE EL 1 DE JULIO DE1965 Y 30 DE JUNIO DE 1975)</option>
                                    <option value="CLASS IV">CLASS IV(NACIDOS ENTRE EL 1 DE JULIO DE1955 Y 30 DE JUNIO DE 1965)</option>
                                    <option value="CLASS V">CLASS V(NACIDOS ANTES DEL 30 DE JUNIO DE 1965)</option>
                                    </Input>
                                )}


                                {!isAdult && (
                                    <Input type="text" name="categoria" id="categoria" placeholder="" onChange={handleChange} className={`${formError.categoria === 'empty' ? 'border-red-600' : ''} `} value={formData.categoria} disabled={isRegister}      
                                />
                                )}
                                
                                {/* <option value="">--Selecciona una categoria--</option>
                                <option value="PRE-INFANTIL A">PRE-INFANTIL A</option>
                                <option value="PRE-INFANTIL B">PRE-INFANTIL B</option>
                                <option value="INFANTIL A">INFANTIL A</option>
                                <option value="INFANTIL B">INFANTIL B</option>
                                <option value="INFANTIL C">INFANTIL C</option>
                                <option value="JUVENIL A">JUVENIL A</option>
                                <option value="JUVENIL B">JUVENIL B</option>
                                <option value="JUVENIL C">JUVENIL C</option>
                                <option value="MAYOR">MAYOR </option>
                                <option value="CLASE I">CLASE I</option>
                                <option value="CLASE II">CLASE II</option>
                                <option value="CALSE III">CLASE III</option>
                                <option value="CLASE IV">CLASE IV</option>
                                <option value="CLASE V">CLASE V</option> */}
                                
                               
                               
                            </FormGroup>
                        </Col>       
                    </Row>
                    <Row>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="id_events" >Competencia a la que deseas inscribirte</Label>
                                <Input type="select" name="id_events" id="id_events" placeholder="" onChange={handleChange} className={`${formError.id_events === 'empty' ? 'border-red-600' : ''} `} >
                                    <option value=''>--Selecciona un competencia--</option>
                                    {events?.map((item,index)=>(
                                    <option value={item.id} key={`${index}-evento`}>{item.nombre}</option>

                                    ))}
                                    
                                </Input>
                            </FormGroup>
                        </Col>
                             
                    </Row>
                    {/* fubm901026hdfnrr07 */}
                    <Row>
                    <FormGroup >
                        <Label check className="text-black ml-3"> Me comprometo a realizar el pago de la competencia en tiempo y forma </Label>
                            <Input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={handleCheckboxChange}
                            className="custom-checkbox border-soid border-blue-700"
                            />
                           
                        
                        </FormGroup>
                    </Row>
                  
                 
                   
                  
                    
                </Form>
            </CardBody>
            <CardFooter>
            {isConfirmed && (<Button onClick={handleSubmit}>Guardar</Button>)}
                
            </CardFooter>


        </Card>
            )}</div>

           

           

         
        </>
       

    )
}