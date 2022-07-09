const express = require('express')
const app = express()
const faker = require('@faker-js/faker');
const port = 3000
const config = {
    host: 'db-mysql',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let peoples = []

buscarPessoas()

app.get('/', (req,res) => {
    gerarPessoa();
    buscarPessoas()   
    res.send(gerarHtml())
})
app.get('/gerar-pessoa', (req,res) => {
    gerarPessoa();    
    res.send("OK")
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function gerarHtml() {
    const persons = peoples
    let htmlTr = ``;
    persons.forEach((people, index, array) => {
        htmlTr +=`<tr>
                <td>${people.id}</td>
                <td>${people.name}</td>
            </tr>`;
    });
    const html = `<h1>Full Cycle Rocks!</h1>
    <table border=1>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
            </tr>
        </thead>
        <tboby>
            ${htmlTr}
        </tboby>
    </table>
    `
    return html;
}

function gerarPessoa() {
    const randomName = faker.faker.name.findName();
    const sql = `INSERT INTO people(name) values('${randomName}')`
    //connection.connect()
    connection.query(sql, (error, results, fields ) => {
        if (error) throw error;
        //console.log(results.insertId);
    })
    //connection.end()
}

function buscarPessoas() {
    const sql = `SELECT * FROM people;`;
    connection.query(sql, (error, results, fields ) => {
        peoples = results;
    })
    //connection.end()
}