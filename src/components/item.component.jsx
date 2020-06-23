import React from 'react';
import {ListItem} from './item.styles.js';

function Item({itemData:[date, info]}){
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <ListItem>
            <h4>
            {date.toLocaleDateString('en-US', options)}
            </h4>

            <hr style={{
                color:'grey',
                beackground:'grey',
                height:'1px'
            }}/>

            {info?<p>{info.toString()}</p>:null}
        </ListItem>
    )
}

export default Item;