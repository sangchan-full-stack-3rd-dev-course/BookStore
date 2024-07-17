import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <Header/>
            <main>{children}</main>
        <Footer/>
    </>
  )
}

export default Layout