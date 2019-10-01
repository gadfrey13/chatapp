import React from 'react';
import './Scroll.css';
const Scroll = (props) => {
   return(
       <div className='scroll' id='style-2' >
           {props.children}
       </div>
   )
}

export default Scroll;