import React,{useState} from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css"
import { BsFillSendArrowUpFill } from "react-icons/bs";


export const FileInput = ({setOptions}) => {
  const [csvFile, setCsvFile] = useState(null);
  const [modelTrainfile, setmodelTrainfile] = useState(null);
  const [active,setActive] = useState('');
  
  const handleCsvFileAdded = (e)=>{
    const file = e.target.files[0];
    setCsvFile(file);
    setmodelTrainfile(file);
    // toast.success("File Uploaded Successfully");
    console.log(file);
  }
  const uploadData = async(e) =>{
    if(!csvFile){
      toast.info("Please select a file");
    }
    const formData = new FormData();
    formData.append("csvfile", csvFile);
    formData.append("modelTrainfile", modelTrainfile);

    console.log(csvFile);
    e.preventDefault();
    setActive(current=>!current)
    try{
        await axios.post("http://127.0.0.1:5000/upload-data",formData).then((res)=>{
          console.log(res.data.Response)
          toast.success(res.data.Response);
        })
    }catch(e){
        console.log(e)
    }
    try{
        await axios.post("http://127.0.0.1:5000/modelTrain/upload-data",formData).then((res)=>{
          console.log(res.data.Response);
          axios.get("http://127.0.0.1:5000/modelTrain/get-cols-data").then((res)=>{
            console.log(res.data.response);
            setOptions(res.data.response)
          })
          toast.success(res.data.Response);
        })
    }catch(e){
        console.log(e)
    }

  }
  return (
    <>
      <div className="main" id="preprocessData" style={{ fontFamily: "Nunito"}}>
        <div className="data">
          <h1 data-aos="fade-down" data-aos-duration="1500" style={{ margin: 20,borderBottom:"2px black solid"}}>Start Analyzing </h1>
          <p>
            <h2 data-aos="fade-down" data-aos-duration="1500" >
              Dive deeper into the world of ocean data and unlock the mysteries
              of the deep blue.Begin your data analysis journey with us today!
            </h2>
          </p>
          <div className="file-input-container" style={{ position: 'relative', marginTop: '20px',display:'flex' }}>
            <input
              className="chooseFile"
              type="file"
              name="csvfile"
              accept=".csv"
              onChange={handleCsvFileAdded}
              style={{ position: 'absolute', top: 0, left: 0, opacity: 0 ,height: '3rem', width: '11.3rem'}}
            />
            <label htmlFor="chooseFile" className="upload-button" style={{ padding: 10}}>
              Upload Dataset
            </label><br />      
            <button data-aos="fade-down" data-aos-duration="1500"  onClick={uploadData} className="submit-btn"><BsFillSendArrowUpFill /></button>
            {/* <ToastContainer /> */}
          </div>
        </div>
      </div>
    </>
  );
};
