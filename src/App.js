import React from 'react';

import './App.css';
import { deltaDate, getDateArray,getList } from './data/utility';
import Item from './components/item.component';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dates:[],
      data:new Map(),
      infoMap: new Map(),
      todaysDate:'',
      loading:true
    }
  
  }

  getInfo =  (date, newData)=>{
    let info =  [...newData.entries()].filter(entry=>
      entry[0].toString().substring(0,15)===date.toString().substring(0,15)
      )
   //console.log(info)
    return info;
  }


  updateInfoMap=  (newData)=>{
    let infoMap = new Map();
    let {dates}=  this.state;

    dates.map( date=>{
      let info =  this.getInfo(date,newData);
      infoMap.set(date,info||null)
      return date;
    })
    return infoMap;
  }

  updateTheDataList= async (start,end)=>{  
    let newData =await getList(start,end);
    let infoMap= this.updateInfoMap(newData)
    this.setState({
      data:newData,
      infoMap,
      loading:false
    });   
  }
  componentDidMount(){
      let todaysDate= new Date();
      let topDate= deltaDate(todaysDate,0,-1,0);
      let bottomDate=  deltaDate(todaysDate,0,2,0);
      let datesArray = getDateArray(topDate,bottomDate);

       this.updateTheDataList(topDate, bottomDate);
     // console.log(this.state.data)
      this.setState({
        todaysDate,
        dates:datesArray
      });

  }
  findDateInfo = async (date)=>{
    let {data} = this.state;
    if(data){
     let dateInfo =  await [...data.entries()].filter(entry=> (entry[0].toString().substring(0,15)===date.toString().substring(0,15)))
   // console.log(dateInfo)
    return dateInfo.length===1?dateInfo:null;
    }
    return null;
  }

  render(){
    const {loading, dates,data,todaysDate, infoMap}= this.state
  // console.log(infoMap)
    return (
      <div className='app'> 
      {loading?(
        <p>...loading</p>
      ):(
        <ul style={{listStyle:"none"}}>{
    
          dates.map((date,index)=>(
            
           <Item key={ date.toString()} todaysDate={todaysDate} date={date} itemData={infoMap.get(date)}/>
            ))}
        </ul>)}
      </div>
      );
    }
}
export default App;