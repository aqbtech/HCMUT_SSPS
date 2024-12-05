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
import SPSO_home from './pages/SPSO_home.jsx';
import Printer_Manage from './pages/Printer_Manage.jsx';
import SPSO_history from './pages/SPSO_history.jsx';
import SPSO_report from './pages/SPSO_report.jsx';
import Student_Info from './pages/Student_Info.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (

      <div>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/spso/home' element={<SPSO_home/>}/>
            <Route path='/spso/manage' element={<Printer_Manage/>}/>
            <Route path='/spso/history' element={<SPSO_history/>}/>
            <Route path='/spso/report' element={<SPSO_report/>}/>
            <Route path='/student/home' element={<Student_home/>} />
            <Route path='/student/print' element={<Print/>} />
            <Route path='/student/info' element={<StudentInfo/>} />
            <Route path='/student/printer' element={<Printer/>} />
            <Route path='/student/info' element={<Student_Info/>} />
            <Route path='/student/myDoc' element={<MyDoc/>} />
            <Route path='/student/history' element={<History/>} />
            <Route path='/student/buy' element={<Buy/>} />
          </Routes>
      </div>
  )
}

export default App
