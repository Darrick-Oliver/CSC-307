import { Request, Response } from "express";

const express = require('express');
const app = express();
const port = 5000;

interface User {
    id: string,
    name: string,
    job: string
}

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    return res.send('Hello World!');
});

app.get('/users', (req: Request, res: Response) => {
    const name = req.query.name;
    if (name != undefined){
        const result: User[] = findUserByName(String(name));
        const response = {
            users_list: result
        };
        res.send(response);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req: Request, res: Response) => {
    const id = req.params['id'];
    let result: User | undefined = findUserById(id);
    if (result === undefined)
        res.status(404).send('Resource not found.');
    else {
        const response = {
            users_list: result
        };
        res.send(response);
    }
});

function findUserById(id: string) {
    return users['users_list'].find( (user) => user['id'] === id);
}


const findUserByName = (name: string) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});