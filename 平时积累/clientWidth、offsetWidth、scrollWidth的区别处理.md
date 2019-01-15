
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #container {
            width: 200px;
            height: 200px;
            padding: 20px;
            margin: 20px;
            border: 10px solid red;
        }
    </style>
</head>
<body>
    <div id="container"></div>

    <script>
        let clientWidth = document.getElementById('container').clientWidth;
        let offsetWidth = document.getElementById('container').offsetWidth;
        let scrollWidth = document.getElementById('container').scrollWidth;

        // scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。 
        // clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。 
        // offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。

        console.log('clientWidth', clientWidth);  // 240
        console.log('offsetWidth', offsetWidth);  // 260
        console.log('scrollWidth', scrollWidth);  // 240
    </script>
</body>
</html>
```
