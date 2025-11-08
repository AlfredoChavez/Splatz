import './App.css';
import SparkComponent from './components/SparkComponent';
import SplashScreen from './components/SplashScreen';
import { Routes, Route } from 'react-router';

//? When navigating to a new route, you can see all the new components getting mounted for a split second. How can we avoid this?
function App() {

  return (
    <>
      <div className='pageBody'>
        <Routes>
          <Route path="/" element={
            <SplashScreen/>
          } />
          <Route path="/viewer" element={
            <SparkComponent/>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
