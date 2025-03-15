import { useState,useEffect,useRef } from 'react';
import './styles.css';

export default function ImageGallery({ images,titulo }){
    const [imageData, setImageData] = useState([]);
  
    useEffect(() => {
      const newImageData = images.map((src) => {
        const img = new Image();
        img.src = src;
  
        // Detectamos si la imagen es horizontal o vertical
        return new Promise((resolve) => {
          img.onload = () => {
            const orientation = img.naturalWidth > img.naturalHeight ? 'horizontal' : 'vertical';
            resolve({ src, orientation });
          };
        });
      });
  
      Promise.all(newImageData).then((data) => setImageData(data));
    }, [images]);
  
   
  
    return (
      <>
      <div className='flex justify-center'>
      <h2 className='text-blue-700 font-bold'>{titulo}</h2>
      </div>
  
      <div className="flex flex-wrap gap-4 mt-10 mb-10 justify-center">
        {imageData.map((image, index) => {
          if (image.orientation === 'vertical') {
            return (
              <div
                key={index}
                className="w-[250px] h-[350px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:h-[350px] rounded-xl overflow-hidden border-ice  image-to-show"
                
              >
                <img
                  src={image.src}
                  alt={`Gallery image ${index}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
  
      <div className="flex flex-wrap gap-4 mt-10 mb-10 justify-center">
        {imageData.map((image, index) => {
          if (image.orientation === 'horizontal') {
            return (
              <div
                key={index}
                className="w-[350px] h-[250px] md:w-[300px] md:h-[200px] lg:w-[350px] lg:h-[250px] rounded-xl overflow-hidden border-ice  image-to-show"
                
              >
                <img
                  src={image.src}
                  alt={`Gallery image ${index}`}
                  className="w-full h-full object-cover rounded-xl "
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
     
    );
  }