import './App.css';
import SparkComponent from './components/SparkComponent';
import './App.css';

function App() {

  // const splatURL = '/splat_models/InteriorDesign.ply';
  const splatURL = '/splat_models/sutro.zip';

  return (
    <>
      <div className='pageBody'>
        <div className='splat' >
          <SparkComponent splatURL = {splatURL}/>
        </div>
      </div>
    </>
  )
}

export default App;
