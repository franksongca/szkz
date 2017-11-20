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
    let square = new createjs.Shape();
    let fill;

    square.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.y, shapeSettings.w, shapeSettings.w);

    this.stage.addChild(square);
    this.stage.update();
  }

  drawRect(drwaingSettings, shapeSettings) {
    let rect = new createjs.Shape();
    let fill;

    rect.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.y, shapeSettings.w, shapeSettings.h);

    this.stage.addChild(rect);
    this.stage.update();
  }


  private getRGB(colorValue) {
    if (typeof colorValue !== 'string') {
      colorValue = createjs.Graphics.getRGB(colorValue.r, colorValue.g, colorValue.b, colorValue.a ? colorValue.a : 1);
    }
    return colorValue;
  }
}
