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
    const job = req.query.job;

    if (name == undefined && job == undefined) {
        res.send(users);
    } else {
        let result: User[] = users.users_list;
        if (name != undefined) {
            result = findUserByName(String(name), result);
        }
        if (job != undefined) {
            result = findUserByJob(String(job), result)
        }
        const response = {
            users_list: result
        };
        res.send(response);
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

app.post('/users', (req: Request, res: Response) => {
    const userToAdd: User = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

app.delete('/users', (req: Request, res: Response) => {
    const id = req.query.id;
    const result = removeUser(String(id));
    if (result == undefined)
        res.status(404).send('Resource not found.');
    else {
        res.status(200).end();
    }
});

const addUser = (user: User) => {
    users['users_list'].push(user);
}

const removeUser = (id: string) => {
    const user = findUserById(id);
    if (!user)
        return undefined;

    const idx = users.users_list.indexOf(user);
    users.users_list.splice(idx, 1);
    return idx;
}

const findUserById = (id: string) => {
    return users['users_list'].find((user) => user['id'] === id);
}

const findUserByName = (name: string, users: User[]) => {
    return users.filter((user) => user['name'] === name); 
}

const findUserByJob = (job: string, users: User[]) => { 
    return users.filter((user) => user['job'] === job); 
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