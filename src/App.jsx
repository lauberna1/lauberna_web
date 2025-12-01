import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Profile from "./sections/Profile";
import Welcome from "./sections/Welcome";

const App = () => (
  <div className="app">
    <Nav />
    <Welcome />
    <Profile />
    <Footer />
  </div>
);

export default App;
