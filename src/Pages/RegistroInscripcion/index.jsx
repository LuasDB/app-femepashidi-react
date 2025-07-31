import { useState,useContext, useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Row, Col, Container,Card, Input,FormGroup,Label, Button, CardFooter,CardHeader,CardBody,Form
    , CardTitle} from "reactstrap"
import axios from "axios"
import { server } from "../../db/server"
import Swal from "sweetalert2"
import './styles.css'
import {obtenerCategoria} from "../../Functions/funciones.js"

const competitionLevels = {
    "Open Internacional": [
      "Debutantes 1", "Debutantes 1 Especial", "Debutantes 2", "Debutantes 2 Especial",
      "Pre-Basicos", "Pre-Basicos Especial", "Básicos", "Básicos Especial",
      "Open Pre-Preliminary", "Open Pre-Preliminary Special", "Open Preliminary",
      "Open Juvenile", "Open Intermediate", "Bronze", "Bronze Special", "Silver",
      "Gold", "Master", "Master Elite", "Bronze Artistic", "Bronze Special Artistic",
      "Silver Artistic", "Gold Artistic", "Master Artistic", "Master Elite Artistic"
    ],
    "⁠Internacional ISU": ["Advaced Novice", "Junior", "Senior"],
    "Nacional": [
      "Debutantes 1", "Debutantes 1 Artistico", "Debutantes 1 Especial", "Debutantes 2",
      "Debutantes 2 Artistico", "Debutantes 2 Especial", "Pre-Básicos", "Pre-Básicos Artistico",
      "Pre-Básicos Especial", "Básicos", "Básicos Especial", "Básicos Artistico",
      "Pre-preliminar", "Pre-preliminar Especial", "Preliminar", "Intermedios 1",
      "Intermedios 2", "Novicios", "Avanzados 1", "Avanzados 2",
      "Adulto Bronce Artistico", "Adulto Plata Artistico", "Adulto Oro Artistico",
      "Adulto Master Artistico", "Adulto Master Elite Artistico", "ADULTO PAREJAS Artistico",
      "ADULTO PAREJAS INTERMEDIATE Artistico", "ADULTO PAREJAS MASTER Artistico",
      "ADULTO PAREJAS MASTER ELITE Artistico"
    ],
  }
