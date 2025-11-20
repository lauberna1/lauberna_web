import Welcome from "./sections/Welcome";
import Profile from "./sections/Profile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// Orquesta todas las secciones principales de la landing.
function App() {
  return (
    <div className="app">
      <Nav />
      <Welcome />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
