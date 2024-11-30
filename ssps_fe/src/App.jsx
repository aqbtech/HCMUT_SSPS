import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from './component/footer'
import Home from './pages/Home.jsx';
import Student_home from './pages/Student_home.jsx';
import Buy from './pages/Buy.jsx';
import History from './pages/History.jsx';
import MyDoc from './pages/MyDoc.jsx';
import Printer from './pages/Printer.jsx';
import Print from './pages/Print.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/student/home' element={<Student_home/>} />
            <Route path='/student/home' element={<Student_home/>} />
            <Route path='/student/print' element={<Print/>} />
            <Route path='/student/printer' element={<Printer/>} />
            <Route path='/student/myDoc' element={<MyDoc/>} />
            <Route path='/student/history' element={<History/>} />
            <Route path='/student/buy' element={<Buy/>} />
          </Routes>
          <Footer></Footer>
      </div>
  )
}

export default App
