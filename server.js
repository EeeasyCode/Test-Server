const express = require('express');

const server = express();

const users = [
  {
      id : "adsfnsdf",
      name : "LEE",
      email : "djfkadn@gmail.com"
  },
  {
      id : "dknfjadf",
      name : "kim",
      email : "fnlkasdnfdks@gmail.com"
  }
];

server.get("/api/user",(req,res)=>{
  res.json(users);
});

server.listen(3000,()=>{
  console.log('This server is running!')
});