import "./styles.css";
import { IoTrashBinOutline } from "react-icons/io5";
import React,{useState} from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Modal from './Modal';
import DownloadLink from 'react-download-link'

export const Preprocessing = () => {
  const [selectedEncoder, setSelectedEncoder] = useState("");
  const [selectedImputer, setSelectedImputer] = useState("");
  const [selectedVisualizer, setSelectedVisualizer] = useState("");
  const [htmlContent, sethtmlContent] = useState(''); 
  const [modalOpen, setModalOpen] = useState(false);
  // const fileUrl = "http://localhost:5000/output/transform.csv"
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const downloadCsvFile = (fileUrl) => {
    const fileName = fileUrl.split("//output/transform.csv").pop();
    const aTag = document.createElement("a");
    aTag.href = fileUrl
    aTag.download = fileName;
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  
  const handleEncoderRadioChange = (e)=>{
    setSelectedEncoder(e.target.value);
    console.log(e.target.value);
  }
  const clearSelectedEncoder =()=>{
    setSelectedEncoder("");
    toast.success("Cleared selected encoder",{className:"alertEncoder"})
    console.log(selectedEncoder);
  }
  const handleVisualizerRadioChange = (e)=>{
    setSelectedVisualizer(e.target.value);
    console.log(e.target.value);
  }
  const clearSelectedVisualizer =()=>{
    setSelectedVisualizer("");
    toast.success("Cleared selected visualizer",{className:"alertEncoder"})
    console.log(selectedEncoder);
  }
  const handleImputerRadioChange = (e)=>{
    setSelectedImputer(e.target.value);
    console.log(e.target.value);
  }
  const clearSelectedImputer =()=>{
    setSelectedImputer("");
    toast.success("Cleared selected imputer",{className:"alertEncoder"})
    console.log(selectedImputer);
  }

  const applySelectedEncoder = async(e) =>{
    console.log(selectedEncoder);
    e.preventDefault();
    try {
      if (selectedEncoder === "label"){
        await axios.get("http://127.0.0.1:5000/transform-label-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected encoder")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
      if (selectedEncoder === "onehot"){
        await axios.get("http://127.0.0.1:5000/transform-onehot-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected encoder")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
      if (selectedEncoder === "binary"){
        await axios.get("http://127.0.0.1:5000/transform-binary-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected encoder")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const applySelectedVisualizer = async(e)=>{
    console.log(selectedVisualizer)
    e.preventDefault();
    try{
      if(selectedVisualizer === "insight-data"){
        await axios.get("http://127.0.0.1:5000/insight-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Visualize now !!!")
            }
        })
      }
      if(selectedVisualizer === "describe-data"){
        await axios.get("http://127.0.0.1:5000/describe-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Visualize now !!!")
            }
        })
      }
      if(selectedVisualizer === "null-data"){
        await axios.get("http://127.0.0.1:5000/null-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Visualize now !!!")
            }
        })
      }
    }catch(err){
      console.log(err);
    }
  }

  const applySelectedImputer = async(e) =>{
    console.log(selectedImputer);
    e.preventDefault();
    try {
      if (selectedImputer === "mean"){
        await axios.get("http://127.0.0.1:5000/impute-mean-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected imputer")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
      if (selectedImputer === "median"){
        await axios.get("http://127.0.0.1:5000/impute-median-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected imputer")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
      if (selectedImputer === "most_freq"){
        await axios.get("http://127.0.0.1:5000/impute-mostfreq-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected imputer")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
      if (selectedImputer === "nullValue"){
        await axios.get("http://127.0.0.1:5000/remove-null-data").then((res)=>{
          console.log(res.data.response);
          if (res.data.response.startsWith("Error")) {
            toast.error(res.data.response);
            console.log("Error occurred:", res.data.response);
            } else {
                sethtmlContent(res.data.response);
                toast.success("Applied selected condition")
            }
        }).catch((err)=>{
          console.log(err);
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="preprocess-component" id="preprocessData">
      <h1 className="heading-1">
        <div data-aos="fade-down" data-aos-duration="2000">Preprocess your Data</div></h1>

      <div className="category-container">
        <div className="category box2" data-aos="fade-down" data-aos-duration="2000" style={{ marginLeft: "2rem" }}>
          <h2 style={{ paddingTop: "1.5rem" }}>
            Encoder
          </h2>
          <div className="checkbox-label">
                    <input
                        type="radio"
                        name="encoder_choice"
                        value="onehot"
                        id="encoder-1"
                        checked={selectedEncoder === 'onehot'}
                        onChange={handleEncoderRadioChange}
                    />
                    <label htmlFor="encoder-1">One Hot Encoder</label>
                </div>
                <div className="checkbox-label">
                    <input
                        type="radio"
                        name="encoder_choice"
                        value="binary"
                        id="encoder-2"
                        checked={selectedEncoder === 'binary'}
                        onChange={handleEncoderRadioChange}
                    />
                    <label htmlFor="encoder-2">Binary Encoder</label>
                </div>
                <div className="checkbox-label">
                    <input
                        type="radio"
                        name="encoder_choice"
                        value="label"
                        id="encoder-3"
                        checked={selectedEncoder === 'label'}
                        onChange={handleEncoderRadioChange}
                    />
                    <label htmlFor="encoder-3">Label Encoder</label>
                </div>
          <div className="clear-btn" onClick={clearSelectedEncoder}>
            <IoTrashBinOutline />
            
          </div>
          <div className="apply-btn">
            <button onClick={applySelectedEncoder} >Apply</button>
          </div>
        </div>

        <div data-aos="fade-down" data-aos-duration="2000" className="category box2">
          <h2 className="heading" style={{ paddingTop: "1.5rem" }}>
            Imputers
          </h2>
          <div className="checkbox-label">
            <input
              type="radio"
              name="imputer_choice"
              value="mean"
              id="imputer-1"
              checked={selectedImputer==="mean"}
              onChange={handleImputerRadioChange}
            />
            <label htmlFor="imputer-1">Mean</label>
          </div>
          <div className="checkbox-label">
            <input
              type="radio"
              name="imputer_choice"
              value="median"
              id="imputer-2"
              checked={selectedImputer==="median"}
              onChange={handleImputerRadioChange}
            />
            <label htmlFor="imputer-2">Median</label>
          </div>
          <div className="checkbox-label">
            <input
              type="radio"
              name="imputer_choice"
              value="most_freq"
              id="imputer-3"
              checked={selectedImputer==="most_freq"}
              onChange={handleImputerRadioChange}
            />
            <label htmlFor="imputer-3">Most Frequent</label>
          </div>
          <div className="checkbox-label">
            <input
              type="radio"
              name="imputer_choice"
              value="nullValue"
              id="imputer-4"
              checked={selectedImputer==="nullValue"}
              onChange={handleImputerRadioChange}
            />
            <label htmlFor="imputer-4">remove null</label>
          </div>
          <div className="clear-btn" onClick={clearSelectedImputer}>
            <IoTrashBinOutline />  
          </div>
          <div className="apply-btn">
            <button onClick={applySelectedImputer} >Apply</button>
          </div>
        </div>

        <div data-aos="fade-down" data-aos-duration="2000" className="category box2" style={{ marginRight: "1.5rem" }}>
          <h2 className="heading" style={{ paddingTop: "3rem" }}>
            Data Insight Visualize
          </h2>
          <div className="checkbox-label">
            <input
              type="radio"
              name="visualize_choice"
              value="insight-data"
              id="visualize-1"
              checked={selectedVisualizer==="insight-data"}
              onChange={handleVisualizerRadioChange}
            />
            <label htmlFor="visualize-1">Data sneek-peek</label>
          </div>
          <div className="checkbox-label">
            <input
              type="radio"
              name="visualize_choice"
              value="describe-data"
              id="visualize-2"
              checked={selectedVisualizer==="describe-data"}
              onChange={handleVisualizerRadioChange}
            />
            <label htmlFor="visualize-2">Describe Data</label>
          </div>
          
          <div className="checkbox-label">
            <input
              type="radio"
              name="visualize_choice"
              value="null-data"
              id="visualize-3"
              checked={selectedVisualizer==="null-data"}
              onChange={handleVisualizerRadioChange}
            />
            <label htmlFor="visualize-3">Null Data</label>
          </div>
          
          <div className="clear-btn" onClick={clearSelectedVisualizer}>
            <IoTrashBinOutline />
          </div>
          <div className="apply-btn">
            <button onClick={applySelectedVisualizer} >Apply</button>
          </div>
        </div>
      </div>
      <div style={{display:"flex", flex:1}}>
      <div style={{ backgroundColor:'#89cff3', height:'3rem', display:"flex", flex:1, paddingLeft:'30rem',paddingBottom:"3rem"}} >
        {/* <button className="upload-button"> 
            <a href="../../../output/transform.csv" download="transform.csv">Download</a>
        </button> */}
        
         <DownloadLink
          data-aos="fade-up" data-aos-duration="1500"
          className="upload-button"
          label="Download CSV File"
          filename="transform.csv"
          exportFile={() => fetch("/output/transform.csv").then(response =>{ response.blob(); console.log(response)})}
          style={{textDecoration: "none",padding:"11px",color:"black"}}
        />
      </div>
      <div style={{ backgroundColor:'#89cff3', height:'3rem', paddingRight:'30rem',display: "flex", flex: "1 1 0%",paddingBottom:"3rem"}} >
        <button className="upload-button" onClick={openModal}>Visualize Dataset</button>
        {modalOpen && <Modal onClose={closeModal} htmlContent={htmlContent} className="modalCss"/>}
      </div>
      </div>
      
    </div>
  );
};
