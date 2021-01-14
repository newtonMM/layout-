import React from 'react';
import classes from './NavigationItems.module.css'
const navigationItems=()=>(
    <ul className={classes.NavigationItems}> 
       <li className={classes.Home}><a href="">Home</a></li>
       <li className={classes.WWR}><a href="">Who we are </a></li>
       <li className={classes.Gallery}><a href="">Gallery</a></li>
       <li className={classes.Testimonials}><a href="">Testimonials</a></li>
       <li className={classes.Partners}><a href="">Partners</a></li>
       <li className={classes.Contacts}><a href="">Contacts</a></li>
       <li className={classes.Login}><a href="">Login</a></li>
       
    </ul>
);
 export default navigationItems;
 
  