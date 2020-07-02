import React,{useRef, useEffect} from 'react';
import {ListItem} from './item.styles.js';


 
function Item({date,todaysDate,itemData}){
    const myRef= useRef(null);
    useEffect(()=>{
        if(myRef.current){
        myRef.current.scrollIntoView({behavior:'smooth'});
        }
    })
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    console.log(itemData[0]||null)
    return (
        (todaysDate.toString().substring(0,15)===date.toString().substring(0,15))?(
        <div ref={myRef}>

            <h4>
            {"today>>>>>"+ date.toLocaleDateString('en-US', options)}
            </h4>        
        {itemData[0]?<p>{itemData[0][1]}</p>:null} 
            <hr style={{
                   color:'grey',
                   beackground:'grey',
                   height:'1px'
               }}/>
            
        </div>):(
             <div>

             <h4>
             {date.toLocaleDateString('en-US', options)}
             </h4>
 
            <br/>
            {itemData[0]?<p>{itemData[0][1]}</p>:null}
            <hr style={{
                 color:'grey',
                 beackground:'grey',
                 height:'1px'
             }}/>
         </div>
        )
    )
}

export default Item;