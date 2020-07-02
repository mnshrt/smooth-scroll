import React,{useRef, useEffect} from 'react';
import {ListItem} from './item.styles.js';


 
function Item({date, midDate, itemData, scrolled}){
    const myRef= useRef(null);
    useEffect(()=>{
        if(myRef.current){
        myRef.current.scrollIntoView({behavior:'smooth'});
        }
    })
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return (
        (midDate.toString().substring(0,15)===date.toString().substring(0,15))?(
        <ListItem ref={myRef}>
        
            <h4>
            {date.toLocaleDateString('en-US', options)}
            </h4>        
            
            <hr style={{
                   color:'grey',
                   beackground:'grey',
                   height:'1px'
               }}/>
            {itemData[0]?<p>{itemData[0][1]}</p>:null} 
       
        </ListItem>
):(<ListItem>
             <h4>
             {date.toLocaleDateString('en-US', options)}
             </h4>
             <hr style={{
                 color:'grey',
                 beackground:'grey',
                 height:'1px'
             }}/>
            {itemData[0]?<p>{itemData[0][1]}</p>:null}
        
       
     </ListItem>

        )
    )
}

export default Item;