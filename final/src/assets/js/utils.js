//操作localStorage
export function storage (itemName,moveType='get',obj){
  if(moveType === 'get'){
    return JSON.parse(localStorage.getItem(itemName))
  }else {
    localStorage.setItem(itemName,JSON.stringify(obj))
  }
}
//根据日期对象和经过天数来返回一个date字符串
export function getDate (date=(new Date()), daysAfter=0){
  let dateObj = null;
  if(typeof date === 'string'){
    dateObj = new Date(date);
  }else {
    dateObj = date;
  }
  let daysTime = parseInt(daysAfter) * 86400000;
  let $date = new Date(dateObj.getTime() + daysTime);
  let dateArr = [$date.getFullYear(), $date.getMonth() + 1, $date.getDate()];
  //+0
  dateArr[1] = dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1];
  dateArr[2] = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
  return dateArr.join('-');
}

//生成随机字符串
export function randomString(length = 10) {
  const str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  const maxPos = str.length;
  let res = '';
  for (let i = 0; i < length; i++) {
    res += str.charAt(Math.floor(Math.random() * maxPos));
  }
  return res;
}
