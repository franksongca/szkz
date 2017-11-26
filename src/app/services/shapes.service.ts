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
    const circle = new createjs.Shape();

    circle.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawCircle(shapeSettings.x, shapeSettings.y, shapeSettings.r);

    this.stage.addChild(circle);
    this.stage.update();

    return circle;
  }

  createGridSquare(drwaingSettings, shapeSettings) {
    const gridSquare = new createjs.Shape();

    gridSquare.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.y, shapeSettings.w, shapeSettings.w);

    gridSquare.graphics.setStrokeDash(drwaingSettings.grid.dot);
    gridSquare.graphics.beginStroke(this.getRGB(drwaingSettings.grid.dottedLineColor));
    gridSquare.graphics.moveTo(shapeSettings.x, shapeSettings.y + shapeSettings.w / 2);
    gridSquare.graphics.lineTo(shapeSettings.x + shapeSettings.w, shapeSettings.y + shapeSettings.w / 2);
    gridSquare.graphics.moveTo(shapeSettings.x + shapeSettings.w / 2, shapeSettings.y);
    gridSquare.graphics.lineTo(shapeSettings.x + shapeSettings.w / 2, shapeSettings.y + shapeSettings.w);

    this.stage.addChild(gridSquare);
    this.stage.update();
    return gridSquare;
  }

  drawSquare(drwaingSettings, shapeSettings) {
    const square = new createjs.Shape();

    square.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.y, shapeSettings.w, shapeSettings.w);

    this.stage.addChild(square);
    this.stage.update();

    return square;
  }

  drawRect(drwaingSettings, shapeSettings) {
    const rect = new createjs.Shape();

    rect.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(this.getRGB(drwaingSettings.stroke))
      .beginFill(this.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.y, shapeSettings.w, shapeSettings.h);

    this.stage.addChild(rect);
    this.stage.update();

    return rect;
  }

  drawChineseText(config) {
    const t = new createjs.Text(config.text, config.fontSize + 'px ' + config.fontFamily, config.color);
    t.x = config.pos.x;
    t.y = config.pos.y;
    this.stage.addChild(t);
    this.stage.update();

    return t;
  }


  private getRGB(colorValue) {
    if (typeof colorValue !== 'string') {
      colorValue = createjs.Graphics.getRGB(colorValue.r, colorValue.g, colorValue.b, colorValue.a ? colorValue.a : 1);
    }
    return colorValue;
  }
}
