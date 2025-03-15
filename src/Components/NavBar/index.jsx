import { useState, useContext} from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink ,Dropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap';
import { FaHome, FaUser } from 'react-icons/fa'; 
import { AuthContext } from './../../Context/AuthContext'





export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout,user } = useContext(AuthContext)

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleLogOut = ()=>{
    logout()
  }



  return (
    <div className=''>
      <Navbar color="light" light expand="md" className='rounded-xl shadow mt-4 mb-2'>
        <NavbarBrand className='flex flex-row text-sm md:text-lg items-center space-x-4' >
          <img src='https://www.femepashidi.com.mx/inicio/img/images/logo_fede.png' alt='LOGO FEMEPASHIDI' className='w-16' />

          <h1 className='text-dark'>Sistema de Gestion FEMEPASHIDI</h1>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
         
          <NavItem>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle tag="a" className="nav-link">
                <FaUser className='flex cursor-pointer'/>
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem className='hover:bg-slate-400'>{user.user.nombre}</DropdownItem>
                <DropdownItem onClick={handleLogOut} className='hover:bg-slate-400'>Salir</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          
        </Nav>
      </Navbar>
    </div>
  );
}