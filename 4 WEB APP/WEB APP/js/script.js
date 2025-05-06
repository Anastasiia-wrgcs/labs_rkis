///#document.querySelector(`.content`)region Глобальные переменные
const HOST = `http://web-app.api-web-tech.local`;
const CONTENT = document.querySelector('.content')
///#endregion


///#region HTTP AJAX методы
function _get(params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('GET',`${params.url}`);
    HTTP_REQUEST.send();
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText)
        }
    };
}

function _post(params, callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('POST',`${params.url}`);
    HTTP_REQUEST.send(params.data);
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText)
        }
    };
}

function _load(url,callback) {
    var HTTP_REQUEST = new XMLHttpRequest();
    HTTP_REQUEST.open('GET', url);
    HTTP_REQUEST.send();
    HTTP_REQUEST.onreadystatechange = function() {
        if(HTTP_REQUEST.readyState == 4) {
            callback(HTTP_REQUEST.responseText)
        }
    }
}
///#endregion


function onLoadAuth() {
    document.querySelector(`.go-register`).addEventListener (`click`, function() {
        _get({url:'/modules/registration.html'}, function(responseText) {
            CONTENT.innerHTML = responseText;
            document.querySelector(`.go-register`).addEventListener(`click`, function() {
                _load('/modules/profile.html.html', function(responseText) {
                    CONTENT.innerHTML = responseText;
                })
            })
        })
    })


    if(response.success) {
        document.querySelector(`.authorize`).addEventListener('click',function() {
            var reqest_data = new FormData();
            reqest_data.append('email', document.querySelector(`input[name="email"]`).value),
            reqest_data.append('password', document.querySelector(`input[name="password"]`).value)
        })
    
        document.querySelector(`profile`).addEventListener('click', function() {
            var reqest_data = new FormData();
            reqest_data.append('first_name', document.querySelector(`input[name="first_name"]`).value),
            reqest_data.append('last_name', document.querySelector(`input[name="last_name"]`).value),
            reqest_data.append('name_email', document.querySelector(`input[name="name_email"]`).value),
            reqest_data.append('name_password', document.querySelector(`input[name="name_password"]`).value)
        })
    }

    document.querySelector('.message-block').innerHTML= '';
    document.querySelector('.message-block').append(response.message)

        _post({url: `${HOST}/authorization/`, data: reqest_data}, function(responseText) {
            responseText = JSON.parse(responseText);
            
                _load({url:'/modules/profile.html.html'}, function(responseText) {
                    CONTENT.innerHTML = responseText;
                })
            })  


    if(responce.success) {
        TOKEN = response.TOKEN
                _get({url: '/modules/upload.html' }, function(response) {
                     CONTENT.innerHTML = responseText;
        })
    }
}

    