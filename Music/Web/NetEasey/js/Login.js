function login() {
  window.open('Login.html', '_blank')
};
function loginAno() {
  const Http = new XMLHttpRequest();
  Http.open('GET', 'https://musicapi.zunao.eu.org/register/anonimous');
  Http.withCredentials = true;
  Http.onreadystatechange = function() {
    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        document.getElementById("text_status").textContent = "成功，可关闭本窗口";
        window.close()
      }
    } else {
      console.error(Http.statusText)
    }
  };
  Http.send()
};
function loginKey() {
  document.getElementById("text_status").textContent = "开始获取二维码";
  const Http = new XMLHttpRequest();
  Http.open('GET', 'https://musicapi.zunao.eu.org/login/qr/key?timestamp=' + Date.now());
  Http.onreadystatechange = function() {
    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        let resp = eval("(" + Http.responseText + ")");
        loginQr(resp.data.unikey)
      }
    } else {
      console.error(Http.statusText)
    }
  };
  Http.send();
};
function loginQr(key) {
  const Http = new XMLHttpRequest();
  Http.open('GET', 'https://musicapi.zunao.eu.org/login/qr/create?key=' + key + '&qrimg=true&timestamp=' + Date.now());
  console.log('https://musicapi.zunao.eu.org/login/qr/create?key=' + key + '&qrimg=true&timestamp=' + Date.now())
  Http.onreadystatechange = function() {
    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        let resp = eval("(" + Http.responseText + ")");
        resp = resp.data.qrimg;
        document.getElementById("login_qr").src = resp;
        document.getElementById("text_status").textContent = "等待扫码"
      }
    } else {
      console.error(Http.statusText)
    }
  };
  Http.send();
};
function loginSta() {
  const Http = new XMLHttpRequest();
  Http.open('GET', 'https://musicapi.zunao.eu.org/login/qr/check?key=' + key + '&timestamp=' + Date.now());
  Http.withCredentials = true;
  Http.onreadystatechange = function() {
    if (Http.readyState === XMLHttpRequest.DONE) {
      if (Http.status === 200) {
        let resp = eval("(" + Http.responseText + ")");
        resp = resp.message;
        document.getElementById("text_status").textContent = resp
      }
    } else {
      console.error(Http.statusText)
    }
  };
  Http.send();
}