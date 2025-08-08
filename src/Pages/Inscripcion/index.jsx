import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react'; 
import { Row, Col, Container,Card, Input,FormGroup,Label, Button, CardFooter,CardHeader,CardBody,Form
    , CardTitle} from "reactstrap"
import './styles.css';
import axios from "axios"
import { server } from "../../db/server"
import Swal from "sweetalert2"
import {obtenerCategoria} from "../../Functions/funciones.js"
import { competitionLevels,categoriesByCompetition } from "./../../Utils/lists.js"


const InscripcionCompetencia = () => {
    const [curp,setCurp] = useState('')
    const [formData,setFormData] = useState({})
    const [dataToSend,setDataToSend] = useState({
        id_events:'',

    })
    const [originalLevel,setOriginalLevel]=useState(null)
    const [events,setEvents] = useState({})
    const [formError,setFormError] = useState({

    })
    const [loading,setLoading] = useState(false)
    const [isRegister,setIsRegister] = useState(false)
    const [isAdult,setisAdult] = useState(false)
    const [selectedCompetitionType,setSelectedCompetitionType] = useState('')
    const [isConfirmed,setIsConfirmed] = useState(false)
    const [isCategory,setIsCategory] = useState(false)

    const [newFoto, setNewFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const navigator = useNavigate()

    const fetchEvents = async()=>{
            try {
                const { data } = await axios.get(`${server}api/v1/events`)
                
                if(data.success){
                    const activeEvents = data.data.filter(item=>item.status === 'Activo')
                    console.log(activeEvents)

                    if(activeEvents.length === 0){
                        Swal.fire('¡Aun no hay competencias!','Revisa nuestras fechas para poder inscribirte','info')
                        .then(result=>{
                            if(result.isConfirmed){
                                window.location.href ='https://femepashidi.com.mx/inicio'
                            }
                        })
                    }else{
                    setEvents(activeEvents)

                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        
    }
    const fetchSkater = async()=>{
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
                
                setFormData(user)
                setPreviewFoto(user?.img?`${server}${user?.img?.path}`:`${server}uploads/skaters/user.png`)
                setOriginalLevel({
                    nivel_actual:user.nivel_actual,
                    categoria:user.categoria
                })
                
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
    useEffect(() => {    
        fetchEvents()
    }, []);

    const handleSearch = async(e)=>{
        e.preventDefault()
        fetchSkater()
    }
    const handleChange = (e)=>{
        e.preventDefault()
        const { name, value} = e.target
        setFormData({...formData,[name]:value})
    }
    const handleChangeCompetation = (e)=>{
        e.preventDefault()
        const { name, value} = e.target

        const [id,tipo] = value.split(',')
        console.log(id)
        console.log(tipo)
        setSelectedCompetitionType(tipo.trim())

        if(tipo === '⁠Internacional ISU'){
            setIsCategory(false)
        }else{ setIsCategory(true)}
        if(tipo === 'Nacional'){
            setFormData({...formData,categoria:originalLevel.categoria,nivel_actual:originalLevel.nivel_actual})
        }

        setDataToSend({...dataToSend,[name]:id})

    }
    const handleCheckboxChange = (event) => {
        setIsConfirmed(event.target.checked);
    };
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
    



    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
        setNewFoto(file);
        setPreviewFoto(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataForm = new FormData();
        console.log(formData)
        dataForm.append('association',JSON.stringify(formData.asociacion))
        dataForm.append('user',JSON.stringify(formData))
        dataForm.append('status','Preinscrito')
        dataForm.append('fecha_solicitud',new Date().toISOString().split('T')[0])
        dataForm.append('categoria',formData.categoria)
        if(selectedCompetitionType === '⁠Internacional ISU'){
            dataForm.append('categoria','NA')
        }
        dataForm.append('nivel_actual',formData.nivel_actual)
        dataForm.append('event',JSON.stringify(events.find(item => item._id === dataToSend.id_events)))
        if (newFoto) {
        dataForm.append('foto', newFoto);
        dataForm.append('lastFoto',formData.img?.path)
        }
        
        console.log('Datos a enviar:', Object.fromEntries(dataForm));

        Swal.fire({
            position: "center",
            icon: "question",
            title: "ESTAS A PUNTO DE INSCRIBIRTE",
            html:`¿Revisate que la información sea correcta?`,
            showConfirmButton: true,
            showCancelButton:true,
            confirmButtonText:'Si, claro',
            cancelButtonText:'No, espera'
        })
        .then(async(result)=>{
            if(result.isConfirmed){
                try {
                    setLoading(true)
                    const { data } = await axios.post(`${server}api/v1/register`,dataForm)
                    if(data.success){
                        console.log('respuesta',data)
                        setFormData({})
                        setDataToSend({})
                        setIsRegister(false)
                        setCurp('')
                        setIsConfirmed(false)
                        setNewFoto(null)
                        setPreviewFoto(null)
                        setSelectedCompetitionType('')
                        setOriginalLevel(null)
                        setisAdult(false)
                        setIsCategory(false)
                        setFormError({})
                        Swal.fire('Tu solicitud fue enviada 🎉','Te haremos llegar un correo cuando se acepte tu inscripción, te sugerimos estar pendiente.','success').then((result)=>{
                            if(result.isConfirmed){
                                window.location.href = 'https://femepashidi.com.mx/inicio';
                            }
                        })
                    }
                } catch (error) {
                    return
                }finally{setLoading(false)}
            }})
        
    };

 
  return (
    <>
        {!isRegister&&(<div> 
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
                                href={`${import.meta.env.VITE_URL_APP}registro`}
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
        </div>)}
        {isRegister && (
            <div className="inscripcion-container">
                <form onSubmit={handleSubmit} className="w-full max-w-4xl">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Inscripción a Competencia</h1>
                    <p className="text-center text-gray-500 mb-2">Confirma tus datos y Selecciona la competencia a la que deseas Inscribirte.</p>
                    <p className="text-center text-gray-500 mb-2">Se te enviara un correo de notificación cuando tu solicitud haya sido aprobada.</p>
                    <p className="text-center text-gray-500 mb-2">Si deseas actualizar tu fotografía haz click en tu foto actual y selecciona una nueva.</p>

                    <div className="credential-card">
                    {/* Encabezado de la credencial */}
                    <div className="credential-header">
                        <h2 className="text-xl font-bold">Credencial del Participante</h2>
                    </div>
                    
                    <div className="credential-body">
                        {/* Sección de la Foto */}
                        <div className="credential-photo-section">
                        <div className="photo-container">
                            <img src={previewFoto || `${server}uploads/skaters/user.png`} alt="Foto del patinador" className="participant-photo" />
                            <label htmlFor="file-upload" className="photo-upload-overlay">
                            <Camera className="w-8 h-8 text-white" />
                            <span className="text-xs mt-1">Cambiar foto</span>
                            </label>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden"/>
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="text-xl font-bold text-gray-900">{`${formData.nombre} ${formData.apellido_paterno} ${formData.apellido_materno}`}</h3>
                            <p className="text-sm text-gray-500">{formData.curp}</p>
                            <p className="text-sm text-gray-500">{formData.asociacion.nombre}</p>
                        </div>
                        </div>
                        
                        {/* Sección de Datos */}
                        <div className="credential-info-section">
                            <div className="info-grid">
                                <div>
                                    <label>Correo</label>
                                    <input type="text" value={formData.correo}  />
                                </div>
                                <div>
                                    <label>Telefono de contacto</label>
                                    <input type="text" value={formData.telefono}  />
                                </div>
                            </div>
                            <Row>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label for="id_events" className='text-gray-600 mt-8'>Competencia a la que deseas inscribirte</Label>
                                        <Input type="select" required name="id_events" id="id_events" placeholder="" onChange={handleChangeCompetation} className={`${formError.id_events === 'empty' ? 'border-red-600' : ''} `} >
                                            <option value=''>--Selecciona un competencia--</option>
                                            {events?.map((item,index)=>(
                                            <option value={`${item._id},${item.tipo_competencia}`} key={`${index}-evento`}>{item.nombre}</option>

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
                                        <Input type="select" required name="categoria" id="categoria" placeholder="" onChange={handleChange} className={`${formError.categoria === 'empty' ? 'border-red-600' : ''} `} >
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
                            
                        

            <Row className="form-check form-switch ">
            <Input
                type="checkbox"
                className="form-check-input custom-switch hover:cursor-pointer"
                id="pagoSwitch"
                checked={isConfirmed}
                onChange={handleCheckboxChange}
                required
            />
            <Label className="form-check-label hover:cursor-pointer" htmlFor="pagoSwitch">
                Me comprometo a realizar el pago de la competencia en tiempo y forma
            </Label>
            </Row>



                            
                        </div>
                    </div>
                    </div>


                    {isConfirmed && (<div className="flex justify-end mt-8">
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ?'Enviando Información...': 'Confirmar Inscripción'}
                        </button>
                    </div>)}
                </form>
            </div>
        )}
    </>
    
  );
};

export default InscripcionCompetencia;