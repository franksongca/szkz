/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ShapesService } from '../../services/drawing/shapes.service';
import { ZiDrawingService } from '../../services/drawing/zi.drawing.service';
import { PinyinDrawingService } from '../../services/drawing/pinyin.drawing.service';

@Injectable()
export class HanziDrawingService extends createjs.Container  {
  character;
  stylesSettings;
  ziObj;
  pinyinObj;

  constructor() {
    super();
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

}
