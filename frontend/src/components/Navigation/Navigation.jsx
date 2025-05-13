import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    
    <ul className='nav-links'>

    {/*CREATE NEW SPOT LINK*/}
      {sessionUser && (
        <li>
          <NavLink to='/spots/new'>Create a New Spot</NavLink>
        </li>
      )}

    {/*PROFILE BUTTON*/}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;