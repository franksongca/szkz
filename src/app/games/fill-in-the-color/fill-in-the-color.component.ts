import { Component, OnInit, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { ShapesService } from './../../services/shapes.service';

@Component({
  selector: 'app-fill-in-the-color',
  templateUrl: './fill-in-the-color.component.html',
  styleUrls: ['./fill-in-the-color.component.css']
})
export class FillInTheColorComponent implements OnInit, AfterViewInit {
  @Input() gameSettings: any;

  shapesService: ShapesService;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // TODO -- start drawing
    this.shapesService = new ShapesService('gamecanvas');

    this.shapesService.drawCircle({
      stroke: 'black',
      fill: {
        r: 255,
        g: 0,
        b: 0,
        a: 0.4
      },
      thickness: 1
    }, {x: 15, y: 15, r: 15});

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
