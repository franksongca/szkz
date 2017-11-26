import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { ShapesService } from './../../services/shapes.service';

@Component({
  selector: 'app-fill-in-the-color',
  templateUrl: './fill-in-the-color.component.html',
  styleUrls: ['./fill-in-the-color.component.css']
})
export class FillInTheColorComponent implements OnInit, AfterViewInit {
  @Input() gameSettings: any;
  @Input() stylesSettings: any;

  shapesService: ShapesService;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // TODO -- start drawing
    this.shapesService = new ShapesService('gamecanvas');

    this.shapesService.drawCircle(this.stylesSettings, {x: 15, y: 15, r: 15});
    this.shapesService.drawSquare(this.stylesSettings, {x: 25, y: 25, w: 20});
    // this.shapesService.drawRect(this.stylesSettings, {x: 50, y: 50, w: 50, h: 50});

    this.shapesService.createGridSquare(this.stylesSettings, {x: 50, y: 50, w: 50, h: 50});


    this.shapesService.drawChineseText({text: '三字经：人之初，性本善', fontSize: 25, fontFamily: '楷体', color: 'green', pos: {x: 35, y: 35}});

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
