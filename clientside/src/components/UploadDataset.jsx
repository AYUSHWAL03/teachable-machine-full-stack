import "./styles.css";

export const UploadDataset = () => {
  return (
    <div className="container">
      <div className="row" id="about">
        <div className="image-container" data-aos="fade-up" data-aos-duration="1000">
          <img src="/images/datasetimg.png" alt="Image" />
        </div>
        <div className="data-container">
          <h2 data-aos="fade-left" data-aos-duration="1500">Upload Your Dataset</h2>
          <p style={{ margin: "20px 0" }} data-aos="fade-left" data-aos-duration="2000">
            Unearth the valuable insights from your ocean datasets, and
            kickstart your research into understanding the ocean's secrets!
          </p>
        </div>
      </div>
      <div className="row" id="uploadData">
      <div className="data-container" style={{ padding: "0 100px"}}>
          <h2 data-aos="fade-right" data-aos-duration="1500">Get Customised Analytics and Visualizations</h2>
          <p style={{ margin: "20px 0" }} data-aos="fade-right" data-aos-duration="2000">
            Our platform offers tailored visualizations and data analysis technique to simpify your data and reveal the stories hidden within.
          </p>
        </div>
        <div className="image-container" data-aos="fade-up" data-aos-duration="1000">
          <img  className="secondimg" src="/images/data-visualization-scaled.jpg" alt="Image" />
        </div>
      </div>
    </div>
  );
};
