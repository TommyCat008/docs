Service Worker 是HTML5的持久性离线缓存API，有以下功能和特性：

- 一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。
- 一旦被 install，就永远存在，除非被 uninstall
- 需要的时候可以直接唤醒，不需要的时候自动睡眠（有效利用资源，此处有坑）
- 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
- 离线内容开发者可控
- 能向客户端推送消息
- 不能直接操作 DOM
- 出于安全的考虑，必须在 HTTPS 环境下才能工作
- 异步实现，内部大都是通过 Promise 实现




###### 实现步骤

##### >>>第一步

在想要展示的页面的HTML中添加注册sw.js的脚本


```
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('static/js/sw.js')
                .then(function(registration) {
                    console.log('注册成功');
                })
                .catch(function(err) {
                    console.log('注册失败');
                });
        });
    }
</script>
```
值得注意的是引入sw.js的path也会有问题，如果写的是 'static/js/sw.js'，那么这个在sw.js中以及manifest.json文件中，都是会认为static/js为根目录的


##### >>>第二步

在sw.js文件中添加想要缓存的静态资源
例如以下的缓存方式

```
// 传递字符串，每次在激活的时候会匹配版本号。
var VERSION = 'freedo-cache-v3';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('freedo-cache-v1').then(function(cache) {
            return cache.addAll([
                '../plugins/fullscroll/jquery-1.8.3.min.js',
                '../plugins/fullscroll/jquery.slider.js'
            ]);
        })
    );
});

// 用于判断版本是否一致
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // 如果当前版本和缓存版本不一致
                    if (cacheName !== VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 用于判断网络掉线
self.addEventListener('offline', function() {
    Notification.requestPermission().then(grant => {
        if (grant !== 'granted') {
            return;
        }

        const notification = new Notification("Hi，网络不给力哟", {
            body: '您的网络貌似离线了，不过在志文工作室里访问过的页面还可以继续打开~',
            icon: '//lzw.me/images/avatar/lzwme-80x80.png'
        });

        notification.onclick = function() {
            notification.close();
        };
    });
});

// fetch拦截事件
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(hit => {
            // 返回缓存中命中的文件
            if (hit) {
                return hit;
            }
            const fetchRequest = event.request.clone();

            if (navigator.online) {
                // 如果为联网状态
                return onlineRequest(fetchRequest);
            } else {
                // 如果为离线状态
                // return offlineRequest(fetchRequest);
            }
        })
    );
});

```
这个地方官网写了一个self，也是我不明白的地方，写成this貌似也没发现什么问题。

##### >>>第三步
添加manifest.json文件
并且在HTML中引入这个文件 ，在head标签中写入

```
<link rel="manifest" href="static/js/manifest.json">
```

manifest.json文件内容如下
```
{
    "short_name": "Holo3D For Web",
    "name": "飞渡云提供技术支持",
    "icons": [{
            "src": "../img/feidu.png",
            "type": "image/png",
            "sizes": "96x96"
        },
        {
            "src": "../img/feidu.png",
            "type": "image/png",
            "sizes": "144x144"
        }
    ],
    "background_color": "#2196f3",
    "display": "standalone",
    "start_url": "../../index.html"
}
```

以上三步骤走完之后就可以在浏览器中运行查看结果

有可能会出现失败的情况，官网给出的失败原因如下：

1. 不是 HTTPS 环境，不是 localhost 或 127.0.0.1。
2. Service Worker 文件的地址没有写对，需要相对于 origin。
3. Service Worker 文件在不同的 origin 下而不是你的 App 的，这是不被允许的。

在Chrome的调试程序里面查看是否缓存成功，
首先在Chrome的Application模块中查看Cache Storage的内容即可
同时也可以查看Manifest的内容是否是自己配置的信息
在Service Works中查看当前注册的离线缓存功能，可以停止缓存，也可以删除掉当前的SW

###### 调试
chrome的调试功能，可以通过 Application -> Service Workers 面板查看和调试

Offline： 选中则当前站点即断开网络状态

Update on reload： 选中则当刷新页面时强制更新

Bypass for network： 选中则资源加载和更新绕过 Service Worker，都要从网络获取

Update：(更新)按钮执行指定的Service workers 一次性更新。

###### 问题

发现在运行的时候，fetch事件并没有被触发，感觉缓存并没有被引用，暂时找不到解决的方案。

参考文档： 

https://lavas.baidu.com/pwa/README

http://lzw.me/a/pwa-service-worker.html

http://blog.csdn.net/qiqingjin/article/details/53437484(可能出现的问题，fetch的问题)

https://juejin.im/post/5a9e8ad5f265da23a40456d4