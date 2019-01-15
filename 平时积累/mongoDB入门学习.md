1、安装MongoDB for Mac

下载MongoDB压缩包，官网地址是 
```
https://www.mongodb.com/download-center#community
```

2、解压之后放置到自己的目标位置，然后在MongoDB文件夹根目录下创建一个data/db文件夹，此时你创建的文件夹应该是在系统的根目录下的，执行cd /data/db即可访问到。

```
sudo mkdir -p /data/db
```
3、进入到bin文件夹内并执行如下命令，来启动MongoDB的日志，因为没有设置全局的环境变量，所以还是需要进入到bin目录下来执行如下命令的。

```
sudo ./mongod
```

4、再打开一个新的终端并进入到bin目录下，执行如下命令来执行mongo的操作

```
./mongo
```
5、创建admin的用户

```
use admin // 切换到admin

db.createUser({user:'username',pwd:'password',roles:['userAdminAnyDatabase']})  // 创建用户

db.auth('root','root') // 验证是否存在

show users // 查看当前的所有的用户
```
6、创建普通的用户

```
<!--切换到数据库下，如果数据库不存在则不会创建，另外如果数据库里没有数据那么show dbs 不会展示出来-->
use database_name

<!--创建一个用户拥有读写的权限-->
db.createUser(
  {
    user: "simpleUser",
    pwd: "simplePass",
    roles: [ { role: "readWrite", db: "database_name" } ]
  }
)

<!-- 插入一条数据-->
db.database_name.insert({"name":"菜鸟教程"})

```

7、删除一个数据库

```
<!--切换到目标数据库-->
use database_name 

<!--删除当前的数据库，默认会在admin下删除test-->
db.dropDatabase()
```

8、创建集合也就是关系数据库里面的表的概念

```
<!--接受两个参数，第一个是集合名字，第二个是配置-->
db.createCollection("mycol", {
    capped : true,
    autoIndexId : true,
    size : 6142800, 
    max : 10000
})
```

字段 | 类型 | 描述
---|---|---
capped | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。
autoIndexId | 布尔 |（可选）如为 true，自动在 _id字段创建索引。默认为 false。
size | 数值 |（可选）为固定集合指定一个最大值（以字节计）。如果 capped 为 true，也需要指定该字段。
max | 数值 | （可选）指定固定集合中包含文档的最大数量。

9、删除集合

```
use database_name

show tables | show collections

db.collection.drop()
```

10、插入文档

所有存储在集合中的数据都是BSON格式。BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON

```
<!--document是一个对象-->
db.COLLECTION_NAME.insert(document)
```

11、更新文档

MongoDB 使用 update() 和 save() 方法来更新集合中的文档。

###### update()更新数据
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
参数说明

字段 | 描述
---|---
query | update的查询条件，类似sql update查询内where后面的。
update | update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
upsert | 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
multi | 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
writeConcern | 可选，抛出异常的级别。

举一个栗子：更新一条数据
```
<!--先在集合col中插入一条数据-->
db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})

<!--开始更新数据-->
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})

<!--查看一下这一条数据-->
db.col.find().pretty()

需要注意的是：以上的操作只会更新到查找的第一条数据，并不会更新往下的数据。
```
###### save()替换数据

```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```
参数说明

字段 | 描述
---|---
document | 文档数据。
writeConcern | 可选，抛出异常的级别。

12、删除文档
使用remove()方法删除掉符合的数据

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

字段 | 描述
---|---
query |（可选）删除的文档的条件。
justOne | （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
writeConcern |（可选）抛出异常的级别。

需要注意的是：remove()方法删除之后不会释放空间，需要调用db.repairDatabase()来修复一下数据库。

或者使用以下两个方式删除文档：
```
<!--删除集合下所有的文档-->
1、db.collection.deleteMany({})

<!--删除掉所有符合条件的文档-->
2、db.collection.deleteMany({ status : "A" })

<!--删除掉第一个符合条件的文档-->
3、db.inventory.deleteOne({ status : "A" })
```

13、查询文档

使用find()方法来查询数据db.collection.find(query, projection)

字段 | 描述
---|---
query | 可选，使用查询操作符指定查询条件
projection | 可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

使用pretty()方法来格式化展示db.col.find().pretty()

and与查询

```
db.col.find({key1:value1, key2:value2}).pretty()
```

or或查询
```
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```
与或查询

```
db.col.find({
    "likes": {$gt:50},
    $or: [
        {"by": "菜鸟教程"},
        {"title": "MongoDB 教程"}
    ]}).pretty()
```

14、分段截取数据

使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。

```
<!--使用一下方法来获取指定数量的数据-->
number如果是空的话,则会返回所有的数据
db.COLLECTION_NAME.find().limit(NUMBER)

<!--增加了偏移量,指定从某个位置开始偏移,默认值是0-->
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

15、sort排序

sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。
```
<!--KEY是需要排序的属性，1代表升序排列-->
db.COLLECTION_NAME.find().sort({KEY:1})
```

16、索引

索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。
索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构

创建索引的方法

```
<!--keys支持多个参数来组成一个复合索引-->
db.collection.createIndex(keys, options)
```

```
1、查看集合索引

db.col.getIndexes()

2、查看集合索引大小

db.col.totalIndexSize()

3、删除集合所有索引

db.col.dropIndexes()

4、删除集合指定索引

db.col.dropIndex("索引名称")
```

17、聚合

MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。

```
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```
举一个栗子：查询一下by_user出现的次数
```
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
},
{
   _id: ObjectId(7df78ad8902d)
   title: 'NoSQL Overview', 
   description: 'No sql database is very fast',
   by_user: 'runoob.com',
   url: 'http://www.runoob.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 10
},
{
   _id: ObjectId(7df78ad8902e)
   title: 'Neo4j Overview', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.neo4j.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 750
},


db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
```

集合node和MongoDB

```
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
```
