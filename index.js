const express = require('express');
const app = express();
const fetch = require("node-fetch");

const url = "https://api.github.com/users/takenet/repos?&page=1&per_page=10&sort=created&direction=asc" //Docs API Github
let data = []

app.get("/dados/:id", async (req, res) => {

  fetch(url, { method: "Get" })
    .then(res => res.json())
      .then((json) => {
        for(i=0;i<json.length;i++) {
          let { full_name, description, language, created_at } = json[i]

          if(language == 'C#'){ 
            data.push({full_name, description, created_at})
          }
        }
        res.status(200).send(data)   
      });
});


app.listen(process.env.PORT || 3000);


