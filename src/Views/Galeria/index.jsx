import React, { useState,useEffect,useRef } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row, Input,FormGroup,Label } from 'reactstrap';
import { FaTimes } from 'react-icons/fa'; 
import GaleriaImagenes from './../../Components/GaleriaImagenes'
import Swal from 'sweetalert2';
import axios from 'axios';
import { server } from './../../db/server'

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [filesList,setFilesList] = useState([])
  const [titulo,setTitulo] = useState('')

  // Función para manejar la selección de una nueva foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFilesList([...filesList, file])
    

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([...photos, reader.result]);

      };
      reader.readAsDataURL(file);
    }
    

    
    
  };

  // Función para agregar la nueva foto a la galería
  

  // Función para eliminar una foto de la galería
  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));

    setFilesList(filesList.filter((_,i) => i !== index))
  };

  //Funcion para subir a base de datos la nueva galeria

  const hanldeUpdateGallery = async()=>{


    if(photos.length === 0 || titulo === ''){
      Swal.fire('Antención', 'Es necesario que coloques el titulo y subas por lo menos una imagen para poder actualizar tu galeria','warning')
    }

    try {

      const formData = new FormData();
        formData.append('titulo',titulo)
        filesList.forEach((file,index)=>{
        formData.append(`foto_${index}`,file)
      })

      console.log(`${server}api/v1/gallery/gallery/6fzcCXDa5AZ3w13m5T9e`)
     

      const { data } = await axios.patch(`${server}api/v1/gallery/gallery/6fzcCXDa5AZ3w13m5T9e`,formData)
      if(data.success){

      Swal.fire('Galeria actualizada', 'La galeria se actualizó correctamente','success')

      }
    } catch (error) {
      Swal.fire('Algo salio mal', 'algo salio mal y no se pudo actualizar tu galeria:' + error,'warning')
      
    }
  }

  return (
    <div>
    <Row>
      <Col md={6}>
      <FormGroup >
      <Label>Titulo de la Galeria</Label>
      </FormGroup>
        <Input type="text" placeholder='Ejemplo: Torneo nacional 2024' onChange={(e)=>setTitulo(e.target.value)}/>
      </Col>
    </Row>
      <Row className='m-5'>
        {/* Botón para agregar una nueva foto */}
        <Col md="3">
          <Card onClick={() => document.getElementById('photoInput').click()} style={{ cursor: 'pointer' }} className='border-2 border-dashed border-gray-400 rounded-lg p-6 flex justify-center items-center cursor-pointer hover:bg-gray-100  h-80'>
            <CardBody className=''>
              <CardTitle className="text-4xl text-gray-400text-center ">+</CardTitle>
            </CardBody>
          </Card>
        </Col>

        {/* Mostrar fotos subidas */}
        {photos.map((photo, index) => (
          <Col md="3" key={index}>
            <Card className='relative'>
              <CardImg top src={photo} alt="Photo" className='h-80'/>            
                <FaTimes  onClick={() => removePhoto(index)} className='absolute top-1 right-1 cursor-pointer text-red-500' />
            </Card>
          </Col>
        ))}
      </Row>

    

      {/* Input oculto para subir fotos */}
      <Input
        type="file"
        id="photoInput"
        style={{ display: 'none' }}
        onChange={handlePhotoChange}
      />

      {/* Botón para guardar los cambios */}
      <Button color="success" className="mt-3" onClick={hanldeUpdateGallery}>Guardar nueva galeria</Button>

      <GaleriaImagenes  images={photos} titulo={titulo}/>
    </div>
    
  );
};



export default PhotoGallery;
