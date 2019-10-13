# url-shortener
A short url generator. <br>
This is a student project of final exram that built on Node.js with Express framework. <br>
Database used MongoDB.

短網址產生器。 <br>
Alpha Camp 學期三期末考 A29-Q4。 <br>

## Preview Pages
<img src="./public/img/preview01.jpg" alt="preview" width="500px" target="_blank">

#### 功能
* 於表單中輸入網址後，可生成短網址
* 可透過短網址連向目標網站
* 表單空白提交時，顯示錯誤提示
* 連結不存在的短網址時，顯示錯誤提示
* 後端邏輯，不會產生重複的短網址
* 後端邏輯，登錄過的網址會調用已生成的短網址，使 database 輕量化
* 後端邏輯，可判斷通訊協定是否包含 SSL 憑證
* 後端邏輯，自動判斷是否為開發模式，回傳不同 hostname

## Usage
* 可前往 [Heroku](https://lastor-url-shortener.herokuapp.com/) 瀏覽佈署版本。
* 或在本機端執行。(需下載，並安裝依賴套件)

安裝方法，請參考下方 [Dependency packages](#Dependency-packages) 與 [Installation](#Installation) 項目。 <br>
安裝完成後，使用以下步驟於本機端啟動專案。

1. 安裝 dependency npm pakages
    * 安裝專案套件，排除 nodemon
    ```
    $ npm install --only=prod
    ```
    * 一併安裝 nodemon 於專案中
    ```
    $ npm install
    ```
1. 於 cmd 啟動 MongoDB。 
    * macOS [官方文件](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-os-x/#run-mongodb)
    ```
    $ ~/mongodb/bin> mongod --dbpath <path to data directory>
    ```
    
    * windows(需用系統管理員執行) [官方文件](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-windows/#start-mdb-edition-as-a-windows-service)
    ```
    $ net start mongodb
    ```

1. 啟動 Node.js Server
    
    * 有安裝 nodemon，於專案根目錄執行
    ```
    $ npm run dev
    ```

    * 未安裝 nodemon，於專案根目錄執行
    ```
    $ npm start
    ```

1. 於瀏覽器開啟網頁
    ```
    http://localhost:3000
    ```

1. 瀏覽完畢後，關閉 Node.js Server
    ```
    回到 cmd 按下 Ctrl + C
    ```

1. 關閉 MongoDB
    * macOS
    ```
    關閉 Terminal 即可
    ```
    
    * windows(需用系統管理員執行)
    ```
    $ net stop mongodb
    ```

## Dependency packages
#### main
* [Node.js](https://nodejs.org/en/) v10.16.3
* [MongoDB](https://www.mongodb.com/) v4.0.12

#### npm package
[link to check package.json](./package.json)

#### front-end package (imported from CDN)
* [Bootstrap](https://getbootstrap.com/) v4.3.1
  * jQuery v3.4.1
  * popper v1.14.7
* [Font-Awesome](https://fontawesome.com/) v5.10.2

## Installation
於本機端執行前，請確認是否已安裝下列內容。

#### Download Project
1. 直接於 Github 上用瀏覽器下載 ZIP file
2. 用 Git clone 專案 (推薦)
```
$ git clone https://github.com/Lastor-Chen/url-shortener.git [資料夾名稱]
```

#### Install Node.js
本機端必須安裝 Node.js 與相關 package 才能執行此專案。 <br>
如尚未安裝 Node.js，建議使用 nvm toolkit 下載指定版本的 Node.js

| OS | URL |
| -------- | -------- |
| nvm-windows     | [Link to](https://github.com/coreybutler/nvm-windows) |
| nvm-macOS     | [Link to](https://github.com/nvm-sh/nvm) |

#### Install dependency npm packages
已在 package.json 中登入相關訊息，可直接執行下列指令安裝所需套件。
```
$ npm install [--only=prod]
```

#### Download mongoDB
本機端必須安裝 mongoDB 才能執行此專案。 <br>
請連結到 mongoDB 官方網站[下載](https://www.mongodb.com/download-center/community)。

※ 注意，Windows 用戶可能會於安裝 GUI Compass 時出問題。建議安裝時不勾選，另行安裝 [Robo 3T](https://robomongo.org/)。

#### 選擇安裝 nodemon
本專案推薦使用 [nodemon](https://github.com/remy/nodemon) 來取代原生的 Node.js 啟動方法。
```
$ npm install -g nodemon
```