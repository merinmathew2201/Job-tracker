
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import AddJob from './pages/AddJob'
import ViewJob from './pages/ViewJob'
import PageNotFound from './pages/PageNotFound'
import JobList from './pages/JobList'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/get-started' element={<GetStarted/>}/>
      <Route path='/add-job' element={<AddJob/>}/>
      <Route path='/jobs' element={<JobList/>}/>
      <Route path='/view-job/:id' element={<ViewJob/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
