/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { DeviceTimerService } from './../../services/device-timer.service';
import { ZiDrawingService } from './../../services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './../../services/drawing/pinyin.drawing.service';

@Injectable()
export class HanziDrawingService extends createjs.Container  {
  character;
  stylesSettings;
  ziObj;
  pinyinObj;

  constructor() {
    super();

    DeviceTimerService.init();
  }

  createHanzi(character: any, stylesSettings: any) {
    this.character = character;
    this.stylesSettings = stylesSettings;

    this.ziObj = new ZiDrawingService();
    this.ziObj.createHz(this.character.hanZi, this.stylesSettings);

    this.ziObj.x = 0;
    this.ziObj.y = this.stylesSettings.pinyinOptions.lineDist * 3 + this.stylesSettings.pinyinOptions.marginTop;

    this.pinyinObj = new PinyinDrawingService();
    this.pinyinObj.createPinyin(this.character.pinyinObj, this.stylesSettings.pinyinOptions);

    this.addChild(this.pinyinObj);
    this.addChild(this.ziObj);
  }

  changeZiColor(color) {
    this.ziObj.changeZiColor(color);
  }

  changeShengMuColor(color) {
    this.pinyinObj.changeShengMuColor(color);
  }

  changeYunMuColor(color) {
    this.pinyinObj.changeYunMuColor(color);
  }

  ziColorFlicking(stage, colors, times, interval, callback?) {
    let cIndex = 0, indexColor = 0, intervalIndex = 0, animationFrame;

    let flicking = () => {
      let c = colors[indexColor];
      this.changeZiColor(c);
      stage.update();

      if (intervalIndex++ > interval) {
        if (cIndex++ > times) {
          this.ziObj.resumeZiColor();
          stage.update();
          if (callback) {
            callback();
          }
          return;
        }
        intervalIndex = 0;
        if (indexColor++ > colors.length - 1) {
          indexColor = 0;
        }
      }

      animationFrame = DeviceTimerService.requestAnimationFrame(flicking);
    };
    animationFrame = DeviceTimerService.requestAnimationFrame(flicking);
  }


}
