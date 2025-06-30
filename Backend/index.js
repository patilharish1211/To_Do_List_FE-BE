const express = require("express");
const fs = require("fs");
let cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

app.post("/addTodos", (req, res) => {
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const todosData=req.body;
            const newTodo = JSON.parse(data);
            newTodo.todos.push(todosData);
            fs.writeFile("./db.json", JSON.stringify(newTodo), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(newTodo);
                }
            })
        }
    }) 
});

app.delete("/delete/:id", (req, res) => {
    const {id}= req.params;

     fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const newData = JSON.parse(data);
            const filteredData = newData.todos.filter((el) => el.id !== id);
            newData.todos = filteredData;
            fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(newData);
                }
            })
        }
    })
});

app.patch("/update/:id", (req, res) => {
    
    const {id} = req.params;
    const {title, completed} = req.body;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const newData = JSON.parse(data);
            const foundTodo = newData.todos.findIndex((el) => el.id === id);

            if(foundTodo !== -1){
                return res.send("Todo not found");
            }else{
                let updatedTodo = newData.todos[foundTodo];
                // updatedTodo.title = title;
                // updatedTodo.completed = completed;
                fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(newData);
                    }
                })
            }
        }
    })
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


//http://localhost:8000