function MainController(game, $scope){
  $scope.first = 0;
  $scope.second = 0;
  $scope.third = 0;
  $scope.game = game;

  $scope.newGame = () => {
    $scope.game.reset();
  }
  
  $scope.addScore = async function() {
    const { first, second, third } = this;

    try{
      await game.playRound({ first, second, third });

      $scope.$apply(() => {
        this.first = 0;
        this.second = 0;
        this.third = 0;
        this.error = null;
      })
    }catch(error){
      $scope.$apply(()=> this.error = error)
    }
  }
}
MainController.$inject = ['bowling/game', '$scope']
module.exports = MainController;