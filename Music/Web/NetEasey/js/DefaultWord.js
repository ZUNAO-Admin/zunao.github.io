const Http = new XMLHttpRequest();
Http.open('GET', 'https://musicapi.zunao.eu.org/search/default');
Http.onreadystatechange = function() {
  if (Http.readyState === XMLHttpRequest.DONE) {
    if (Http.status === 200) {
      let resp = eval("(" + Http.responseText + ")");
      resp = resp.data.showKeyword;
      //获取编辑框
      var ipt = document.getElementById("ipt_search");
      ipt.setAttribute('value', resp)
      ipt.removeAttribute('disabled')
    }
  } else {
    console.error(Http.statusText)
  }
};
Http.send();