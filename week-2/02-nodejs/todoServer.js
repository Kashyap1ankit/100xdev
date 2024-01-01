/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, "description": "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(bodyParser.json());

const port = 3030;

app.get("/", (req, res) => {
  res.send("Hleoo ji");
});

//1. GET /todos -- all todos in json and

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf8", (err, data) => {
    let result = JSON.parse(data);
    res.status(200).json(result);
  });
});

// 2. GET /todos/:id -- get the specific id todo and if not then return 404 with not found message

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./todos.json", "utf8", (err, data) => {
    const d1 = JSON.parse(data);
    const lastd1 = d1.filter((e) => {
      return e.id.toString() === id;
    });

    if (lastd1.length <= 0) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json(lastd1[0]);
    }
  });
});

//3.POST /todos -- post a new todo in the data with status 201

app.post("/todos", (req, res) => {
  const { title, completed, description } = req.body;

  const id = Math.floor(Math.floor(Math.random() * 100));

  let data = {
    title,
    completed,
    description,
    id,
  };

  fs.readFile("./todos.json", "utf8", (err, result) => {
    if (err) console.log(err);
    const todos = JSON.parse(result);
    todos.push(data);
    const newTodo = JSON.stringify(todos);
    fs.writeFile("./todos.json", newTodo, (err) => {
      if (err) console.log(err);
      res.status(201).json(data);
    });
  });
});

//4. PUT request on /todos/:id -- update a existing todo in data and return 200 and if not found then reutrn 404;

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed, description } = req.body;

  fs.readFile("./todos.json", "utf8", (err, data) => {
    const d1 = JSON.parse(data);

    const lastd1 = d1.filter((e) => {
      return e.id.toString() === id;
    });

    const lastd1Index = d1.indexOf(lastd1[0]);

    if (lastd1Index === -1) {
      res.status(404).json("Not found");
    } else {
      let data = {
        title,
        completed,
        description,
        id,
      };

      d1[lastd1Index] = data;

      const updatedTodo = JSON.stringify(d1);

      fs.writeFile("./todos.json", `${updatedTodo}`, (err) => {
        if (err) console.log(err);
        res.status(200).json("updated");
      });
    }
  });
});

//5. Delete a specific todo from list

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("./todos.json", "utf8", (err, data) => {
    const d1 = JSON.parse(data);

    let lastd1 = d1.filter((e) => {
      return e.id.toString() === id;
    });

    lastd1 = d1.indexOf(lastd1);

    if (lastd1.length === -1) {
      res.status(404).json("Not found");
    }

    lastd1 = d1.splice(lastd1, 1);

    const updatedTodo = JSON.stringify(lastd1);

    fs.writeFile("./todos.json", updatedTodo, (err) => {
      if (err) console.log(err);
      res.status(200).json({ message: "deleted" });
    });
  });
});

app.listen(port, () => {
  console.log("listening");
});

module.exports = app;
