const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const cors = require('cors');
const answers = require('./Util/Answers');
const konstants = require('./Util/Konstants.js');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = monk("mongodb://user:user98@ds123584.mlab.com:23584/juleeventyr_2018");
const users = db.get('Users');

const findUser = (username) => {
  console.log(username);
  if(username && typeof username !== undefined && username !== "undefined"){
    return users.findOne({username}).then((doc) => {
      if(doc !== null){
        return doc;
      }
    })
  }

  return {};
}

const UpdateProgress = (user, room, answer) => {
  var progress = user.progress;
  switch(room){
    case konstants.rooms.BOTTEKOTT:
      progress.room1 = {
        completed: true,
        answer
      };
      break;
    case konstants.rooms.VAKTBU:
      progress.room2 = {
        completed: true,
        answer
      };
      break;
    case konstants.rooms.KJELLER:
      progress.room3 = {
        completed: true,
        answer
      };
      break;
    case konstants.rooms.TOALETT:
      progress.room4 = {
        completed: true,
        answer
      };
      break;
  }

  return users.update({ username: user.username }, { $set: {progress} });
}

const checkAnswer = (answer, room) => {
    return answers.checkAnswers(answer, room);
}

const CreateErrorMessage = (message = 'Bad request') => {
  return {
    message,
    hasUsername: false,
    username: ''
  };
}
app.use('/api/users/:username/*', (req, res, next) => {
  const username = req.params.username;
  console.log(username);
  if(!username){
    res.status(400).send(CreateErrorMessage('No username in request')); 
  }else if(username){
    findUser(username)
      .then(user => {
          if(user && user.username){
            next();
          }else{
            res.status(400).send(CreateErrorMessage('Username dont exist'));   
          }
      }).catch(x => {
        res.status(500).send(x);
        console.log(x);
      });
  }else{
    next();
  }
})

app.post('/api/users/:username/', (req, res, next) => {
  const username = req.params.username;
  if(typeof username === undefined || !username){
    res.send({"hasUsername": false, username: ''});
    return;
  }
  /* check if user excists in db, if user do exist return */
  findUser(username)
    .then(user => {
      user && user.username ? 
      res.send({"hasUsername": true, "username": user.username, "level": user.level}) :
      users.insert({ username, progress: {
          room1: {
            completed: false,
            answer: ''
          },
          room2: {
            completed: false,
            answer: ''
          },
          room3: {
            completed: false,
            answer: ''
          },
          room4: {
            completed: false,
            answer: ''
          }
        } 
      })
      .then(x => res.send({"hasUsername": true, "username": username}))
      .catch(err => next(err));
    });
});

app.get('/api/users/:username/progress', (req, res, next) => {
  const username = req.params.username;
  findUser(username)
    .then(user => {
        res.send(!user ? CreateErrorMessage() : user.progress);
    }).catch(err => {
      next(err);
    });
});

app.get('/api/users/:username/levels/next', (req, res) => {
  const username = req.params.username;
  findUser(username)
    .then(user => {
      res.status(200).send(getNextLevel(user));
    }).catch(err => {
      res.status(500).send(CreateErrorMessage());
    });
});

const getNextLevel = (user) => {
  if (hasCompleted(user)) {
    return {
      completed: true,
      url: 'www.vg.no?username='+user.username,
    };
  } else {
    return {
      completed: false,
      url: '',
    };
  };
};

const hasCompleted = (user) => {
  return _.every(user.progress, (x) => {
    return x.completed;
  });
}

app.post('/api/users/:username/answers', (req, res, next) => {
  const { answer, room } = req.body;
  const username = req.params.username;
  if (answer && room && checkAnswer(answer, room)){
    const updatedAnswer = answers.getAnswer(room);
    findUser(username)
      .then(user => {
        if (!user){
          throw new Error('Invalid username');
        }

        UpdateProgress(user, room, updatedAnswer)
        .then(() => {
          res.status(200).send({success: true})
          return;
        })
        .catch(x => {
          console.log(x);
        });
    }).catch((x) => {
      res.status(500).send(CreateErrorMessage());
      return;
    });
  } else{
    res.status(400).send({"message": "Answer not correct"});
    return;
  }
});


app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
})

app.listen(port, () => {
  db.then(() => {
    console.log('Connected correctly to mongo db')
  }).catch(x => {
    console.log(x);
  })
  console.log(`Listening on port ${port}`)
});
