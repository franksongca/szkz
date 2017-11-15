/// <reference path="../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';

@Injectable()
export class ShapesService {
  stage;

  constructor(canvasId: string) {
    this.stage = new createjs.Stage(canvasId);



  }

  drawCircle(drwaingSettings, shapeSettings) {
    let circle = new createjs.Shape();
    let fill;

    circle.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawCircle(shapeSettings.x, shapeSettings.y, shapeSettings.r);

    this.stage.addChild(circle);
    this.stage.update();
  }

  drawSquare(drwaingSettings, shapeSettings) {

  }

  private getRGB(colorVar) {
    if (typeof colorVar !== 'string') {
      colorVar = createjs.Graphics.getRGB(colorVar.r, colorVar.g, colorVar.b, colorVar.a ? colorVar.a : 1);
    }
    return colorVar;
  }
}
