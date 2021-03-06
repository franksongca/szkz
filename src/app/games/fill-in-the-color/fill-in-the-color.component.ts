/// <reference path="../../../../node_modules/createjs-module/createjs.d.ts" />
import { Component, OnInit, Input, AfterViewInit, OnChanges, EventEmitter } from '@angular/core';
import { ImageDataService } from './../../services/game/image-data.service';
import { DrawingService } from './../../services/drawing/drawing.service';

import { TytsDrawGameService } from './../../services/game/tyts/tyts-draw-game.service';

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
export class FillInTheColorComponent implements OnInit, OnChanges, AfterViewInit {
  static GameType = 'tyts';
  @Input() gameSettings: any;
  @Input() stylesSettings: any;
  @Input() gameCode: string;

  stage;
  gameImagesInfo;

  constructor(private imageDataService: ImageDataService, private tytsDrawGameService: TytsDrawGameService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // TODO -- start drawing
    this.stage = new createjs.Stage('gamecanvas');
    this.stage.enableMouseOver(10);
    this.stage.mouseEnabled = true;
    this.stage.on('mousedown', (e) => {
      console.log(e.stageX + ':' + e.stageY);
    });


    // this.stage.addChild(DrawingService.createRect({thickness: 1,
    //   stroke: 'black',
    //   fill: 'white'}, {pos: {x: 0, y: 0}, size: {w: 800, h: 600}}));


    const hz = {'hanZi': '人', 'shengDiao': '2', 'pinYin': 'ren', 'characterIndex': 'character-1', 'ori_id': '649', 'mistakes': '0', 'times': '0', 'index': '0',
      'pinyinObj': [{'letter': 'r', 'color': 'blue', 'type': 's', 'originalLetter': 'r', 'read': 'r'},
        {'letter': 'é', 'color': '#990000', 'type': 'yt', 'originalLetter': 'e', 'read': 'en'},
        {'letter': 'n', 'color': '#990000', 'type': 'y', 'originalLetter': 'n', 'read': 'en'}]};
    const hzDrawing = new HanziDrawingService();

    hzDrawing.createHanzi(hz, this.stylesSettings);
    this.stage.addChild(hzDrawing);



    const img = DrawingService.createBitmap({data: './assets/imgs/loading.gif', scale: 1, cursor: 'pointer'});
    this.stage.addChild(img);
    this.stage.update();


    // the stage.update makes drawing bitmap works!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    hzDrawing.ziColorFlicking(this.stage, ['purple', 'white', 'darkred'], 20, 20);





  }

  ngOnChanges(changes) {

    if (changes.gameCode && changes.gameCode.previousValue !== changes.gameCode.currentValue) {
      this.imageDataService.load(FillInTheColorComponent.GameType, this.gameCode).subscribe(
        (response) => {
          this.gameImagesInfo = response;

          this.tytsDrawGameService = new TytsDrawGameService(this.stage, response, 0.7);
          this.tytsDrawGameService.drawImages();
        },
        () => console.log('error occurs when loading images of [' + FillInTheColorComponent.GameType + '][' + this.gameCode + ']')
      );
    }
  }


}
