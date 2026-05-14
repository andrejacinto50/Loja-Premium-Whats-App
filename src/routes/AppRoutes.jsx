import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Catalog from '../pages/public/Catalog';
import ProductPage from '../pages/public/ProductPage';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import Banners from '../pages/admin/Banners';
import Settings from '../pages/admin/Settings';
import About from '../pages/public/about';
import Contact from '../pages/public/Contact';
import ProtectedRoute from '../components/admin/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/produto/:slug" element={<ProductPage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/sobre" element={<About />} />
     <Route path="/contato" element={<Contact />} />
<Route path="/admin/login" element={<Login />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/produtos"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/categorias"
  element={
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/banners"
  element={
    <ProtectedRoute>
      <Banners />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/configuracoes"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}
