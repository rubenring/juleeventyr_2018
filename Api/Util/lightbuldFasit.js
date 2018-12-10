const fasit = [{
  id: 1,
  on: false
}, {
  id: 2,
  on: false
}, {
  id: 3,
  on: false
}, {
  id: 4,
  on: false
}, {
  id: 5,
  on: true
}, {
  id: 6,
  on: false
}, {
  id: 7,
  on: true
}, {
  id: 8,
  on: false
}, {
  id: 9,
  on: true
}, {
  id: 10,
  on: false
}]

const sjekkLightbulbSvar = (answer) => {
  if(answer && Array.isArray(answer)){
    for (let i = 0; i < answer.length; i++) {
      const element = answer[i];
      const svarObj = fasit.find(x => x.id == element.id);
      if(svarObj.on !== element.on){
        return false
      }
    }
    return true;
  }
  return false
}

module.exports = {
  sjekkLightbulbSvar
}