/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ShapesService } from '../../services/drawing/shapes.service';
@Injectable()
export class PinyinDrawingService extends createjs.Container {
  lines;
  letters;
  lettersObj;

  constructor() {
    super();
  }

  createPinyin(pinyinInfo, pinyinConfig) {
    // let lettersNum = pinyinInfo.length;

    this.letters = pinyinInfo;
    this.lines = ShapesService.createPinyinLines(pinyinConfig);

    this.addChild(this.lines);
    this.lettersObj = [];

    const margin = (pinyinConfig.size.w - this.letters.length * pinyinConfig.lineDist) / 2;
    this.letters.forEach((l, index) => {
      const py = ShapesService.createText(l.letter, {
        color: l.color,
        fontSize: pinyinConfig.fontSize,
        fontFamily: pinyinConfig.fontFamily,
        pos: {x: margin + index * pinyinConfig.lineDist, y: pinyinConfig.top}
      });
      this.lettersObj.push(py);
      this.addChild(py);
    });



  }


}
