/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Injectable } from '@angular/core';
import * as createjs from 'createjs-module';
import { ProcessInterface, DeviceTimerService } from './../../services/device-timer.service';

@Injectable()
export class DrawingService {

  constructor() {
  }

  static createCircle(drwaingSettings, shapeSettings) {
    const circle = new createjs.Shape();

    circle.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawCircle(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.r);

    return circle;
  }

  static createGridSquare(drwaingSettings, shapeSettings) {
    const gridSquare = new createjs.Shape();

    gridSquare.graphics.setStrokeStyle(drwaingSettings.zi.grid.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.zi.grid.hzBoxBorder))
      .beginFill(DrawingService.getRGB(drwaingSettings.zi.grid.fill))
      .drawRect(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.w);

    gridSquare.graphics.setStrokeDash(drwaingSettings.zi.grid.dot);
    gridSquare.graphics.beginStroke(DrawingService.getRGB(drwaingSettings.zi.grid.dottedLineColor));
    gridSquare.graphics.moveTo(shapeSettings.pos.x, shapeSettings.pos.y + shapeSettings.size.w / 2);
    gridSquare.graphics.lineTo(shapeSettings.pos.x + shapeSettings.size.w, shapeSettings.pos.y + shapeSettings.size.w / 2);
    gridSquare.graphics.moveTo(shapeSettings.pos.x + shapeSettings.size.w / 2, shapeSettings.pos.y);
    gridSquare.graphics.lineTo(shapeSettings.pos.x + shapeSettings.size.w / 2, shapeSettings.pos.y + shapeSettings.size.w);

    return gridSquare;
  }

  static createSquare(drwaingSettings, shapeSettings) {
    const square = new createjs.Shape();

    square.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.w);

    return square;
  }

  static createRect(drwaingSettings, shapeSettings) {
    const rect = new createjs.Shape();

    rect.graphics.setStrokeStyle(drwaingSettings.thickness)
      .beginStroke(DrawingService.getRGB(drwaingSettings.stroke))
      .beginFill(DrawingService.getRGB(drwaingSettings.fill))
      .drawRect(shapeSettings.pos.x, shapeSettings.pos.y, shapeSettings.size.w, shapeSettings.size.h);

    return rect;
  }

  static createText(text: string, config: any) {
    const t = new createjs.Text(text, config.fontSize + 'px ' + config.fontFamily, config.color);
    t.x = config.pos ? config.pos.x : 0;
    t.y = config.pos ? config.pos.y : 0;

    return t;
  }

  static createPinyinLines(linesConfig) {
    const lines = new createjs.Shape();
    let line = 0;

    lines.graphics.beginStroke(DrawingService.getRGB(linesConfig.stroke));
    lines.graphics.setStrokeStyle(linesConfig.thickness);
    while (line < 4) {
      lines.graphics.moveTo(0, line * linesConfig.lineDist);
      lines.graphics.lineTo(linesConfig.size.w, line * linesConfig.lineDist);
      line ++;
    }

    return lines;
  }

  static createLines(linesData, linesConfig) {
    const lines = new createjs.Shape();

    lines.graphics.beginStroke(DrawingService.getRGB(linesConfig.stroke));
    lines.graphics.setStrokeStyle(linesConfig.thickness);
    linesData.forEach((line, index) => {
      lines.graphics.moveTo(line.start.x, line.start.y);
      lines.graphics.lineTo(line.end.x, line.end.y);
    });

    return lines;
  }

  static createBitmap(options) {
    const img = new Image();
    img.src = options.data;
    const btm = new createjs.Bitmap(img);
    btm.cursor = options.cursor ? options.cursor : 'default';
    btm.scaleX = btm.scaleY = options.scale ? options.scale : 1;

    return btm;
  }

  // static createPenBrash(options) {
  //   const c = new createjs.Shape();
  //   c.graphics.beginFill(options.fill);
  //   c.graphics.beginStroke(options.stroke);
  //   c.graphics.moveTo(10, 0);
  //   c.graphics.quadraticCurveTo(4, 40, 18, 60);
  //   c.graphics.quadraticCurveTo(36, 40, 26, 0);
  //   c.graphics.lineTo(10, 0);
  //
  //   return c;
  // }

  static createPenBrash(options) {
    const d = new createjs.Shape();
    d.graphics.setStrokeStyle(0)
      .beginStroke(DrawingService.getRGB('green'))
      .beginFill(DrawingService.getRGB('green'))
      .drawRect(0, 0, 32, 72);
    d.x = 6;
    d.y = 0;
    const c = new createjs.Shape();
    c.graphics.beginFill('black');
    c.graphics.beginStroke('black');
    c.graphics.moveTo(10, 0);
    c.graphics.quadraticCurveTo(4, 40, 18, 60);
    c.graphics.quadraticCurveTo(36, 40, 26, 0);
    c.graphics.lineTo(10, 0);

    c.scaleX = 0.9;
    c.scaleY = 1.2;
    d.mask = c;
    return d;
  }



  // make sure bitmap is rendering
  static updateStage(stage) {
    const process: ProcessInterface = {
      renderFunc: () => {
        stage.update();
      },
      totalLoops: 3,
      interval: 3
    };

    DeviceTimerService.register(process);
  }

  private static getRGB(colorValue) {
    if (typeof colorValue !== 'string') {
      colorValue = createjs.Graphics.getRGB(colorValue.r, colorValue.g, colorValue.b, colorValue.a ? colorValue.a : 1);
    }
    return colorValue;
  }
}
