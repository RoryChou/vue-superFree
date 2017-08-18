export function storage (itemName,moveType='get',obj){
  if(moveType === 'get'){
    return JSON.parse(localStorage.getItem(itemName))
  }else {
    localStorage.setItem(itemName,JSON.stringify(obj))
  }
}
