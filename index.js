const express = require('express');
const app = express();
const fetch = require("node-fetch");

const url = "https://api.github.com/users/takenet/repos?&page=1&per_page=10&sort=created&direction=asc" //Docs API Github
// sort - ordena pela data de criação ;
// direction - faz ir em direção crescente (asc);
// page -  página onde vai mostrar os dados (limite padrão do github é 30);
// per_page - limitação de conteudo em uma página.


let data = []

app.get("/dados/:id", async (req, res) => {

  fetch(url, { method: "Get" }) //Fazer requisição dos dados
    .then(res => res.json())
      .then((json) => {
        for(i=0;i<json.length;i++) {
          let { full_name, description, language, created_at} = json[i] //desestruturação da variável

          if(language == 'C#'){ //Deixar somente as que tem C# no campo language
            data.push({full_name, description, created_at})
          }
        }
        res.status(200).send(data[req.params.id])  //req.params.id é onde o valor que você colocou na URL vai pegar no array  
      });
});


app.listen(process.env.PORT || 3000); //Heroku manda a porta automaticamente mas se não vai direto na 3000


