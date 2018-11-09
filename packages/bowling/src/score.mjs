const FRAME_LIMIT = 10;
const PIN_COUNT = 10;

function score(rolls){
  let rollIndex = 0;
  let score = 0;
  const frameScores = Array(FRAME_LIMIT);
  for(var frame = 1; frame <= FRAME_LIMIT; frame++){
    if(isStrike(rolls, rollIndex)){
      score += 10 + strikeBonus(rolls, rollIndex)
      rollIndex++;
    }else if(isSpare(rolls, rollIndex)){
      score += 10 + spareBonus(rolls, rollIndex);
      rollIndex += 2;
    }else{
      score += rolls[rollIndex++] + rolls[rollIndex++];
    }
    frameScores[frame-1] = score;
    console.log(`frame: ${frame}, score: ${score}`)
  }
  
  return {
    totalScore: score,
    frameScores,
  };
}

function isStrike(rolls, rollIndex) {
  return rolls[rollIndex] === PIN_COUNT
}

function strikeBonus(rolls, rollIndex) {
  return rolls[rollIndex + 1] + rolls[rollIndex + 2];
}

function isSpare(rolls, rollIndex) {
  return rolls[rollIndex] + rolls[rollIndex + 1] === PIN_COUNT;
}

function spareBonus(rolls, rollIndex) {
  return rolls[rollIndex + 1];
}

function isScorable(rolls, rollIndex = 0) {
  const remainingRolls = rolls.length - rollIndex;
  const strike = isStrike(rolls, rollIndex);
  const spare = isSpare(rolls, rollIndex);

  return remainingRolls === 0
  || strike && remainingRolls >= 3
  || spare && remainingRolls >= 2
  || !strike && !spare && remainingRolls >= 2
}

module.exports = { score, isScorable }