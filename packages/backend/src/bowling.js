const PIN_COUNT = 10;
const FRAME_LIMIT = 10;

class Frame{
  constructor(number, previousFrame){
    this.number = number;
    this.remainingPins = PIN_COUNT;
    this.rolls = [];
    this.previousFrame = previousFrame;
  }

  addRoll(knockedDownPins){
    if(knockedDownPins < 0){
      throw new Error(`pin count cannot be negative ${this.number}`)
    }
    if(!this.isComplete()){
      if(knockedDownPins > this.remainingPins){
        throw new Error(`pin count greater than remaining pins in ${this.number}`)
      }
      this.remainingPins -= knockedDownPins;
    }

    if(!this.isScorable()){
      this.rolls.push(knockedDownPins);
    }

    return this;
  }

  isComplete(){
    return this.remainingPins === 0 || this.rolls.length >= 2
  }

  isStrike(){
    return this.rolls[0] === PIN_COUNT;
  }

  isSpare(){
    return !this.isStrike() && this.remainingPins === 0;
  }

  isOpen(){
    return this.remainingPins !== 0 && this.rolls.length === 2
  }

  score(){
    if(!this.isScorable()){
      throw new Error(`frame ${this.number} is not scorable`);
    }
    return this.rolls.reduce((sum, pins)=> sum + pins, 0)
  }

  isScorable(){
    const rollsNeededForScoring = this.isOpen() ? 2 : 3
    return this.rolls.length === rollsNeededForScoring;
  }
}

class Game{
  constructor(){
    this.frames = [new Frame(1)];
  }

  addRoll(knockedDownPins){
    if(this.hasEnded()){
      throw new Error('game has ended');
    }
    const currentFrameIndex = this.frames.length - 1;
    const currentFrame = this.frames[currentFrameIndex];

    // distributing rolls backwards is important because last frame is validating knockedDownPins
    for(let i = currentFrameIndex; i >= 0; i--){
      this.frames[i].addRoll(knockedDownPins);
    }

    if(currentFrame.isComplete() && !this.hasEnded()){
      this.frames.push(new Frame(currentFrame.number + 1));
    }

    return this;
  }

  hasEnded(){
    return this.frames.length >= FRAME_LIMIT && this.frames[FRAME_LIMIT-1].isScorable();
  }

  currentScore(){
    let score = 0;
    for(var i = 0; i < this.frames.length && i < FRAME_LIMIT; i++){
      const frame = this.frames[i];
      if(frame.isScorable()){
        score += frame.score();
      }
    }
    return score;
  }

  finalScore(){
    if(!this.hasEnded()){
      throw new Error('game has not ended')
    }
    return this.currentScore();
  }
}

module.exports = { Frame, Game, PIN_COUNT, FRAME_LIMIT }
