const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const cors = require('cors');
const path = require('path');
const answers = require('./Util/Answers');
const konstants = require('./Util/Konstants.js');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = monk("mongodb://user:user98@ds123584.mlab.com:23584/juleeventyr_2018");
const users = db.get('Users');
const trackingUrl = "https://sommereventyrtracking.herokuapp.com/";
const headers = {
  //'Content-Type': 'application/json',
  'x-api-key': '1238912akjsldasb123123'
};

app.use(express.static(path.join(__dirname, 'frontend/build')));

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

  return users.update({ username: user.username }, { $set: {progress} })
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

app.post('/api/users/:username/test', (req, res, next) => {
  const username = req.params.username;
  const form = {
    "username": username,
    "appName": "Diehard",
    "currentLevel": 1,
    "totalLevelCount": 4,
    "data": {
      "test": "tester" 
    }
  }
  request.post({json: true, headers, url: `${trackingUrl}api/progress`, body: form}, (error, response, body) => { 

    if (!error && response && response.statusCode == 200) { 
        res.send({"hasUsername": true, "username": username})
      }else{
        console.log(error);

        next();
      }
  }); 
});
const insertUser = (username, res) => {
  const form = {
    "username": username,
  }
  request.post({json: true, headers, url: `${trackingUrl}api/create`, body: form}, (error, response, body) => { 
      if (!error && response && response.statusCode == 200) { 
        res.status(200).send({"hasUsername": true, "username": username})
      }else{
        console.info('create user error', error);
        res.send({"hasUsername": false, "username": ''})
      }
  })
}

const progress = (next,username, currentlevel) => {
  const form = {
    "username": username,
    "appName": "Diehard",
    "currentLevel": currentlevel,
    "totalLevelCount": 4,
    "data": {
      "meh": "meh",
      "ok": "ok"
    }
  }
  request.post({json: true, headers, url: `${trackingUrl}api/progress`, json: form}, (error, response, body) => { 

    if (!error && response && response.statusCode == 200) { 
        next()
      }else{
        console.log(error);
        next();
      }
  }); 
}


app.post('/api/users/:username', (req, res, next) => {
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
      .then(x => {
        insertUser(username, res)
      })
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

const hasCompleted = (user) => {
  return _.every(user.progress, (x) => {
    return x.completed;
  });
}

const getNextLevel = (user, username, res) => {
  if (hasCompleted(user)) {
    const form = {
      "username": username,
      "appName": "Diehard"
    }
    request.post({json: true, headers, url: `${trackingUrl}api/nextApp`, json: form}, (error, response, body) => { 

        if (!error && response && response.statusCode == 200) { 
            res.status(200).send({completed: true, url: body.nextAppUrl})
        }else{
          console.log(error);
          next();
        }
    }); 

  } else {
    res.status(200).send({completed: false, url: ''})
  };
};

app.get('/api/users/:username/levels/next', (req, res) => {
  const username = req.params.username;
  findUser(username)
    .then(user => {
      getNextLevel(user, username, res);
    }).catch(err => {
      res.status(500).send(CreateErrorMessage());
    });
});

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
        .then((x) => {
          findUser(username)
          .then(user => {
            if(user){  
              const count = _.filter(user.progress, (o) => { if (o.completed === true) return o }).length;
              progress(next, username, count);
            }
            res.status(200).send({success: true})   
          }).catch(err => {
            next(err);
          });
        })
        .catch(x => {
          throw new Error(x);
        });
    }).catch((x) => {
      res.status(500).send(CreateErrorMessage());
    });
  } else{
    res.status(400).send({"message": "Answer not correct"});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send(err.stack)
});


app.listen(port, () => {
  db.then(() => {
    console.log('Connected correctly to mongo db')
  }).catch(x => {
    console.log(x);
  })
  console.log(`Listening on port ${port}`)
});
