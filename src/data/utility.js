import getData from 'time-interval-lipsum';


export const getList = (currentTime)=>{
    console.log('hello');
    const start = new Date('2020-01-01T00:00:00');

    const end = currentTime;
    
    return getData(start, end);

   
}
export const getDateArray = (start, end) => {
    let arr = [];
    let dt = new Date(start);
    while (dt <= end) {
        arr.push((new Date(dt))); //save only the Day MMM DD YYYY part
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

export const deltaDate= (input,days, months, years)=>{
    return new Date(
        input.getFullYear()+ years,
        input.getMonth()+months,
        Math.min(input.getDate()+days,
        new Date( input.getFullYear()+ years,
        input.getMonth()+months+1,
        0).getDate()
        )
    )
}