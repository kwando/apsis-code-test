import angular from 'angular';
import angularAnimate from 'angular-animate';
import "./style.scss";
const BowlingAPI = require('./BowlingAPI');
const Game = require('./Game');
const scoreboardFrameDirective = require('./directives/scoreboard-frame');
const scoreboardDirective = require('./directives/scoreboard');
import MainController from './MainController';

angular.module('bowling', [angularAnimate])
  .constant('scoreService', new BowlingAPI(window.fetch))  // this should probably not be a constant..
  .directive('bwScoreboardFrame', scoreboardFrameDirective)
  .directive('bwScoreboard', scoreboardDirective)
  .factory('game', ['scoreService', Game])
  .controller('MainController', ['game', '$scope', MainController])
