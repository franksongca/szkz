/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ShapesService } from '../../services/drawing/shapes.service';

@Injectable()
export class ZiDrawingService extends createjs.Container {
  bgGridObj;
  ziObj;
  stylesSettings;

  constructor() {
    super();
  }

  createHz(hzText: string, stylesSettings: any) {
    this.stylesSettings = stylesSettings;
    const shapeSettings = {
      pos: {x: 0, y: 0},
      size: {
        w: this.stylesSettings.width,
        h: this.stylesSettings.width
      }
    };

    this.bgGridObj = ShapesService.createGridSquare(this.stylesSettings, shapeSettings);
    this.ziObj = ShapesService.createText(hzText, {
      pos: {x: this.stylesSettings.hzPadding, y: this.stylesSettings.hzPadding},
      fontSize: this.stylesSettings.width - this.stylesSettings.hzPadding * 2,
      color: this.stylesSettings.hzColor,
      fontFamily: this.stylesSettings.fontFamily
    });

    this.addChild(this.bgGridObj);
    this.addChild(this.ziObj);
  }

}
