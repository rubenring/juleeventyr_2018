const svarArray = [
  {
    id: 1,
    value: '2'
  },
  {
    id: 2,
    value: '5'
  },  {
    id: 3,
    value: '1'
  },
  {
    id: 4,
    value: '3'
  },
  {
    id: 5,
    value: '4'
  },
  {
    id: 6,
    value: '6'
  },
  {
    id: 7,
    value: '6'
  },
  {
    id: 8,
    value: '3'
  },  
  {
    id: 9,
    value: '2'
  },
  {
    id: 10,
    value: '4'
  },
  {
    id: 11,
    value: '1'
  },
  {
    id: 12,
    value: '5'
  },
  {
    id: 13,
    value: '1'
  },
  {
    id: 14,
    value: '4'
  },  {
    id: 15,
    value: '6'
  },
  {
    id: 16,
    value: '5'
  },
  {
    id: 17,
    value: '2'
  },
  {
    id: 18,
    value: '3'
  },
  {
    id: 19,
    value: '5'
  },
  {
    id: 20,
    value: '6'
  },  {
    id: 21,
    value: '4'
  },
  {
    id: 22,
    value: '1'
  },
  {
    id: 23,
    value: '3'
  },
  {
    id: 24,
    value: '2'
  },
  {
    id: 25,
    value: '4'
  },
  {
    id: 26,
    value: '2'
  },  {
    id: 27,
    value: '3'
  },
  {
    id: 28,
    value: '6'
  },
  {
    id: 29,
    value: '5'
  },
  {
    id: 30,
    value: '1'
  },
  {
    id: 31,
    value: '3'
  },
  {
    id: 32,
    value: '1'
  },  {
    id: 33,
    value: '5'
  },
  {
    id: 34,
    value: '2'
  },
  {
    id: 35,
    value: '6'
  },
  {
    id: 36,
    value: '4'
  },
]

const sjekkSudukoSvar = (array) => {
  console.log(array);
  if(array && Array.isArray(array)){
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const svarObj = svarArray.find(x => x.id == element.id);
      if(svarObj.value != element.value){
        return false
      }
    }
    return true;
  }
  return false
}

module.exports = {
  sjekkSudukoSvar
}