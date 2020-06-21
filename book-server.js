const express=require('express')
const app=express()

app.all('/*', function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

app.listen(3355,()=>{
    console.log("Server Start ....","http://localhost:3355")
})

const path=require('path');
app.use('/', express.static('./public'))
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const request=require("request")
const xml2js=require("xml2js")

app.get('/news',(req,res)=>{
    var fd=encodeURIComponent(req.query.fd)
    // 네이버에 연결
    /*
        http://newssearch.naver.com/search.naver?where=rss&query=%EB%A7%9B%EC%A7%91 인코딩
     */
    var url="http://newssearch.naver.com/search.naver?where=rss&query="+fd;
    // XML => JSON (파서기생성)  explicitArray:false 변환이 안되는 것은 제외
    var parser=new xml2js.Parser({
        explicitArray:false
    })
    // 네이버 서버에 접근
    request({url:url},(err,request,xml)=>{
        //console.log(xml)
        parser.parseString(xml,function (err,pJson) {
            console.log(pJson.rss.channel.item)
            res.json(pJson.rss.channel.item)
        })
    })
})

const Client=require("mongodb").MongoClient

app.get('/book',(req,res)=>{
    var rowSize=9;
    var random=Math.random()*794
    var skip=Math.floor(random);
    var url="mongodb://localhost:27017";

    Client.connect(url,(err,client)=>{
        //Database (mydb)
        var db=client.db("mydb");
        // Table => Collection=> recipe
        db.collection("book").find({}).skip(skip).limit(rowSize)
            .toArray((err,docs)=>{
                res.json(docs)
                client.close();
            });
    })

})

app.get('/bookFind',(req,res)=>{
    var fd=req.query.fd
    var url="mongodb://localhost:27017";

    Client.connect(url,(err,client)=>{
        //Database (mydb)
        var db=client.db("mydb");
        // Table => Collection=> recipe
        db.collection("book").find({title:{'$regex':fd}})
            .toArray((err,docs)=>{
                res.json(docs)
                console.log(docs)
                client.close();
            });
    })

})


app.get('/recommend',(req,res)=>{
    var page=req.query.page; //request.getParameter("page");
    var rowSize=9;
    var skip=(page*rowSize)-rowSize;
    var url="mongodb://localhost:27017";

    Client.connect(url,(err,client)=>{
        //Database (mydb)
        var db=client.db("mydb");
        // Table => Collection=> recipe
        db.collection("book").find({}).skip(skip).limit(rowSize)
            .toArray((err,docs)=>{
                /*console.log(page)*/
                res.json(docs)
                client.close();
            });
    })

})

app.get('/totalpage',(req,res)=>{
    var url="mongodb://localhost:27017";

    Client.connect(url,(err,client)=>{
        //Database (mydb)
        var db=client.db("mydb");
        // Table => Collection=> recipe
        db.collection("book").find({}).count((err,count)=>{
                res.json({total:Math.ceil(count/9.0)})
                client.close();
                return count;
            });
    })

})

app.get('/bookDetail',(req,res)=>{
    var url="mongodb://localhost:27017";
    var no=req.query.no;
    Client.connect(url,(err,client)=>{

        var db=client.db("mydb");
        // Table => Collection=> recipe
        db.collection("book").find({no:Number(no)})
            .toArray((err,docs)=>{
            res.json(docs)
            console.log(docs)
            client.close();
        });
    })
})