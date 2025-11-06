import './App.css';
import SparkComponent from './components/SparkComponent';
import SplashScreen from './components/SplashScreen';
import { Routes, Route } from "react-router";

function App() {

  // const splatURL = '/splat_models/InteriorDesign.ply';
  const splatURL = '/splat_models/sutro.zip';

  return (
    <>
      <div className='pageBody'>
        <Routes>
          <Route path="/" element={
            <SplashScreen/>
          } />
          <Route path="/viewer" element={
            <SparkComponent splatURL = {splatURL}/>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App;
