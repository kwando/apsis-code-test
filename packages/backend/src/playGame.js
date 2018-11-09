const { Game, FRAME_LIMIT } = require('./bowling');
const { parseFrame } = require('./frameParser');
module.exports = playGame;

function playGame({ frames = [] }){
  const isFullGame = frames.length === FRAME_LIMIT;
  const game = new Game();


  for(let i = 0; i < FRAME_LIMIT && i < frames.length; i++){
    const isLastFrame = i + 1 === FRAME_LIMIT;
    const frame = frames[i];
    let rolls = []
    try{
      rolls = parseFrame(frame, isLastFrame)
      for(const roll of rolls){
        game.addRoll(roll);
      }
    }catch(error){
      return { error: `frame ${i + 1} is invalid` }
    }
  }

  if(isFullGame){
    return { score: game.finalScore() }
  }else{
    return { score: game.currentScore() }
  }
}