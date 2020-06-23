import getData from 'time-interval-lipsum';

function getList(currentTime){
    console.log('hello');
    const start = new Date('2020-01-01T00:00:00');

    const end = currentTime;
    
    return getData(start, end);

   
}
export default getList;