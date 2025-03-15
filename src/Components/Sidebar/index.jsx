import { useContext } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { AuthContext } from '../../Context/AuthContext';


import { useState } from 'react';

export default function Sidebar({ routes,toggleSidebar }) {
    const [selected, setSelected ] = useState(null)
    const [tittle, setTittle] = useState('Bienvenido')
    const { user } = useContext(AuthContext)
    console.log(user)

    const handleSelected = (index,item)=>{
        setSelected(index)
        setTittle(item.name)
        toggleSidebar()
    }
    return (
        <Card className='h-auto rounded-xl shadow mt-4 mb-4 '>
            <CardHeader>
                {tittle}
            </CardHeader>
            <CardBody>            
                <ul className='list-none'>
                    {routes?.map((item, index) => {
                        if (item.redirect) return null;
                        

                        if(item.type === 'menu' && user.user.tipoUsuario === 'admin'){
                            return (
                            <li className={`border-solid border-1 border-curious-blue-500 hover:border-curious-blue-600 shadow-sm my-6 p-2 rounded-md cursor-pointer ${selected === index ? 'bg-curious-blue-500 text-white' : '' } `}
                            key={index}
                            onClick={()=>handleSelected(index,item)}
                            > 
                            <Link  to={item.path} className={` flex items-center space-x-4 no-underline ${selected === index ? 'bg-curious-blue-500 text-white' : 'text-gray-950' } `}>
                                <div> {item.icon}</div>
                                <div> {item.name}</div>
                            </Link>
                            </li>
                        )
                        }else if(item.type === 'menu' && item.users !== 'admin'){
                            return (
                            <li className={`border-solid border-1  shadow-sm my-6 p-2 rounded-md cursor-pointer ${selected === index ? 'bg-gray-500 text-yellow-600' : '' } `}
                            key={index}
                            onClick={()=>handleSelected(index,item)}
                            > 
                            <Link  to={item.path} className={` flex items-center space-x-4 no-underline ${selected === index ? 'bg-gray-500 text-yellow-400' : 'text-gray-950' } `}>
                                <div> {item.icon}</div>
                                <div> {item.name}</div>
                            </Link>
                            </li>
                        )
                        }

                      
                    })}
                </ul>
            </CardBody>
        </Card>
    )
}

Sidebar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object)
}
