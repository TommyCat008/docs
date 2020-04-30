"use strict";
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.url, 'true');
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200)
            console.log('成功');
    };
}
ajax({
    type: 'get',
    url: 'http://www.baidu.com',
    dataType: 'json'
});
