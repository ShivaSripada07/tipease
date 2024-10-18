import Hero from "./Components/Hero";
import Partners from "./Components/Partners";
import Features from "./Components/Features";
import Business from "./Components/Business";
import Footer from "./Components/Footer";
function HomeComponent() {
    return (
        <>
    <div className="app">
      <Hero />
      <Partners />
      <Features />
      <Business/>
      <Footer/>
    </div>
        </>
    );
}

export default HomeComponent;
