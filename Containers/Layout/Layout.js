import React, { Component } from 'react';
import Navigation from '../../Components/Navigation/Navbar/Navbar'
import Carousel from '../../Components/Carousel/Carousel'

class Layout extends Component{
    state={

    }

    render (){
        return (
            <div>
                <Navigation/>
                <Carousel/>
            </div>


        )
    }


}
 export default Layout;