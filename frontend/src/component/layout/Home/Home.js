import React from 'react'
import MetaData from '../MetaData'
import AboutUs from './AboutUs/AboutUs'
import Comment from './Comment/Comment'
import Footer from './Footer/Footer'
import Gallery from './Gallery/Gallery'
import News from './News/News'
import Services from './Services/Services'
import Slide from './Slide/Slide'

const Home = () => {
  return (
    <>
    <MetaData title="Welcome to Tuoi Hoa! " />
    <Slide/>
    <AboutUs/>
    <Services/>
    <Comment/>
    <Gallery/>
    <News/>
    <Footer/>
    </>
  )
}

export default Home