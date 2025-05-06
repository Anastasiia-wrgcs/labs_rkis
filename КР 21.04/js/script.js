const HOST = 'http://apiweb.api-web-tech.local';
var TOKEN= " ";
const content = document.querySelector('.content')

function _get(params, callback) {
  var http_request = new XMLHttpRequest();
    http_request.open('GET', `${params.url}`);
    http_request.send();
    http_request.onreadystatechange = function (){
      if (http_request.readyState == 4) {
        callback(http_request.responseText);
      }
    }
}

function _post(params, callback) {
  var http_request = new XMLHttpRequest();
  http_request.open('POST', `${params.url}`);
  http_request.send(params.data);
  http_request.onreadystatechange = function (){
    if (http_request.readyState == 4) {
      callback(http_request.responseText);
    }
  }
}
LoadPageAuth()

function LoadPageAuth() {
  _get({url: '/modules/authorization.html'}, function(responseText) {
      content.innerHTML=responseText
      onloadPageAuth()
  })
}

function onloadPageAuth() {
  document.querySelector('.authorize').addEventListener('click', function() {
    var request_data = new FormData();
    request_data.append('email', document.querySelector('input[name="email"]').value)
    request_data.append('password', document.querySelector('input[name="password"]').value)

      _post({url: `${HOST}/authorization`, data: request_data}, function(response) {
          response = JSON.parse(response);
          if (response.success) {
            TOKEN = response.token;
              console.log(TOKEN)
            LoadPageViewData();
          } else {
            alert('Login Failed')
          }
      })
  })
}

function LoadPageViewData() {
  _get({url: '/modules/data.html'}, function(response){
    content.innerHTML = response;
    
    document.querySelector('.exit').addEventListener('.click', onclicklogout)
  })
}

      var fdata = new FormData();
      fdata.append('token', TOKEN)
      var xhr = new XMLHttpRequest();
      xhr.open('POST', `${HOST}/data`);
      xhr.send(fdata);
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              console.log(this.responseText);
                if (xhr.status == 200) {
                  makeTableData
              }
              if (xhr.status == 401) {
                var response = JSON.parse(xhr.responseText)
                alert(response.message)
              }
          }   
      } 

function makeTableData(data) {
  data.forEach(Element => {
    var row = document.createElement('tr')
    cell = document.createElement('td')
    cell.textcontent = Element.name
    row.append(cell)

    document.querySelector('.user-data tbody').append(row)
  });
}

function onclicklogout() {
  var fdata = new FormData();
  fdata.append('token', TOKEN)
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `${HOST}/logout`);
  xhr.send(fdata);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      console.log(this.responseText)
      if (xhr.status == 200) {
        LoadPageAuth()
      }
      if (xhr.status == 401) {
        let response = JSON.parse(xhr.responseText)
        alert(response.message)
      }
    }
  }
}


function makeTableCell(content) {
  var cell = document.createElement('td')
  cell.textcontent = content
  return cell;
}

function makeTableBtn(Text) {
  var btn = document.createElement('button')
  btn.textcontent = Text
  return btn;
}

function makeTableData(data) {
  var counter = 0
  data.forEach(Element => {
    var row = document.createElement('tr')
    row.append(makeTableCell(Element.name))
    row.append(makeTableCell(Element.gender))
    row.append(makeTableCell(Element.age))
    row.append(makeTableCell(Element.eyeColor))
    row.append(makeTableCell(Element.balance))
    row.append(makeTableCell(Element.company))
    row.append(makeTableCell(Element.email))
    row.append(makeTableCell(Element.phone))
    row.append(makeTableCell(Element.address))
    row.append(makeTableCell(Element.favoritefruit))
    row.append(makeTableCell("Кнопка"))
    row.append(makeTableCell("Ссылка", "http://google.com"))

      if (counter%2 == 2) {
        row.classList.add('row_odd')
      } else {
        row.classList.add('row_even')
      }

      document.querySelector('.data-table tbody').append(row)
      counter++;

      cell = document.createElement('td')
      cell.textcontent = element.name
      row.append(cell)
        })
}














