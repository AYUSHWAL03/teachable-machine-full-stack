import "./styles.css"
// import { Link } from "react-router-dom";
export const ModelTest = () => {
  return (
    <div className="model">
      <div className="box" data-aos="fade-right" data-aos-duration="1500">
         {/* <Link to='/preprocessing'>  */}
         <h1 >Preprocessing</h1>
         <p >Clean Your Dataset</p>
         {/* </Link> */}
       
      </div>
      <div className="box" style={{"padding":"2rem 5rem"}} data-aos="fade-left" data-aos-duration="1500">
        <h1 >
            Train your Model
        </h1>
        <p >Discover Patterns, Trends and experiment with ML Algorithms</p>
      </div>
    </div>
  );
};
