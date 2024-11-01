import { useNavigate } from 'react-router-dom';
import './comp.css';

const Header = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
      <div className='headerContainer'>
        <div className='titleContainer'>
          <h1>Budget Tracking App</h1>
        </div>
        <div className='buttonContainer'>
          <button onClick={goToLoginPage} className='loginButton'>Login</button>
        </div>
      </div>
    </>
  );
}

export default Header;
