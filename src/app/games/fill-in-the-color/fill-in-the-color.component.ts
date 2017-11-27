/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
// import { ShapesService } from './../../services/drawing/shapes.service';
// import { ZiDrawingService } from '../../services/drawing/zi.drawing.service';
// import { PinyinDrawingService } from './../../services/drawing/pinyin.drawing.service';
// import { PinyinService } from './../../services/sz/pinyin.service';
import { HanziDrawingService } from './../../services/drawing/hanzi.drawing.service';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-fill-in-the-color',
  templateUrl: './fill-in-the-color.component.html',
  styleUrls: ['./fill-in-the-color.component.css']
})
export class FillInTheColorComponent implements OnInit, AfterViewInit {
  @Input() gameSettings: any;
  @Input() stylesSettings: any;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // TODO -- start drawing
    const stage = new createjs.Stage('gamecanvas');

    const hz = {'hanZi': '人', 'shengDiao': '2', 'pinYin': 'ren', 'characterIndex': 'character-1', 'ori_id': '649', 'mistakes': '0', 'times': '0', 'index': '0',
      'pinyinObj': [{'letter': 'r', 'color': 'blue', 'type': 's', 'originalLetter': 'r', 'read': 'r'},
        {'letter': 'é', 'color': '#990000', 'type': 'yt', 'originalLetter': 'e', 'read': 'en'},
        {'letter': 'n', 'color': '#990000', 'type': 'y', 'originalLetter': 'n', 'read': 'en'}]};
    const hzDrawing = new HanziDrawingService();

    hzDrawing.createHanzi(hz, this.stylesSettings);
    stage.addChild(hzDrawing);
    stage.update();

    // window.setTimeout(() => {
    //   hzDrawing.changeZiColor('red');
    //   //hzDrawing.changeShengMuColor('black');
    //   //hzDrawing.changeYunMuColor('black');
    //
    //   stage.update();
    // }, 1000);


    hzDrawing.ziColorFlicking(stage, ['blue', 'white'], 20, 23);

    // const shape1 = ShapesService.createCircle(this.stylesSettings, {pos: {x: 15, y: 15}, r: 15});
    // const shape2 = ShapesService.createSquare(this.stylesSettings, {pos: {x: 25, y: 25}, size: {w: 20}});
    // this.shapesService.drawRect(this.stylesSettings, {x: 50, y: 50, w: 50, h: 50});

    // const shape3 = ShapesService.createGridSquare(this.stylesSettings, {pos: {x: 50, y: 50}, size: {w: 50, h: 50}});

    // stage.addChild(shape1);
    // stage.update();

    // const hz = new ZiDrawingService();
    // hz.createHz('人', {size: {w: this.stylesSettings.width}, font: {color: this.stylesSettings.hzColor, fontFamily: '楷体'}, drawingSettings: this.stylesSettings});
    //
    // hz.x = 100;
    // hz.y = 100;
    // stage.addChild(hz);
    // stage.update();
    //
    //
    // // const lines = ShapesService.createPinyinLines({
    // //   lineDist: 8,
    // //   stroke: 'black',
    // //   thickness: 0.2,
    // //   size: {w: 50}
    // // });
    // // lines.x = 100;
    // // lines.y = 64;
    // // stage.addChild(lines);
    // // stage.update();
    //
    // const pinyinDrawing = new PinyinDrawingService();
    //
    // const py = PinyinService.buildPinYin({
    //   pinyin: 'zhong',
    //   tone: 3,
    //   shengMuColor: this.stylesSettings.pinyinOptions.shengMuColor,
    //   yunMuColor: this.stylesSettings.pinyinOptions.yunMuColor
    // });
    //
    // pinyinDrawing.createPinyin(py, this.stylesSettings.pinyinOptions);
    //
    // pinyinDrawing.x = 100;
    // pinyinDrawing.y = 35;
    //
    // stage.addChild(pinyinDrawing);
    // stage.update();



    // this.shapesService.drawChineseText({text: '三字经：人之初，性本善', fontSize: 25, fontFamily: '楷体', color: 'green', pos: {x: 35, y: 35}});

    // var stage = new createjs.Stage("gamecanvas");
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 15);
    // circle.x = 15;
    // circle.y = 15;
    // stage.addChild(circle);
    //
    // stage.update();

    // createjs.Tween.get(circle, { loop: true })
    //   .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    //   .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ alpha: 0, y: 225 }, 100)
    //   .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    //   .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    //
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", stage);




  }


}
