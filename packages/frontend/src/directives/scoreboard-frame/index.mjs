import template from './template.html';
import "./style.scss";

export default function() {
  return {
    template,
    scope: {
      frame: '='
    }
  }
}