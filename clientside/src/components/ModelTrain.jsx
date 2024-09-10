import React,{useState} from 'react';
import axios from 'axios';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoTrashBinOutline } from "react-icons/io5";
import { ReportModal } from './ReportModal'; 
export function ModelTrain({options}) {
    const [selectedOption, setSelectedOption] = useState('');
    const [model_choice,setmodel_choice] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [reportContent, setReportContent] = useState('');
    console.log(reportContent);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const handleModelRadioChange = (e) => {
        setmodel_choice(e.target.value);
    };
    
    const clearSelectedModel =()=>{
    setmodel_choice("");
    toast.success("Cleared selected model",{className:"alertEncoder"})
    // console.log(selectedImputer);
    }
    const applySelectedModel = async()=>{
        try{
            toast.info("Model training started")
            if(model_choice=="mlpClassifier"){
                await axios.get("http://127.0.0.1:5000/modelTrain/mlp-classification/train").then((res)=>{
                    console.log(res.data);
                    setReportContent(res.data.response);
                    toast.success("Model training completed");
                    if (res.data.response.startsWith("Error")) {
                        toast.error(res.data.response);
                        console.log("Error occurred:", res.data.response);
                    }
                    
                })
            }
            if(model_choice=="mlpRegressor"){
                await axios.get("http://127.0.0.1:5000/modelTrain/mlp-regression/train").then((res)=>{
                    console.log(res.data);
                    setReportContent(res.data.response);
                    toast.success("Model training completed");
                    if (res.data.response.startsWith("Error")) {
                        toast.error(res.data.response);
                        console.log("Error occurred:", res.data.response);
                    }
                    
                })
            }
        }catch(e){

        }
    }
    const setTargetOption = async() =>{
        try{
            const formData = new FormData();
            formData.append("TargetCols", selectedOption);
            await axios.post("http://127.0.0.1:5000/modelTrain/getTargetColumn",formData).then((res)=>{
                console.log(res.data.TargetCols);
                toast.success("Set selected target column")
            })
        }catch(e){
            console.log(e);
        };
    }

    return (
        <div className='preprocess-component' id='trainModelData'>
            <h1 className="heading-1"><div data-aos="fade-down" data-aos-duration="1500">Train your Data</div></h1>
            <div className='modeltrain-component'>
            <div className='select-option-comp'>
                <p data-aos="fade-down" data-aos-duration="1000">Select target column: </p>
                <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} data-aos="fade-down" data-aos-duration="1500">
                    <option value="" disabled>Select an option</option>
                    {options.map((option) => (
                        <option key={option.id} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
                <button className='set-btn' onClick={setTargetOption} data-aos="fade-down" data-aos-duration="1500">SET</button>
            </div>
                <div className="category box2" data-aos="fade-down" data-aos-duration="1500" style={{height:"max-content", padding:"1rem",margin:"0px",position:"relative",left:"40%",top:"2rem"}}>
                    <h2 className="heading">Models</h2>
                    <div className="checkbox-label">
                    <input
                        type="radio"
                        name="model_choice"
                        value="mlpClassifier"
                        id="model_choice1"
                        checked={model_choice === 'mlpClassifier'}
                        onChange={handleModelRadioChange}
                    />
                    <label htmlFor="model_choice1">MLP classifier</label>
                    </div>
                    <div className="clear-btn" onClick={clearSelectedModel}>
                        <IoTrashBinOutline />
                    </div>
                    <div className="checkbox-label">
                    <input
                        type="radio"
                        name="model_choice"
                        value="mlpRegressor"
                        id="model_choice2"
                        checked={model_choice === 'mlpRegressor'}
                        onChange={handleModelRadioChange}
                    />
                    <label htmlFor="model_choice2">MLP Regression</label>
                    </div>
                <div className="apply-btn">
                    <button onClick={applySelectedModel}>Apply</button>
                </div>
                </div>
            </div>
            <div style={{ backgroundColor:'#89cff3', height:'3rem',paddingTop:"2rem", paddingLeft:'47%',display: "flex", flex: "1 1 0%",paddingBottom:"3rem"}}>
                <button className="upload-button" onClick={openModal}>Generate report</button>
                {modalOpen && <ReportModal onClose={closeModal} reportContent={reportContent} modelSelected={model_choice} className="modalCss"/>}
            </div>
        </div>
    );
}

