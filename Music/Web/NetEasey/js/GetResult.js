function search(keyword, page){
  console.log("开始搜索 " + keyword);
  const Http = new XMLHttpRequest();
  Http.open('GET','https://musicapi.zunao.eu.org/search?keywords=' + keyword + '&offset=' + page);
  Http.onreadystatechange = function() {
  if (Http.readyState === XMLHttpRequest.DONE) {
    if (Http.status === 200) {
      //console.log(Http.responseText);
      let resp = eval("(" + Http.responseText + ")");
      //console.log(resp.result.songs[0].artists[0].name);
      resp = resp.result.songs;
      var table=document.getElementById("tb_result")
      var allTr=table.getElementsByTagName("tr");
      var length=allTr.length;
      for(var i=1;i<length;i++){
        allTr[1].remove();
      }
      for (var i=0;i<resp.length;i++) { 
       var tr = document.createElement("tr");
       var song = document.createElement("td");
       //song = document.createTextNode(resp[i].name);
       song.textContent=resp[i].name
       tr.appendChild(song);
       var artist="";
       for (var n=0;n<resp[i].artists.length;n++) {
         artist += resp[i].artists[n].name
       };
       var art = document.createElement("td");
       //art = document.createTextNode(artist);
       art.textContent=artist
       tr.appendChild(art);
       var album = document.createElement("td");
       //album = document.createTextNode(resp[i].album.name);
       album.textContent=resp[i].album.name
       tr.appendChild(album);
       //console.log(artist)
       table.appendChild(tr);
     };
    } else {
      console.error(Http.statusText);
    }
  }
};
  Http.send();
}