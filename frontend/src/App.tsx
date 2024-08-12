
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Flashcards } from './pages/flashcards';
import { Admin } from './pages/admin';
 
import './App.css'
import { Topics } from './pages/topics';
import { Userside } from './pages/user';
import { Home } from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      
        <Route path='/admin'element={<Admin />} />
        <Route path='/admin/:topic'element={<Topics />} />
        <Route path='/user'element={<Userside />} />
        <Route path='/user/:topic'element={<Flashcards />} />
        <Route path='/'element={<Home />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
