const express = require("express");
const bodyParser = require("body-parser");

const noteSchema = require("./schemas/note-schema");

const mongo = require("./mongo");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");

  
const app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Default page')
})

//get all notes 
app.get("/notes", (req, res) => {
  
  getAllNotes(res);

})

//add note
app.post("/notes", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  if(!title){
    title = "default title";
  }
  if(!content){
    content = "default content";
  }
   
   
  addNote(res, title, content);
  res.send("note added")
  

})

//get note by id
app.get("/notes/:id", function(req, res) {
  const id = req.params.id;
  if(!id){
    res.send("id cannot be null")
  }

  findOneNote(res, id)
  res.sendStatus(200);
  
})

//update note
app.put("/notes/:id/", function(req, res) {
  
  const id = req.params.id;
  const title = req.body.title
  const content = req.body.content

  if(!title){
    res.send("title cannot be null");
  }
  if(!content){
    res.send("content cannot be null");
  }
  updateNote(res, id, title, content)
  res.send("note updated")
})

//delete note by id
app.delete("/notes/:id", function(req, res) {
  id = req.params.id;
  deleteNote(res, id);
  res.send("note deleted");
  
})

//helper functions


const addNote = async (res, title, content) => {
  await mongo().then(async (mongoose) => {
    try {
      
      const note = {
        title: title,
        content: content
      };
      await new noteSchema(note).save();

    } catch{
      res.sendStatus(400);
    }finally {
      mongoose.connection.close();
    }
  });
};


const findOneNote = async (res, id) => {
  await mongo().then(async (mongoose) => {
    try {

      const result = await noteSchema.findOne({
        _id: id,
      });
      res.send(result);

    } catch{
      res.sendStatus(400);
    }finally {
      mongoose.connection.close();
    }
  });
};


const getAllNotes = async (res) => {
  var result;
  await mongo().then(async (mongoose) => {
    try {
      
      const allResult = await noteSchema.find({});
      
      result = allResult;
      
      res.send(result)
      

    } catch{
      res.sendStatus(400);
    }finally {
      
      mongoose.connection.close();
      
    }
    
  });
};

const updateNote = async (res, id, title, content) => {
  await mongo().then(async (mongoose) => {
    try {
      
      await noteSchema.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          title: title,
          content: content,
        }
      );
      
    } catch{
      res.sendStatus(400);
    }finally {
      mongoose.connection.close();
    }
  });
};


const deleteNote = async (res, id) => {
  await mongo().then(async (mongoose) => {
    try {
      

      await noteSchema.deleteOne({
        _id: id,
      });
      

    } catch{
      res.sendStatus(400);
    }finally {
      mongoose.connection.close();
    }
  });
};


app.listen(3000, function() {
	console.log("Server started on port 3000");
});

//export app for testing
module.exports=app