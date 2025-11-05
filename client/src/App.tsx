import './App.css';
import SparkComponent from './components/SparkComponent';

function App() {

  const splatURL = '/models/InteriorDesign.ply';

  return (
    <>
      <SparkComponent splatURL = {splatURL}/>
    </>
  )
}

export default App;
