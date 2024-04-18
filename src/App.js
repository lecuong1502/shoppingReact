import './App.css';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from "./screens/SignupScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostProductScreen from './screens/PostProductsScreen';
import BeginPage from './screens/BeginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/begin" element={<BeginPage />} />
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
