import './App.css';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from "./screens/SignupScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostProductScreen from './screens/PostProductsScreen';
import HistoryOrdering from './screens/HistoryOrdering';
import OrderList from './screens/OrderList';

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
        <Route path="/history" element={<HistoryOrdering />} />
        <Route path="/history-order" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
