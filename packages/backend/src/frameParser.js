const { PIN_COUNT } = require('./bowling');

function parseFrame(rolls, isLastFrame = false){
  if(!rolls){
    throw new Error('missing frame')
  }
  const { first, second, third } = rolls;
  if(isLastFrame && first + second >= PIN_COUNT){
    return [
      assertNumeric(first), 
      assertNumeric(second), 
      assertNumeric(third) 
    ] 
  }
  
  if(first + second > PIN_COUNT && !isLastFrame){
    throw new Error(`sum of pins cannot be greater tha ${PIN_COUNT}`)
  }

  if(first === PIN_COUNT){
    return [assertNumeric(first)];
  }
  
  return [assertNumeric(first), assertNumeric(second)]
}

function assertNumeric(value) {
  if(typeof value !== 'number'){ 
    throw new Error('pin values needs to be numeric')
  }
  if(value < 0 || value > PIN_COUNT){
    throw new Error(`pin values needs to be between 0 and ${PIN_COUNT}`) 
  }
  return value;
}

module.exports = { parseFrame }
