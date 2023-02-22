import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

function Layout(props) {

    return(
        
        <div className={styles.container}>
            <Header />

            <div className={styles.pannel}>
                <div className={styles.sidebar}>
                    <Sidebar  />
                </div>
                <div className={styles.page}>
                   <Outlet/> 
                </div> 
            </div>
    
        </div>

    );
};

export default Layout;