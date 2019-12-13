#### 1、基本的克隆、提交、拉取这些命令不做赘述

###### 本地文件夹关联远程仓库
1. 首先在本地文件初始化git
2. git remote add origin "远程地址"
3. git add ./ 将本地工程文件夹所有内容添加至缓存区（注意要先创建好gitingore文件）
4. git commit - m "提交日志"
5. git push -u origin master (首次推代码至远程仓库) / git push （非首次推代码至远程仓库）

#### 2、重置Git到某一个版本上

```
git reset 提交版本 --hard

注意的是版本号填写前8位即可
```

#### 3、推送当前所有的内容到远程git库

```
git push -u origin master
```

#### 4、转移指定的版本到当前分支上

```
git cherry-pick 提交版本

注意的是cherry-pick是本地行为，不能直接pick远程代码库上版本
```

#### 5、创建分支，并切换到创建的分支，拉取远端的分支到本地

```
git checkout -b 分支名

<!--实际上是执行的如下的命令-->
git branch test
git checkout test

<!--从远端拉取分支-->
git checkout -b 本地名 origin/远程名

```

#### 6、推送分支到远程

```
<!--如果是当前在本地创建的分支推送到远端，直接使用git push是不成功的，需要使用如下的两种方式进行提交-->
git push origin 分支名 / git push --set-upstream origin demo

```

#### 7、删除某一个分支(本地)

```
git branch -d 分支名

<!--如果删除中提示不可删除，可以使用下面的命令进行强制删除掉-->
git branch -D 分支名
```
#### 8、删除远程的分支

```
git push origin --delete 分支名
```

#### 9、查看所有的远程分支

```
<!--查看当前本地的分支-->
git branch

<!--查看所有的分支，包含远程的分支-->
git branch -a

<!--查看远程分支，并且能展示远程分支的提交版本号-->
git ls-remote
```

#### 10、git log

```
<!--用来查看所有的提交记录，显示较为详细的信息-->
git log

<!--可以使用下面的命令来展示提交版本以及提交的描述信息-->
git log --pretty=oneline

<!--以图表形式查看分支-->
git log --graph

```
#### 11、git reflog

```
<!--如果在回退以后又想再次回到之前的版本，git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录，git log则不能察看已经删除了的commit记录-->

git reflog
```

#### 12、合并分支 merge

```
<!--切换到想要合并的分支-->
git checkout 分支名

<!--开始进行合并分支-->
git merge 分支名
```

#### 13、变基式提交 rebase

```
变基式拉取代码

<!--将当前的本地更改储存起来-->
git stash

<!--变基式拉取代码-->
git pull —-rebase

<!--恢复之前缓存的工作目录-->
git stash pop
<!--手动解决冲突-->

<!--提交所有被删除和修改的文件到数据暂存区-->
git add -u

<!--继续变基-->
git rebase —-continue

<!--如果此时提示No rebase in progress?则表示已经没有冲突了；否则上面两步要重复多次-->
git commit -m “xxx”

<!--强制提交到远程-->
git push origin [branch] -f
```

目标： 把develop分支的内容变基到master分支

```
<!--切换分支到被合并的分支-->
git checkout develop

<!--变基mater，然后将develo的所有的commit清除掉-->
git rebase master

<!--切换到master分支-->
git checkout master

<!--合并develop分支-->
git merge develop
```

#### 14、标签的使用

```
<!--创建本地标签-->

git tag 标签名 || git tag -a 标签名 -m '解释'

<!--查看标签的列表-->

git tag

<!--删除本地的标签-->

git tag -d 标签名

<!--推送标签到远程-->

git push origin 标签名

<!--推送所有的标签到远程-->

git push origin --tags

<!--删除远程的tag标签-->

git push origin :refs/tags/标签名

<!--查看远程的所有的标签-->

git ls-remote --tags origin
```

#### 15、错误提交之后如何处理
```
<!--git add 的还原 ，如果文件并没有被暂存使用checkout，如果已经放到了暂存区需要使用git reset-->
git checkout <file name> / git reset <file name>

<!--git commit 的还原可以通过reset来回滚-->
git reset --soft HEAD^ (重置工作区到上一次提交，且保留更改，回滚一次，两次为HEAD～2)
<!--另外也可以使用log查找提交的编码来重置-->
git reset --Hard HEAD^ (重置工作区到上一次提交，并且清空掉更改内容)

<!--如果仅仅是修改commit的提交注释，则只需要使用amend即可-->
git commit --amend
```

#### 16、慎用的命令，以下的命令不能随便使用，删除之后是很难找到的。

```
<!--这个展示用的命令，使用此命令会展示出当前工作环境中没有被跟踪的文件，提示将会被remove掉-->
git clean -n

<!--强制删除掉没有被跟踪的文件-->
git clean -f

<!--删除指定路径下的未被跟踪的文件-->
git clean -f <path>

<!--删除当前目录下没有被跟踪的文件和文件夹-->
git clean -df

<!--请不要用这个命令！！！！-->
<!--终极删除 删除当前目录下所有没有track过的文件，不管他是否是.gitignore文件里面指定的文件夹和文件-->
git clean -xf

<!--使用一下两个命令，可以快速指定到某一个提交并且清理工作区。-->
git reset --hard 提交版本号

git clean -df

```

#### 17、git的提交规范

```
feat: 本次提交主要是功能性的修改

fix: 本次提交主要是修复问题

refactor: 重构某些代码

chore: 零碎的内容提交
```

