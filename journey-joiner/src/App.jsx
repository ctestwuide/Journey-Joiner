import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Layout from "../src/components/Layout"
import Home from "../src/pages/Home"
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login"


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App