import React from 'react';

import './App.css';
import { deltaDate, getDateArray } from './data/utility';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dates:[],
      todaysDate:''
    }
    this.myRef = React.createRef();
  }
  handleScrollToElement(event) {
    window.scrollTo({
      top:this.myRef.offsetTop, 
     behavior: "smooth" 
  }); 
  }
  componentDidMount(){
      let todaysDate= new Date();
      let topDate= deltaDate(todaysDate,0,-1,0);
      let bottomDate=  deltaDate(todaysDate,0,2,0);
      let data = getDateArray(topDate,bottomDate);
   
      this.setState({
        todaysDate,
        dates:data
      })
      if(this.myRef.current){
        this.handleScrollToElement();
      }
  }

  render(){
    const {dates, todaysDate}= this.state
    return (
      <div className='app'> 
        <ul style={{listStyle:"none"}}>{
          dates.map((date,index)=>(
          (todaysDate.toString().substring(0,15)===date.toString().substring(0,15))?(
          <li key={index} ref={this.myref}>  {">>>>>>>"+ date.toString()}</li>):(
             <li key={index}> {date.toString()}</li>
          )
            ))}
        </ul>
      </div>
      );
    }
}
export default App;