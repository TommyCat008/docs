#### 网页手机wap2.0网页的head里加入下面这条元标签，在iPhone的浏览器中页面将以原始大小显示，并不允许缩放。  
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">   
```
- width - viewport的宽度 height - viewport的高度   

- initial-scale - 初始的缩放比例  

- minimum-scale - 允许用户缩放到的最小比例   

- maximum-scale - 允许用户缩放到的最大比例  

- user-scalable - 用户是否可以手动缩放 

```
<meta name="format-detection" content="telephone=no">
```

#### 当该 HTML 页面在手机上浏览时，该标签用于指定是否将网页内容中的手机号码显示为拨号的超链接。

在 iPhone 上默认值是：
```
<meta name="format-detection" content="telephone=yes"/>
```
如果你不希望手机自动将网页中的电话号码显示为拨号的超链接，那么可以这样写：
```
<meta name="format-detection" content="telephone=no"/>
```

#### 说明：网站开启对web app程序的支持。

```
<meta name="apple-mobile-web-app-capable" content="yes" />
```

#### 在web app应用下状态条（屏幕顶部条）的颜色；
```
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```
默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。

注意：若值为“black-translucent”将会占据页面px位置，浮在页面上方（会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。

 ！！！！苹果web app其他设置：

当然，配合web app的icon 和 启动界面需要额外的两端代码进行设定，如下所示：

```
<link rel="apple-touch-icon-precomposed" href="iphone_milanoo.png" />
```

说明：这个link就是设置web app的放置主屏幕上icon文件路径

使用：

该路径需要注意的就是放到将网站的文档根目录下但不是服务器的文档的根目录。

图片尺寸可以设定为57*57（px）或者Retina可以定为114*114（px），ipad尺寸为72*72（px）

```
<link rel="apple-touch-startup-image" href="milanoo_startup.png" />
```

说明：这个link就是设置启动时候的界面，放置的路劲和上面类似。

使用：

该路径需要注意的就是放到将网站的文档根目录下但不是服务器的文档的根目录。

官方规定启动界面的尺寸必须为 320*640（px），原本以为Retina屏幕可以支持双倍，但是不支持，图片显示不出来。

#### 添加到主屏幕“后，全屏显示

```
<meta name="apple-touch-fullscreen" content="yes">
```

#### 这meta的作用就是删除默认的苹果工具栏和菜单栏。content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。

```
<meta name="apple-mobile-web-app-capable" content="yes" />
```

#### 将不识别邮箱

```
<meta content="email=no" name="format-detection" />
```


iOS用rel="apple-touch-icon",android 用rel="apple-touch-icon-precomposed"。这样就能在用户把网页存为书签时，在手机HOME界面创建应用程序样式的图标。

 
```
<!DOCTYPE HTML>

<html>

<head>

<meta http-equiv="content-type" content="text/html; charset=gbk" />

<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1">

<meta name="apple-mobile-web-app-capable" content="yes">

<meta name="apple-touch-fullscreen" content="YES">

<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

```
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<meta http-equiv="Content-Type" content="text/html; charset=gbk">

<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

<meta name="format-detection" content="telephone=no">

<meta name="keywords" content="">
```

 

```
<meta name="apple-mobile-web-app-capable" content="yes">  

<meta name="apple-mobile-web-app-status-bar-style" content="black" />  

<meta http-equiv="content-type" content="text/html; charset=gb2312">  

<meta name="HandheldFriendly" content="True">  

<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">  

<meta name="apple-touch-fullscreen" content="YES" />  

<meta name="viewport" content="width=device-width,maximum-scale=1.0,initial-scale=1.0,user-scalable=no"/>  

<meta name="format-detection" content="telephone=no"/>
```