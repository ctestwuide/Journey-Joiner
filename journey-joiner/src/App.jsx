import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Layout from "../src/components/Layout"
import Home from "../src/pages/Home"
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login"
import Travel from "../src/pages/Travel"
import Profile from "../src/pages/Profile"
import Discover from "../src/pages/Discover"
import Matches from "../src/pages/Matches"



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="travel" element={<Travel />} />
    <Route path="profile/:email" element={<Profile />} />
    <Route path="discover" element={<Discover />} />
    <Route path="matches" element={<Matches />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App