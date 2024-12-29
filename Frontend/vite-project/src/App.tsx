import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import { Signup } from './Pages/Signup';
import { Blog } from './Pages/Blog';
import { Signin } from './Pages/Signin';
import { Blogs } from './Pages/Blogs';
import { Publish } from './Pages/Publish';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/publish" element={<Publish/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
