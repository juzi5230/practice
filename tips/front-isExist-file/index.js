export default function isExistFile(filepath, filename) {
    if(filepath == null || filename == null || filepath === "" || filename ===""){
      return false
     }
    var xmlhttp;
    if (window.XMLHttpRequest){
      xmlhttp=new XMLHttpRequest();
    }else{
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   }
    xmlhttp.open("GET",filepath + filename,false);
    xmlhttp.send();
    if(xmlhttp.readyState === 4){
    if(xmlhttp.status === 200) return true; //url存在
    else if(xmlhttp.status === 404) return false; //url不存在
    else return false;//其他状态
}
}