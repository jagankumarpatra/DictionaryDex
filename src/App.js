import React from 'react';
import './App.css';
import Login from './pages/signin/signin';
import Signup from './pages/signup/signup'
import HomePage from './component/home'
import { SearchProvider } from './searchContext';
import Bookmarks from './component/bookmark';
import AllRoutes from './AllRouter';


function App(){
  return(
    <div>
   
    <AllRoutes />
  
    
    
       {/* <HomePage/> */}
      {/* <Bookmarks/> */}
      {/* <Login/>  */}
      {/* <Signup/> */}
    </div>
  );
}

export default App;