function redirectMusic(id){
  const Http = new XMLHttpRequest();
  Http.open('GET', 'https://musicapi.zunao.eu.org/song/url/v1?id=' + id + '&level=lossless');
  Http.onreadystatechange = function() {
    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        let resp = eval("(" + Http.responseText + ")");
        resp = resp.data[0].url;
        window.open(resp, '_blank')
      }
    } else {
      console.error(Http.statusText)
    }
  };
  Http.send();
}