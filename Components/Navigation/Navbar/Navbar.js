import React from 'react';

import classes from './Navbar.module.css'
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'


const navbar =() =>(
    
 <header className={classes.Navbar}>
        <Logo/>
        <NavigationItems/>

</header>
    
   
)
export default navbar