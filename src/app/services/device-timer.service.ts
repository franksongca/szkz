import { Injectable } from '@angular/core';

@Injectable()
export class DeviceTimerService {
  static requestAnimationFrame: Function;
  static cancelAnimationFrame: Function;

  static init() {
    if (DeviceTimerService.requestAnimationFrame) {
      return;
    }


    let w = (<any>window);

    DeviceTimerService.requestAnimationFrame = w.requestAnimationFrame ||
      w.webkitRequestAnimationFrame ||
      w.mozRequestAnimationFrame ||
      w.oRequestAnimationFrame ||
      w.msRequestAnimationFrame;

    DeviceTimerService.cancelAnimationFrame = w.cancelAnimationFrame ||
      w.webkitCancelRequestAnimationFrame ||
      w.webkitCancelAnimationFrame ||
      w.mozCancelRequestAnimationFrame || w.mozCancelAnimationFrame ||
      w.oCancelRequestAnimationFrame || w.oCancelAnimationFrame ||
      w.msCancelRequestAnimationFrame || w.msCancelAnimationFrame;
  }

//   var animation = function(){
//   animationFrame = requestAnimationFrame(animation);
//   render();
// }
//   animationFrame = requestAnimationFrame(animation);
//   function render(){
//   counter ++;
//   $('develement').css('-webkit-transform','translate3d(-'+counter+'px, 0, 0)');

}
