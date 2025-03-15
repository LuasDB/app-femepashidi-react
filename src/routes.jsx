
import { FaUserFriends,FaChartLine,FaCreditCard,FaBook  } from 'react-icons/fa'
import { MdLiveTv } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineNotification } from 'react-icons/ai';
import { MdIceSkating,MdEmojiEvents } from "react-icons/md";
import { BsCardChecklist,BsClipboard2Data  } from "react-icons/bs";

import { FormUsers,FormaAssociations,FormEvents,FormCommunications,FormRegister,FormResults,FormExams,FormExamsEdit} from './Components/Forms'
import Patinadores from './Views/Patinadores';

import Asociaciones from './Views/Asociaciones'
import Gestion from './Views/Gestion';
import Patinador from './Views/Patinador';
import Eventos from './Views/Eventos';
import Comunicados from './Views/Comunicados'
import Inscripciones from './Views/Inscripciones'
import Inscripcion from './Views/Inscripcion'
import Transmision from './Views/Transmision';
import Resultados from './Views/Resultados';
import Galeria from './Views/Galeria';
import Examenes from './Views/Examenes';
import Examen from './Views/Examen';
import GenerateXml from './Components/GenerateXml';
import ExamUpdates from './Components/ExamUpdates'


const routes=[
    // {
    //     path: "XML",
    //     name: "Descarga",
    //     icon: <FiUsers  />,
    //     component: <GenerateXml />,
    //     type:'menu',
    //     users:'admin'
    // },
    // {
    //     path: "gestion",
    //     name: "Gestion",
    //     icon: <FiUsers  />,
    //     component: <Gestion />,
    //     type:'menu',
    //     users:'admin'
    // },
    {
        path: "examenes",
        name: "Examenes",
        icon: <MdIceSkating />,
        component: <Examenes />,
        type:'menu',
        users:'all'
    },
    {
        path: "patinadores",
        name: "Patinadores",
        icon: <MdIceSkating />,
        component: <Patinadores />,
        type:'menu',
        users:'all'
    },
    {
        path: "asociaciones",
        name: "Asociaciones",
        icon: <FaUserFriends />,
        component: <Asociaciones />,
        type:'menu',
        users:'all'
    },   
    {
        path: "eventos",
        name: "Eventos",
        icon: <MdEmojiEvents />,
        component: <Eventos />,
        type:'menu',
        users:'all'
    },
    {
        path: "comunicados",
        name: "Comunicados",
        icon: <AiOutlineNotification />,
        component: <Comunicados />,
        type:'menu',
        users:'all'
    },
    {
        path: "inscripciones",
        name: "Inscripciones",
        icon: <BsCardChecklist />,
        component: <Inscripciones />,
        type:'menu',
        users:'all'
    },
    {
        path: "transmision",
        name: "Conf. Transmision",
        icon: <MdLiveTv />,
        component: <Transmision />,
        type:'menu',
        users:'all'
    },
    {
        path: "resultados",
        name: "Resultados",
        icon: <BsClipboard2Data />,
        component: <Resultados />,
        type:'menu',
        users:'all'
    },
    {
        path: "galeria",
        name: "Galeria de Pagina",
        icon: <BsClipboard2Data />,
        component: <Galeria />,
        type:'menu',
        users:'all'
    },
    
   //FORMULARIOS

    {
    path: "forms/usuarios/:id",
    name: "Reportes",
    icon: <FaChartLine  />,
    component: <FormUsers />,
    type:'forms'
    },
    {
    path: "forms/asociaciones/:id",
    name: "Asociaciones",
    icon: <FaChartLine  />,
    component: <FormaAssociations />,
    type:'forms'
    },
    {
        path: "forms/eventos/:id",
        name: "Eventos",
        icon: <FaChartLine  />,
        component: <FormEvents />,
        type:'forms'
    },
    {
        path: "forms/comunicados/:id",
        name: "Eventos",
        icon: <FaChartLine  />,
        component: <FormCommunications/>,
        type:'forms'
    },
    {
        path: "forms/inscripcion/:id",
        name: "Eventos",
        icon: <FaChartLine  />,
        component: <FormRegister/>,
        type:'forms'
    },
    {
        path: "forms/resultados/:id",
        name: "Resultados",
        icon: <FaChartLine  />,
        component: <FormResults/>,
        type:'forms'
    },
    {
        path: "forms/examenes/:id",
        name: "Examenes ",
        icon: <FaChartLine  />,
        component: <FormExams />,
        type:'forms'
    },
    {
        path: "forms/examenes/:year/:id",
        name: "Examenes ",
        icon: <FaChartLine  />,
        component: <FormExamsEdit />,
        type:'forms'
    },
    
    //VIEWS
    {
        path: "view/patinadores/:id",
        name: "Patinador",
        icon: <FaChartLine  />,
        component: <Patinador />,
        type:'views'
    }, 
    {
        path: "view/inscripciones/:id",
        name: "Patinador",
        icon: <FaChartLine  />,
        component: <Inscripcion />,
        type:'views'
    },
    {
        path: "view/examen/:year/:id",
        name: "Examen",
        icon: <FaChartLine  />,
        component: <Examen />,
        type:'views'
    },
    //Streaming
    

]


export { routes }