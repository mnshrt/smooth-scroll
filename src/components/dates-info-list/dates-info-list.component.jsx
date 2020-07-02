import React from 'react';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import './dates-info-list.styles.css';
import { deltaDate, getDateArray,getList } from '../../data/utility';
import Item from '../item/item.component';


class DatesInfoList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dates:[],
      infoMap: new Map(),
      midDate:'',
      loading:true,
      topDate:'',
      bottomDate:''
    }
  
  }
//generic
  getInfo =  (date, newData)=>{
    let info =  [...newData.entries()].filter(entry=>
      entry[0].toString().substring(0,15)===date.toString().substring(0,15)
      )
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

  updateTheDataList= async (start,end,flag)=>{  
    let newData =await getList(start,end);
    let infoMap= this.updateInfoMap(newData)
    flag==="top"?(
      this.setState(prevState=>({
      infoMap:new Map([...infoMap,...prevState.infoMap]),
      loading:false
    }))): (
      this.setState(prevState=>({
        infoMap:new Map([...prevState.infoMap,...infoMap]),
        loading:false
      }))
    )  
  }
  componentDidMount(){
      let midDate= new Date();
      let topDate= deltaDate(midDate,0,-1,0);
      let bottomDate=  deltaDate(midDate,0,1,0);
      let dates = getDateArray(topDate,bottomDate);

      this.updateTheDataList(topDate, bottomDate,"top");

      this.setState({
        midDate,
        topDate,
        bottomDate,
        dates:[...dates]
      });

  }

// scrolling up and down events
handleScrollUp = () => {
 let {topDate}=  this.state;
 let start= deltaDate(topDate,0,-2,0);
 let midDate= deltaDate(start,2,0,0);
 let end= deltaDate(topDate,-1,0,0);
 let dates = getDateArray(start,end);
 this.updateTheDataList(start, end,"top");

 this.setState(prevState=>({
   topDate:start,
   dates:[...dates,...prevState.dates],
   loading:true,
   midDate
 }));
}
handleScrollDown = () => {
  let {bottomDate}=  this.state;
  let start= deltaDate(bottomDate,1,0,0);
  let end= deltaDate(bottomDate,0,2,0);
  let midDate= deltaDate(end,-5,0,0);
 
  let dates = getDateArray(start,end);
  this.updateTheDataList(start, end,"bottom");
 
  this.setState(prevState=>({
    bottomDate:end,
    dates:[...prevState.dates,...dates],
    loading:true,
    midDate
  }));
 }

  render(){
    const {loading, dates, midDate, infoMap, scrolled}= this.state;
  // console.log(infoMap)
    return (
      <div
      style={{
        height: '100vh',
        width: '100vw',
        WebkitOverflowScrolling: 'touch'
      }}>
      <InfiniteScroll
        onReachBottom={this.handleScrollDown}
        onReachTop={this.handleScrollUp}
        onScroll={this.handleOnScroll}
        position={50}>
             {loading?(
               <p>...loading</p>
             ):(
               <ul style={{listStyle:"none"}}>{
           
                 dates.map((date,index)=>(
                   
                  <Item key={ date.toString()} midDate={midDate} scrolled={scrolled} date={date} itemData={infoMap.get(date)}/>
                   ))}
               </ul>)}
        </InfiniteScroll>
      </div>
      );
    }
}
export default DatesInfoList;