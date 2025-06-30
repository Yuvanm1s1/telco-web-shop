export function setItem(key,value){
    try{
        window.localStorage.setItem(key,JSON.stringify(value))
    }catch(error){
        console.log(error)
    }
}
// converts a JavaScript object, array, or value into a JSON string
export function getItem(key){
    try{
        const item=window.localStorage.getItem(key);
        return item? JSON.parse(item):undefined;
    }catch(error){
        console.log(error)
    }
}