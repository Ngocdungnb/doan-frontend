import React from 'react'

const convertTime = (time) => {
  var date = new Date(time*1000);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '-' + day + '/' + (month+1) + '/' + year;
  
  return formattedTime
}

const ItemListTransaction = ({page, index, transactionInfo}) => {
    return(
      <tr>
        <td style={{fontWeight:"normal"}}>{ (page > 0) ? ((10*(page-1) + index) + 1) : (index + 1)}</td>
        <td style={{fontWeight:"normal"}}>{transactionInfo.blockNumber}</td>
        <td style={{fontWeight:"normal"}}>{transactionInfo.hash}</td>
        <td style={{fontWeight:"normal"}}>{convertTime(transactionInfo.timeStamp)}</td>
      </tr>  
    )
}
export default ItemListTransaction