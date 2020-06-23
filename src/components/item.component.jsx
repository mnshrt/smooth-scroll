import React from 'react';
import './item.styles.css';
function Item({itemData:[date, info]}){
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <li>
            <h5>
            {date.toLocaleDateString('en-US', options)}
            </h5>

            <hr style={{
                color:'grey',
                beackground:'grey',
                height:'1px'
            }}/>

            {info?<p>{info.toString()}</p>:null}
        </li>
    )
}

export default Item;