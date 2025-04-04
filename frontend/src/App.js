
import './App.css';
import { Navbar } from './Component/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Product from './Pages/Product';
import { Cart } from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Footer } from './Component/Footer/Footer.jsx'
import men_banner from './Component/Assets/banner_mens.png'
import women_banner from './Component/Assets/banner_women.png'
import kid_banner from './Component/Assets/banner_kids.png'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        
        <Routes>
          <Route path='/' element={<Shop></Shop>} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"></ShopCategory>} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women"></ShopCategory>} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"></ShopCategory>} />
          <Route path='/product' element={<Product></Product>} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='login' element={<LoginSignup></LoginSignup>}></Route>
          

        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
