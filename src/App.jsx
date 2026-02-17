import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FilterSidebar from './components/FilterSidebar'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductPage from './pages/ProductPage'
import Sell from './pages/Sell'
import About from './pages/About'
import Community from './pages/Community'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

function AppContent() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    sport: '',
    brand: '',
    category: '',
    minYear: '',
    maxYear: '',
    maxPrice: 3000,
    model: '',
    material: '',
    diameter: '',
    carbon: ''
  })

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    // Compatibility mapping for existing components using onNavigate
    if (page === 'home') navigate('/');
    else if (page === 'marketplace') navigate('/marketplace');
    else if (page === 'sell') navigate('/sell');
    else if (page === 'login') navigate('/login');
    else if (page === 'signup') navigate('/signup');
    else navigate(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <CartSidebar />

      <Navbar
        currentPage={location.pathname} // Simplified relative to Router
        onNavigate={handleNavigate}
        onToggleFilters={() => setIsSidebarOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/marketplace" element={<Marketplace filters={filters} searchTerm={searchTerm} onNavigate={handleNavigate} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chi-siamo" element={<About />} />
          <Route path="/login" element={<Login onSwitchToSignup={() => navigate('/signup')} />} />
          <Route path="/signup" element={<SignUp onSwitchToLogin={() => navigate('/login')} />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
