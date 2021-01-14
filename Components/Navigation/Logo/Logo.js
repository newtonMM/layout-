import React from 'react';
 import headerLogo from '../../../Assets/images/full_logo.png'
import classes from './Logo.module.css'

 const logo= (props)=>(
     <div className={classes.Logo} >
         <img src={headerLogo} alt="logo"/>

     </div>
 )
 export default logo
