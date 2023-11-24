const express = require("express")
const bodyParser = require("body-parser")

let taskArray = []

// Created an APP
const app = express()

// Initialised the PORT
const PORT = 3000

// Starting the server which listen on PORT 3000
app.listen(PORT, (error)=>{
    if(error){
        console.log("Something went wrong")
    }else{
        console.log(`Server is listening on PORT ${PORT}...`)
    }
})

// Middlewares

app.use(bodyParser.json());
// Task Manager Endpoints

app.get("/tasks", (req, res)=> {
    return res.status(200).send(taskArray)
})

app.get("/tasks/:id", (req,res)=>{
    const requestedId = req.params.id
    const requestedItem = taskArray.filter(item => item.id==requestedId)
    return res.status(200).send(requestedItem)
})

app.post("/tasks", (req,res)=>{
    let {id,title, description, flag} = req.body
    if(idValidator(id) && inputValidator(req.body)){
        taskArray.push({id:id, title:title, description: description, flag: flag})
        return res.status(200).send({"message": "Task added successfully", data: taskArray})
    }else{
        return res.status(400).send({"message": "Something went wrong"})
    }
})

app.put("/tasks/:id", (req, res)=>{
    let requestedId = req.params.id
    if(putInputValidator(req.body)){
        let {title, description, flag} = req.body
        taskArray.map(item => {
            if(item.id == requestedId){
                item.title = title,
                item.description = description,
                item.flag = flag
            }
        })
    }
    else{
        return res.status(400).send({"message": "Something went wrong"})
    }

    return res.status(200).send({"message": "Task updated successfully", data: taskArray})
})

app.delete("/tasks/:id", (req,res) => {
    const deletedId = req.params.id
    const newTaskArray = taskArray.filter(item => item.id != deletedId)
    taskArray = newTaskArray;
    return res.status(200).send({"message": "Task deleted successfully", data: taskArray})
})

// Helpers

const inputValidator = (req) => {
    let {id, title, description, flag} = req
    if((!id || id=="") || (!title || title == "") || (!description || description=="") || typeof flag != "boolean"){
        return false
    }
    return true
}
const putInputValidator = (req) => {
    let {id, title, description, flag} = req
    if((!title || title == "") || (!description || description=="") || typeof flag != "boolean"){
        return false
    }
    return true
}
const idValidator = (requestedId) => {
    console.log(requestedId)
    let checker = true
    taskArray.map(item => {
        if(item.id == requestedId){
            checker = false
        }
    })
    return checker
}