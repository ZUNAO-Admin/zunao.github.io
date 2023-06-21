function search(keyword, page){
  console.log("开始搜索 " + keyword);
  const Http = new XMLHttpRequest();
  Http.open('GET','https://musicapi.zunao.eu.org/search?keywords=' + keyword + '&offset=' + page);
  Http.onreadystatechange = function() {
  if (Http.readyState === XMLHttpRequest.DONE) {
    if (Http.status === 200) {
      let resp = eval("(" + Http.responseText + ")");
      resp = resp.result.songs;
      //获取表格元素
      var table=document.getElementById("tb_result");
      //清空现有表格
      var allTr=table.getElementsByTagName("tr");
      var length=allTr.length;
      for(var i=1;i<length;i++){
        allTr[1].remove()
      }
      //开始逐行插入
      for (var i=0;i<resp.length;i++) { 
       var tr = document.createElement("tr");
       //tr.setAttribute('id', resp[i].id)
       //歌曲名
       var song = document.createElement("td");
       song.textContent=resp[i].name;
       tr.appendChild(song);
       //歌手名（歌手有多个）
       var artist="";
       for (var n=0;n<resp[i].artists.length;n++) {
         artist = artist + resp[i].artists[n].name + " "
       };
       var art = document.createElement("td");
       art.textContent=artist;
       tr.appendChild(art);
       //专辑名
       var album = document.createElement("td");
       album.textContent=resp[i].album.name;
       tr.appendChild(album);
       table.appendChild(tr);
       //操作
       var opt = document.createElement("td");
       var opt_btn = document.createElement("button");
       opt_btn.setAttribute('onclick', 'redirectMusic(' + resp[i].id +')');
       opt_btn.textContent="下载"
       opt.appendChild(opt_btn);
       tr.appendChild(opt);
       table.appendChild(tr)
     }
    } else {
      console.error(Http.statusText)
    }
  }
};
  Http.send();
}