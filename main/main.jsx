import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header.jsx';
import Data from './Data.jsx';
import PostsBlog from './PostsBlog.jsx';
import Footer from './Footer.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Data />
    <PostsBlog />
    <Footer />
  </React.StrictMode>,
)