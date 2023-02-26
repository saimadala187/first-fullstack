
const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");

const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running");
})


app.get("/", function(req,res){

  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

  const Firstname= req.body.firstName;
  const Lastname= req.body.lastName;
  const Email= req.body.email;

  const data={
    members:[
      {
      email_address:Email,
      status:"subscribed",
      merge_fields:{
        FNAME: Firstname,
        LNAME: Lastname
      }
}
    ]
  }
  const jasonData=JSON.stringify(data);
  const url="https://us12.api.mailchimp.com/3.0/lists/9a7f0192b2";
  const options={
    method:"POST",
    auth:"sai1:60f35228333b82347a080662d5c9b981-us12"
  };
  const request =https.request(url,options,function(response){

    if (response.statusCode===200) {
      res.sendFile(__dirname+"/success.html");

    } else {
      res.sendFile(__dirname+"/failure.html");

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jasonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

//9a7f0192b2

//91a154f3a6e311feb88982e716648de5-us12
