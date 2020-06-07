import React from 'react'

const onDownload = (fileName, fileHash) => {
    const data = {
        fileName: fileName,
        transactionHash: fileHash
    }

    var element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute("download", fileName + ".json");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const ItemListFile = ({page, index, fileInfo}) => {
    return(
      <tr>
        <td style={{fontWeight:"normal"}}>{ (page > 0) ? ((10*(page-1) + index) + 1) : (index + 1)}</td>
        <td style={{fontWeight:"normal"}}>{fileInfo.fileName}</td>
        <td style={{fontWeight:"normal"}}>{fileInfo.transactionHash}</td>
        <td style={{fontWeight:"normal"}}>{fileInfo.createdAt}</td>
        <td><button className="btn btn-success" onClick={(e) => onDownload(fileInfo.fileName, fileInfo.transactionHash)}><i className="fa fa-download"></i></button></td>
      </tr>  
    )
}
export default ItemListFile