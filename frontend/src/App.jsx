import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


import Home from './pages/Home';
import About from './pages/About';
import Speakers from './pages/Speakers';
import Programme from './pages/Programme';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LiveEvent from './pages/LiveEvent';
import NewsArticle from './pages/NewsArticle';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';


function App() {

  return (
   <BrowserRouter>
    <ScrollToTop />

     <Navbar />

   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/speakers' element={<Speakers />} />
    <Route path='/programme' element={<Programme />} />
    <Route path='/register' element={<Registration />} />
    <Route path='/live' element={<LiveEvent />} />
    <Route path='/news' element={<NewsArticle/>} />
    <Route path='/contact' element={<Contact />} />
   </Routes>

   <BackToTop />

   <Footer />
   </BrowserRouter>
  )
}

export default App
