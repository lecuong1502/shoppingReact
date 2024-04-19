import './App.css';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from "./screens/SignupScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostProductScreen from './screens/PostProductsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/create-product" element={<PostProductScreen />} />
        <Route path="/products/:id" element={<ProductDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
