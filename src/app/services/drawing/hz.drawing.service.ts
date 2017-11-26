/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ShapesService } from '../../services/drawing/shapes.service';

@Injectable()
export class HzDrawingService extends createjs.Container {
  bgGridObj;
  ziObj;

  constructor() {
    super();
  }

  createHz(hzText: string, config: any) {
    const shapeSettings = {
      pos: {x: 0, y: 0},
      size: {
        w: config.size.w,
        h: config.size.w
      }
    };

    this.bgGridObj = ShapesService.createGridSquare(config.drawingSettings, shapeSettings);
    this.ziObj = ShapesService.createText(hzText, {
      pos: {x: config.drawingSettings.hzPadding, y: config.drawingSettings.hzPadding},
      fontSize: config.size.w - config.drawingSettings.hzPadding * 2,
      color: config.font.color, fontFamily: config.font.fontFamily});

    this.addChild(this.bgGridObj);
    this.addChild(this.ziObj);
  }

}