const categoriesByCompetition = {
    "Open Internacional": ["A","B","C","D","MAYOR","ADULTO","CLASS I", "CLASS II", "CLASS III", "CLASS IV", "CLASS V"],
    "⁠Internacional ISU": [],
    "Nacional": ["PRE-INFANTIL A",
    "PRE-INFANTIL B",
    "INFANTIL A",
    "INFANTIL B",
    "INFANTIL C",
    "JUVENIL A",
    "JUVENIL B",
    "JUVENIL C",
    "MAYOR",
    "CLASE I",
    "CLASE II",
    "CALSE III",
    "CLASE IV",
    "CLASE V"
]
}

  

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
    const [selectedCompetitionType,setSelectedCompetitionType] = useState('')
    const [isConfirmed,setIsConfirmed] = useState(false)
    const [isCategory,setIsCategory] = useState(false)


    useEffect(()=>{
        const fetchEvents = async()=>{
            try {
                const { data } = await axios.get(`${server}api/v1/events`)
                console.log(data)
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
            const { data } = await axios.get(`${server}api/v1/skaters/${upperCurp}`)
            console.log('respuesta',data)
            if(data.success){
                const verificacion = data?.data?.verificacion;
                
                if(verificacion !== true && verificacion !== 'true'){
                    Swal.fire('No puedes inscribirte aun!','Tu registro aun no ha sido autorizado, espera a que tu asociación verifique tu registro a nuestrta plataforma y una vez autorizado vuelve a intentarlo','warning').then(response=>{
                        if(response.isConfirmed){
                            window.location.reload()
                        }
                    })
                    
                }
                
                setIsRegister(true)
                const user = {
                    ...data.data,
                    categoria: obtenerCategoria(data.data.fecha_nacimiento, data.data.nivel_actual)
                }
                console.log(user)
                setFormData(user)
                
                setDataToSend({...dataToSend,
                    id_user:data.data.id,
                    id_association:data.data.id_asociacion,
                    categoria:user.categoria,
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

    const handleChangeCompetation = (e)=>{
        e.preventDefault()
        const { name, value} = e.target

        const [id,tipo] = value.split(',')
        console.log(tipo)
        setSelectedCompetitionType(tipo.trim())

        if(tipo === '⁠Internacional ISU'){
            setIsCategory(false)
        }else{ setIsCategory(true)}

        setDataToSend({...dataToSend,[name]:id})

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
                if(selectedCompetitionType === '⁠Internacional ISU'){
                    dataToSend['categoria'] = 'NA'
                }
                
                console.log('Data to send',dataToSend)
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

    const getFilteredLevels = ()=>{
        if(!selectedCompetitionType) return []
        const levels = competitionLevels[selectedCompetitionType]
        if (selectedCompetitionType === "⁠Internacional ISU"){
            return levels
        }
        const adultLevels = levels.findIndex(level => level === 'Bronze')
        if(adultLevels === -1) return levels
        return isAdult ? levels.slice(adultLevels) : levels.slice(0, adultLevels)
    }
    const getFilteredCategories = ()=>{
        if (!selectedCompetitionType) return [];
    
        return categoriesByCompetition[selectedCompetitionType] || [];
    };
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
                            onChange={(e)=> setCurp(e.target.value.toUpperCase())}
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
                                <Col md={8}>
                                    <FormGroup>
                                        <Label for="id_events" >Competencia a la que deseas inscribirte</Label>
                                        <Input type="select" name="id_events" id="id_events" placeholder="" onChange={handleChangeCompetation} className={`${formError.id_events === 'empty' ? 'border-red-600' : ''} `} >
                                            <option value=''>--Selecciona un competencia--</option>
                                            {events?.map((item,index)=>(
                                            <option value={`${item.id},${item.tipo_competencia}`} key={`${index}-evento`}>{item.nombre}</option>

                                            ))}
                                            
                                        </Input>
                                    </FormGroup>
                                </Col>
                                    
                            </Row>
                        
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="nivel_actual" >Nivel actual </Label>
                                        <Input type="select" name="nivel_actual" id="nivel_actual" placeholder="" onChange={handleChange} className={`${formError.nivel_actual === 'empty' ? 'border-red-600' : ''} `}  >
                                            {selectedCompetitionType === 'Nacional' ? 
                                                (
                                                    <option value={formData.nivel_actual}>{formData.nivel_actual}</option>
                                                )
                                                :(<>
                                                    <option value="">--Selecciona el nivel--</option>
                                                    {getFilteredLevels().map((level)=>(
                                                        <option key={`${level}-levels`} value={level}>
                                                        {level}
                                                        </option>
                                                    ))}
                                                </>
                                                )
                                            }
                                            
                                        </Input>
                                        
                                    </FormGroup>
                                </Col>

                                {isCategory && (<Col md={4}>
                                    <FormGroup>
                                        <Label for="categoria" >Categoria </Label>
                                        <Input type="select" name="categoria" id="categoria" placeholder="" onChange={handleChange} className={`${formError.categoria === 'empty' ? 'border-red-600' : ''} `} >
                                        {selectedCompetitionType === 'Nacional' ? 
                                                (
                                                    <option value={formData.categoria}>{formData.categoria}</option>
                                                )
                                                :(<>
                                                    <option value="">--Selecciona una categoria--</option>
                                                    {getFilteredCategories().map((category)=>(
                                                        <option key={`${category}-category`} value={category}>
                                                        {category}
                                                        </option>
                                                    ))}
                                                </>
                                                )
                                            }
                                        
                                        </Input>
                                    </FormGroup>
                                </Col>)}
                            </Row>

                        
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
                )}
            </div>
        </>
    )


 
}