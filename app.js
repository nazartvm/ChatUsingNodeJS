var express=require("express");
var app=express();


app.get('/',function(req,res)
{
res.sendFile(__dirname + '/public/index.html')
});
 app.use(express.static('public'));
app.listen(3000,function()
{
    console.log("chat application");
})