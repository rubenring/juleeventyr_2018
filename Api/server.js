const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const cors = require('cors');
const hentSvar = require('./Utils/Answers.js')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = monk("mongodb://user:user98@ds123584.mlab.com:23584/juleeventyr_2018");

const totalAnswer = '';
const users = db.get('Users');
const respSuccessModel = (level, totalAnswer, username, answer, toLowLevel = false) => ({
  level,
  totalAnswer,
  username,
  answer,
  toLowLevel
});

const HentSvar = (rom) => {
    return 42;
}

const findUser = (username) => {
  if(username && typeof username !== undefined && username !== "undefined"){
    return users.findOne({username}).then((doc) => {
      console.log(doc);
      if(doc !== null){
        return doc;
      }
    })
  }

  return {};
}

const UpdateProgress = (user, room) => {
  var progress = user.progress;
  switch(room){
    case 1:
      progress.room1 = true;
      break;
    case 2:
      progress.room2 = true;
      break;
    case 3:
      progress.room3 = true;
      break;
    case 4:
      progress.room4 = true;
      break;
  }

  return users.update({ username: user.username }, { $set: {progress} });
}

const CreateErrorMessage = () => {
  return {"message": "Invalid username"};
}

app.post('/api/users', (req, res, next) => {
  const username = req.params.username;
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  /* check if user excists in db, if user do exist return */
  findUser(username)
    .then(user => {
      user.username ? 
      res.send({"hasUsername": true, "username": user.username, "level": user.level}) :
      users.insert({ username, level: 1 })
      .then(x => res.send({"hasUsername": true, "username": username}))
    });
});

app.get('/api/users/:username/progress', (req, res) => {
  const username = req.params.username; 
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  findUser(username)
    .then(user => {
        res.send(!user ? CreateErrorMessage() : user.progress);
        return;
    });
});

app.post('/api/users/:username/answers', (req, res, next) => {
  const username = req.params.username;
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  const body = req.body;
  console.log(body.answer)
  if (body.answer == 42){
    console.log('er INNE!')
    findUser(username)
      .then(user => {
        console.log(user);
        console.log('inne i FIND USER');
        if (!user){
          throw new Error('Invalid username');
        }

        UpdateProgress(user, body.room)
        .then(() => {
          console.log('Have updated')
          res.send({"message": "Progress updated"})
          return;
        });
    }).catch((x) => {
      res.send(CreateErrorMessage());
      return;
    });
  } else{
    res.send({"message": "Answer not correct"});
    return;
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
})

app.listen(port, () => {
  db.then(() => {
    console.log('Connected correctly to mongo db')
  })
  console.log(`Listening on port ${port}`)
});
