// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FileInput } from './components/fileInput'
import {Title} from './components/Title'
import{UploadDataset} from './components/UploadDataset'
import { ModelTest } from './components/ModelTest'
import { Preprocessing } from './components/Preprocessing'
import {Navbar} from './components/Navbar'
import { ToastContainer,Slide } from 'react-toastify';
import Footer from './components/Footer';
import { ModelTrain } from './components/ModelTrain'
import { useState,useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// function Layout() {
//   return (
//    <>
//     <Title/>
//     <UploadDataset/>
//     <ModelTest/>
//     <FileInput/>
//    </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Layout} />
//       </Switch>
//     </Router>
//   );
// }

function App() {
  useEffect(() => {
    AOS.init();
    
  }, [])
  const [options, setOptions] = useState([]);
  return (
    <>
    <Navbar/>
    <Title/>
  <UploadDataset/>
   <ModelTest/>
    <FileInput setOptions={setOptions}/>
    <Preprocessing />
    <ModelTrain options={options}/>
    <Footer/>
    <ToastContainer transition={Slide}/>
    </>
  );
}
export default App;



