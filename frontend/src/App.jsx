import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import SpotList from './components/SpotList';
import * as sessionActions from './store/session';


//LAYOUT()
function Layout() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);


  return (
    <>
    <header className='site-header'>
        <img
          src='https://lodgr.s3.us-east-2.amazonaws.com/lodgr.png'
          alt="Site Logo"
          className='site-logo'
          onClick={() => window.location.href = '/'}
        />
        <div>
    <Navigation isLoaded={isLoaded} />
    </div>
      </header>
      <main className='site-main'>
        {isLoaded && <Outlet />}
      </main>
    </>
  );
}


//CREATEBROWSERROUTER()
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
        <>
        <h1>Welcome!</h1>
        <SpotList />
        </>
        )
      }
    ]
  }
]);


//APP()
function App() {
  return <RouterProvider router={router} />;
}


export default App;