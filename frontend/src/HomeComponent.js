import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Partners from "./Components/Partners";
import Features from "./Components/Features";
function HomeComponent() {
    return (
        <>
    <div className="app">
      <Header />
      <Hero />
      <Partners />
      <Features />
    </div>
        </>
    );
}

export default HomeComponent;
