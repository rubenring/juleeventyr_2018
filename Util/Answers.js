const konstants = require('./Konstants.js');
const suduko = require('./sudokuFasit.js');
const lightbulbFasit = require('./lightbuldFasit.js');


const checkAnserRoom1 = (answer) => {
    return lightbulbFasit.sjekkLightbulbSvar(answer);
}
const checkAnserRoom2 = (answer) => {
  return answer && answer.toLowerCase() === 'tjue-fem';
}
const checkAnserRoom3 = (answer) => {
  return answer === '54' || answer === 54;
}
const checkAnserRoom4 = (answer) => {
  return suduko.sjekkSudukoSvar(answer);
}


module.exports = {
  checkAnswers: (answer, room) => {
    console.log(room)

    switch(room){
      case konstants.rooms.BOTTEKOTT:
        return checkAnserRoom1(answer);
      case konstants.rooms.VAKTBU:
        return checkAnserRoom2(answer);
      case konstants.rooms.KJELLER:
        return checkAnserRoom3(answer);
      case konstants.rooms.TOALETT:
        return checkAnserRoom4(answer);
      default:
        return false;
    }
  },
  getAnswer: (room) => {
    switch(room){
      case konstants.rooms.BOTTEKOTT:
        return 42;
      case konstants.rooms.VAKTBU:
        return 25;
      case konstants.rooms.KJELLER:
        return 54;
      case konstants.rooms.TOALETT:
        return 60;
      default:
        return false;
    }
  }

}