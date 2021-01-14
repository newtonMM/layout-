import React from 'react';
import classes from './Carousel.module.css'
import Image_1 from '../../Assets/images/animation 1.png'
import prev_btn from '../../Assets/images/prev_btn.png'
import next_btn from '../../Assets/images/next_btn.png'



const carousel =()=>(
    <div className={classes.Content}>
        <div >
           <img className={ classes.Image_1} src={Image_1}/>
        </div>
        <div className={classes.Text}>
        <p> your blood could <b> help Patients Currently fighting Cancer</b></p>
         </div> 
         <div className={classes.Prev_icon} >
             <img src={prev_btn}/>
         </div>
         <div className={classes.Next_icon}>
             <img src={next_btn}/>
         </div>
    </div>
    

)

export default carousel;