import Header from "./Header";
import './comp.css';

const HomePage = () => {
  return (
    <>
      <div className="imageContainer">
        <Header />
        <div className="titleContainer">
          <h1>Welcome to</h1>
          <h2>Budget Tracking App</h2>
        </div>
        <img 
          src="https://images.pexels.com/photos/5466798/pexels-photo-5466798.jpeg" 
          alt="bg-image" 
          className="backgroundImage"
        />
      </div>
    </>
  );
}

export default HomePage;
