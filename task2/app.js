
const express = require("express");
const app = express();
var fs = require('fs');

app.use(express.urlencoded({'extended': false}));
app.use(express.json());
app.set("view engine", "ejs");

app.post('/name_date', function(request, response) {

    var name = request.body.name;
    var date = request.body.date;

    let s = ""
    for (let i = 0; i < name.length; i++){
        for (let j = 0; j < date[i]; j++){
            s += name[i];
        }
    }
    var a = new Array(26);
    a.fill(0);
    for(let i = 0; i < s.length; i++){
        var index = s.charCodeAt(i) - 97;
        a[index]++;
    }
    var entropy = 0;
    for(let i = 0; i < a.length; i++){
        if(a[i] !== 0) {
            entropy += a[i] / s.length * Math.log(a[i] / s.length);
        }
    }
    fs.appendFileSync('database.txt', s + ', ' + entropy.toString() + '\n')
});
app.use("/", function(request, response){
    const data = fs.readFileSync('database.txt', 'UTF-8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    response.render("test", {
        title: "Мой сайт",
        str: lines
    });

});

app.listen(3000);