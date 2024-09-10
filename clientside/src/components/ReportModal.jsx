import React,{useState} from 'react';
import "./Styles.css";
export const ReportModal = ({ onClose, reportContent,modelSelected }) => {
    return (
        <div className="modalCss">
            <div className="modal-content">
                <span className="closeContent" onClick={onClose}>&times;</span>
                <h1>Report of {modelSelected}</h1>
                {reportContent? (
                    <div>
                        <h3>Accuracy :{reportContent.Accuracy}</h3>
                        <h3>Input Layers :{reportContent.Input_Layers}</h3>
                        <h3>Ouput Layers :{reportContent.Output_Layers}</h3>
                        <h3>hidden Layers :{reportContent.hidden_layer}</h3>
                    </div>
                ) : (
                    <div>
                        <h1>No Report Content Found</h1>
                        {/* {console.log(reportContent)} */}
                    </div>
                )}
            </div>
        </div>
    );
}
