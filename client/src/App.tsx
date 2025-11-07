import './App.css';
import SparkComponent from './components/SparkComponent';
import SplashScreen from './components/SplashScreen';
import { Routes, Route } from "react-router";

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
  )
}

export default App;
