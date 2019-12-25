##### 命令行安装==Typescript==

```
npm install --save-dev typescript
npm install --save-dev @vue/cli-plugin-typescript
```

##### 编写==Typescript==配置

根目录下新建 tsconfig.json，下面为一份配置实例(点击查看所有配置项)。值得注意的是，默认情况下，ts 只负责静态检查，即使遇到了错误，也仅仅在编译时报错，并不会中断编译，最终还是会生成一份 js 文件。如果想要在报错时终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 为 true。
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "allowJs": false,
    "noEmit": true,
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

##### 新增==shims-vue.d.ts==

根目录下新建 shims-vue.d.ts，让 ts 识别 *.vue 文件，文件内容如下
```ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

##### 修改入口文件后缀

```js
src/main.js => src/main.ts
```

##### 改造 .vue 文件

.vue 中使用 ts 实例

```js
// 加上 lang=ts 让webpack识别此段代码为 typescript
<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    // ...
  })
</script>
```


参考文档：
https://juejin.im/post/5da6e5c1f265da5b8c03c58f