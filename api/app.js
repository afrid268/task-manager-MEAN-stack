const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

const bodyParser = require('body-parser');


//load in mongoose models
const { List,Task } = require('./db/models');


app.use(bodyParser.json());

//cors middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/*List Routes*/
app.get('/lists',(req,res) => {
    List.find({}).then((lists)=>{
        res.send(lists)
    })
})

app.post('/lists',(req,res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
        res.send(listDoc)
    })
});

app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate({ _id: req.params.id} , {
        $set : req.body
    }).then(()=>{
        res.sendStatus(200);
    });
})

app.delete('/lists/:id',(req,res)=>{
    List.findOneAndDelete({ _id: req.params.id})
    .then((removedList)=>{
        res.send(removedList);
    }); 
})

/*Task Routes*/
app.get('/lists/:listId/tasks',(req,res) => {
    Task.find({
        _listId : req.params.listId
    }).then((tasks)=>{
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks',(req,res)=>{

    let newTask = new Task({
        title : req.body.title,
        _listId : req.params.listId
    });
    newTask.save().then((taskDoc)=>{
        res.send(taskDoc)
    })
});

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({ _id: req.params.taskId , _listId : req.params.listId} , {
        $set : req.body
    }).then(()=>{
        res.sendStatus(200);
    });
})

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndDelete({ _id: req.params.taskId , _listId : req.params.listId})
    .then((removedTask)=>{
        res.send(removedTask);
    }); 
})


app.listen(3000,() => {
    console.log('the server is listening to port 3000')
})