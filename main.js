import express from "express";
const app = express();
let events = {}
app.use(express.static("public"))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())


app.post("/events",(req,res)=>{
    const id = `event_${Date.now()}_${Math.random()}`;
    const newEvent = {
        id,
        ...req.body
    }
    events[id] = newEvent
    res.send(newEvent)
})

app.get('/events/:id',(req,res)=>{
        const event = events[req.params.id];
        if(event === undefined){
            res.status(404).send('err')
        }
        else{
            res.send(event)
        }
})

app.put('/events/:id',(req,res)=>{
    const event = events[req.params.id];
    if(event === undefined){
        res.status(404).send('err')
    }
    else{
        const updateNewEvent = req.body
        events[req.params.id] = updateNewEvent
        res.send(updateNewEvent)
    }
})
app.delete('/events/:id',(req,res)=>{
    const event = events[req.params.id];
    if(event == undefined){
        res.status(404).send('err')
    }
    else{
      delete events[req.params.id]
      res.send()
    }
})
app.get('/events',(req,res)=>{
        const {type,q} = req.query
        const results = Object.values(events).filter(event => {
            if(type !== undefined && type != event.type){
                return false
            }
            if(q !== undefined && event.name.search(new RegExp(q,'i'))===-1){
                return false
            }
            return true
        })
        res.send(results)
})

app.listen(3000)