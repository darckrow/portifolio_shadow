import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png'

export default function _Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      color: '#fff',
      textDecoration: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ width: '70px', height: '50px' }}/>
      </div>
      
      <div style={{ marginLeft: 'auto' }}> 
        <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: '10px', padding: '10px' }}>

          <li>
          <Link to="/" style={{color: 'white',textDecoration: 'none'}}><Button variant="outlined" color="error" style={{color: 'white',textDecoration: 'none'}}>Home</Button></Link>
          </li>

          <li>
            <Link to="/about" style={{color: 'white',textDecoration: 'none'}}><Button variant="outlined" color="error" style={{color: 'white',textDecoration: 'none'}}>Sobre</Button></Link>
          </li>

          <li>
          <Link to="/projetos" style={{color: 'white',textDecoration: 'none'}}><Button variant="outlined" color="error"  style={{color: 'white',textDecoration: 'none'}}>Projetos</Button></Link>
          </li>

          <li>
          <Link to="/contatos" style={{color: 'white', textDecoration: 'none'}}><Button variant="outlined" color="error" style={{color: 'white',textDecoration: 'none'}}>Contatos</Button></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}