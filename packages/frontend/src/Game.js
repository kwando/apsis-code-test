const FRAME_LIMIT = 10;
const PIN_COUNT = 10;

class Game{
  constructor(scoreService){
    this.scoreService = scoreService;
    this.reset();
  }

  async playRound({ first, second, third }){
    if(this.isLoading){
      throw new Error('cannot play while the game is scoring');
    }
    this.isLoading = true;
    const newFrame = this.isLastFrame ? { first, second, third } : { first, second };
    try{
      const updatedScore = await this.scoreService.score([...this.frames.map(f => f.throws), newFrame]);
      this.currentScore = updatedScore;
      this.frames.push(decorateFrame(newFrame, this.currentRound));
      this.currentRound++;
      this.isLastFrame = this.frames.length === FRAME_LIMIT - 1;
      this.hasEnded = this.frames.length >= FRAME_LIMIT;
    }finally{
      this.isLoading = false;
    }
  }

  reset(){
    this.frames = [];
    this.currentScore = 0;
    this.currentRound = 1;
    this.hasEnded = false;
    this.isLastFrame = false;
    this.isLoading = false;
  }
}

function decorateFrame(frame, number){
  const isStrike = frame.first === PIN_COUNT;
  const isSpare = !isStrike && frame.first + frame.second === PIN_COUNT;
  const isOpen  = !isStrike && !isSpare;

  return { throws: frame, isOpen, isStrike, isSpare, number }
}

module.exports = Game;
