const PIN_COUNT = 10;
const FRAME_LIMIT = 10;

class Frame{
  constructor(number){
    this.number = number;
    this.remainingPins = PIN_COUNT;
    this.rolls = [];
  }

  addRoll(pins){
    if(!this.isDone()){
      this.remainingPins -= pins;
    }

    if(!this.scoreFinalized()){
      this.rolls.push(pins);
    }

    return this;
  }

  isDone(){
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
    return this.rolls.reduce((sum, pins)=> sum + pins, 0)
  }

  scoreFinalized(){
    return this.rolls.length === (this.isOpen() ? 2 : 3);
  }

  toString(){
    if(this.isStrike()){
      return 'X';
    }
    if(this.isSpare()){
      return `${this.rolls[0]}/`
    }
    if(!this.scoreFinalized()){
      return '?';
    }
    return `${this.rolls[0]}${this.rolls[1]}`
  }
}

class Game{
  constructor(){
    this.frames = [new Frame(1)];
  }

  addRoll(pins){
    if(this.isDone()){
      throw new Error('game has ended');
    }
    const lastFrame = this.frames[this.frames.length - 1];
    if(pins > lastFrame.remainingPins){
      throw new Error(`invalid roll, cannot roll ${pins} when there is only ${lastFrame.remainingPins} pins left`)
    }
    this.frames.forEach(frame => frame.addRoll(pins))

    if(lastFrame.isDone() && !this.isDone()){
      this.frames.push(new Frame(lastFrame.number + 1));
    }

    return this;
  }

  isDone(){
    return this.frames.length >= FRAME_LIMIT && this.frames[FRAME_LIMIT-1].scoreFinalized()
  }

  totalScore(){
    let score = 0;
    for(var i = 0; i < this.frames.length && i < FRAME_LIMIT; i++){
      score += this.frames[i].score(); 
    }
    return score;
  }

  toString(){
    const frameScores = this.gameFrames().map(frame => frame.score());
    const accumlatedScores = accumlatedSum(frameScores);
    console.log({
      frameScores,
      accumlatedScores
    })
    return this.frames.map(frame => frame.toString()).join(" ");
  }

  gameFrames(){
    return this.frames.slice(0, FRAME_LIMIT);
  }
}

function accumlatedSum(seq){
  const result = seq.reduce((acc, value) => {
    acc.push(acc[acc.length - 1] + value)
    return acc
  }, [0])
  result.shift();
  return result;
}
module.exports = { Game, Frame }