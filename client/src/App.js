import Home from "./components/home";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import ProductForm from "./components/productForm";
import Products from "./components/products";
import Scan from "./components/scan";
import History from "./components/history";
import ScanReport from "./components/scanReport";
import NotFound from "./components/notFound";
import "./App.css";

// React is not a framework. It's a library that only responsible for rendering the view
// So to enable routing, we have to use another library called "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/product-form" element={<ProductForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/scan-report" element={<ScanReport />} />
          <Route path="/history" element={<History />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          {/* a fallback route when user navigates to URL not exist */}
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
