import { useContext } from 'react'
import { Spinner } from 'reactstrap'
import { BrowserRouter as Router , Routes,Route,Navigate } from "react-router-dom"
import { AuthContext,AuthProvider } from "../Context/AuthContext"
import AdminLayout from "../Pages/AdminLayout"
import ExamenAdmin from "../Pages/ExamenAdmin"
import ExamenJueces from "../Pages/ExamenJueces"

import Login from "../Pages/Login"
import ResetPassword from '../Pages/RestablecerPassword'
import SolicitudPassword from '../Pages/SolicitudPassword'
import RegistroInscripcion from '../Pages/RegistroInscripcion'
import Streaming from '../Pages/Streaming'
import { routes } from './../routes'
import Resultados from '../Pages/Resultados'
import ResultadosPasados from '../Pages/ResultadosPasados'
import CartasPermiso from '../Pages/CartasPermiso'
import ExceltToXml from '../Components/ExcelToXml'
import RegistroPatinador from '../Pages/RegistroPatinador'
import Inscripcion from '../Pages/Inscripcion'
import FileUploader from '../Pages/FileUploader'






function App() {
  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      console.log(`${route.path}`)
        
        return (
        <Route path={`${route.path}`} element={route.component} key={index} exact />
    )})
}

  return (
    <AuthProvider >
      <Router basename='/'>
        <Routes>
          <Route path="/gestion" 
          element={
            <RequireAuth>
                <AdminLayout />
              </RequireAuth>} >
              {getRoutes(routes)}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/prueba" element={<ExceltToXml />} />
          <Route path="/register" element={<h2>HOLA MUNDO</h2>} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/sol-password" element={<SolicitudPassword />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/resultados-anteriores" element={<ResultadosPasados />} />
          <Route path="/examen-admin/:year/:id/" element={<ExamenAdmin />} />
          <Route path="/examen-judge/:year/:id/" element={<ExamenJueces />} />
          <Route path="/registro/" element={<RegistroPatinador />} />
          <Route path="/inscripcion/" element={<Inscripcion />} />
          <Route path="/uploadfiles/" element={<FileUploader />} />
          <Route path="/cartas-permiso/" element={<CartasPermiso />} />
        </Routes>
      </Router>
    </AuthProvider>
    
  )
}

const RequireAuth = ({ children }) => {

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <Spinner
        color="primary"
        style={{
          height: '10rem',
          width: '10rem'
        }}
      >
        Loading...
      </Spinner>
    </div>);
  }

  if (!user) {
    
    return <Navigate to="/login" />;
  }
  return children;
};


export default App
