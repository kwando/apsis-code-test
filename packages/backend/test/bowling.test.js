const { Frame, Game } = require('../src/bowling');
const { strictEqual, throws } = require('assert');

describe('bowling', ()=>{
  describe('Frame', ()=>{
    describe('empty frame', ()=>{
      const emptyFrame = buildFrame();
      it('should not be scorable', ()=>{
        strictEqual(false, emptyFrame.isScorable())    
      })
      it('should not be complete', ()=>{
        strictEqual(false, emptyFrame.isComplete())    
      })
      it('should be a strike', ()=>{
        strictEqual(false, emptyFrame.isStrike())    
      })
      it('should not be a spare', ()=>{
        strictEqual(false, emptyFrame.isSpare())    
      })
      it('should not be a open', ()=>{
        strictEqual(false, emptyFrame.isOpen())    
      })
    })
    describe('strike frame', ()=>{
      const strikeFrame = buildFrame(10);
      it('should be a strike', ()=>{
        strictEqual(true, strikeFrame.isStrike())
      })
      it('should not be a spare', ()=>{
        strictEqual(false, strikeFrame.isSpare())
      })
      it('should not be open', ()=>{
        strictEqual(false, strikeFrame.isOpen())
      })
      it('should be complete', ()=>{
        strictEqual(true, strikeFrame.isComplete());
      })
      it('requires 3 rolls to be scorable', ()=>{
        const frame = new Frame();
        frame.addRoll(10);
        strictEqual(false, frame.isScorable())

        frame.addRoll(10);
        strictEqual(false, frame.isScorable())

        frame.addRoll(10);
        strictEqual(true, frame.isScorable())
      })

      it('calculates score correctly', ()=>{
        strictEqual(30, buildFrame(10,10,10).score(), 'three strikes in a row')
        strictEqual(20, buildFrame(10,5,5).score())
        strictEqual(17, buildFrame(10,0,7).score())
      })
    })
    describe('spare frame', ()=>{
      const spareFrame = buildFrame(4, 6);
      it('should be a spare', ()=>{
        strictEqual(true, spareFrame.isSpare())
      })
      it('should not be a strike', ()=>{
        strictEqual(false, spareFrame.isStrike())
      })
      it('should not be a open', ()=>{
        strictEqual(false, spareFrame.isOpen())
      })
      it('should be complete', ()=>{
        strictEqual(true, spareFrame.isComplete());
      })
      it('requires 3 rolls to be scoreable', ()=>{
        const frame = buildFrame(3, 7);
        strictEqual(false, frame.isScorable())
        
        frame.addRoll(10);
        strictEqual(true, frame.isScorable())
      })
      it('calculates score correctly', ()=>{
        strictEqual(20, buildFrame(3, 7, 10).score())
        strictEqual(10, buildFrame(3, 7, 0).score())
        strictEqual(13, buildFrame(3, 7, 3).score())
      })
    })
    describe('open frame', ()=>{
      it('should be open', ()=>{
        strictEqual(true, buildFrame(4, 5).isOpen())
      })
      it('should not be a strike', ()=>{
        strictEqual(false, buildFrame(4, 5).isSpare())
      })
      it('should not be a spare', ()=>{
        strictEqual(false, buildFrame(4, 5).isStrike())
      })
      it('should be complete', ()=>{
        strictEqual(true, buildFrame(4, 3).isComplete());
      })
      it('requires 2 rolls to be scorable', ()=>{
        strictEqual(true, buildFrame(4, 5).isScorable())
      })
    })

    describe('incomplete frame', ()=>{
      const inCompleteFrame = buildFrame(6);
      it('should be open', ()=>{
        strictEqual(false, inCompleteFrame.isOpen())
      })
      it('should not be a strike', ()=>{
        strictEqual(false, inCompleteFrame.isSpare())
      })
      it('should not be a spare', ()=>{
        strictEqual(false, inCompleteFrame.isStrike())
      })
      it('should not be complete', ()=>{
        strictEqual(false, inCompleteFrame.isComplete());
      })
      it('should not be scorable', ()=>{
        strictEqual(false, inCompleteFrame.isScorable())
      })
    })

    describe('addRoll()', ()=>{
      it('should not accept invalid rolls', ()=>{
        throws(()=>{ buildFrame(11) }, 'pin sum greater than 10')
        throws(()=>{ buildFrame(-1) }, 'negative rolls')
        throws(()=>{ buildFrame(9, -1) }, 'negative rolls')
        throws(()=>{ buildFrame(5, 6) }, 'pin sum greater than 0')
      })
    })
    describe('remainingPins', ()=>{
      it('should be 0 after a strike', ()=>{
        strictEqual(0, buildFrame(10).remainingPins)
      })
      it('should be 0 after a spare', ()=>{
        strictEqual(0, buildFrame(3, 7).remainingPins)
      })
      it('should be correct in an open frame', ()=>{
        strictEqual(2, buildFrame(1, 7).remainingPins)
        strictEqual(4, buildFrame(4, 2).remainingPins)
        strictEqual(10, buildFrame(0, 0).remainingPins)
      })
      it('should be correct in a incomplete frame', ()=>{
        strictEqual(10, buildFrame(0).remainingPins)
        strictEqual(9, buildFrame(1).remainingPins)
        strictEqual(6, buildFrame(4).remainingPins)
      })
    })
  })

  describe('Game', ()=>{
    describe('new game', ()=>{
      const game = new Game();
      it('should not have ended', ()=>{
        strictEqual(false, game.hasEnded())
      })
      it('should have a currentScore of 0', ()=>{
        strictEqual(0, game.currentScore())
      })
    })
    describe('currentScore()', ()=>{
      it('should only include completed frames', ()=>{
        strictEqual(8, buildGame([5, 3, 10]).currentScore())
        strictEqual(30, buildGame([10, 10, 10]).currentScore())
        strictEqual(20, buildGame([0, 10, 10]).currentScore())
      })
    })
    describe('scoring', ()=>{
      it('should score 12 strikes as 300', ()=>{
        const game = buildGame(Array(12).fill(10));
        strictEqual(300, game.finalScore())
      })

      it('should score a roll sequence I found on the internet correctly', ()=>{
        const game = buildGame([
          5,2,
          8,2,
          1,8,
          10,
          7,3,
          2,3,
          5,4,
          4,5,
          3,2,
          4,3
        ]);
        strictEqual(94, game.finalScore())
      })
      it('should score a strike in the last frame correctly', ()=>{
        const game = buildGame([
          5,2,
          8,2,
          1,8,
          10,
          7,3,
          2,3,
          5,4,
          4,5,
          3,2,
          10,3,4
        ]);
        strictEqual(104, game.finalScore())
      })
    })
  })
})

function buildFrame(...rolls){
  const frame = new Frame();
  for(const roll of rolls){
    frame.addRoll(roll);
  }
  return frame;
}

function buildGame(rolls) {
  const game = new Game();
  for(const roll of rolls){
    game.addRoll(roll);
  }
  return game; 
}