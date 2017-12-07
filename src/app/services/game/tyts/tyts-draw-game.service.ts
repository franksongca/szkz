import { Injectable, Inject, Optional } from '@angular/core';
import { DrawingService } from './../../drawing/drawing.service';

@Injectable()
export class TytsDrawGameService {
  static LINES_SCALE = 1.338;
  static IMAGE_PATH = './assets/imgs/games/';
  fillInAreaShapes = [];
  fillInLinesImg;

  // constructor(@Inject('stage') @Optional() public stage?: any, @Inject('imgs') @Optional() public imgs?: any, @Inject('scale') @Optional() public scale?: Number) {

  constructor(@Inject('options') @Optional() public options: any) {
  }

  drawImages() {
    // const keys = Object.keys(this.imgs.pieces);

    this.options.imageInfo.pieces.forEach((piece, index) => {
      const imgShape = DrawingService.createLines(piece.lines, {thickness: 1, stroke: 'white'});
      imgShape.x = this.options.pos.x + piece.pos.x * this.options.scale;
      imgShape.y = this.options.pos.y + piece.pos.y * this.options.scale;
      imgShape.scaleX = imgShape.scaleY = this.options.scale * TytsDrawGameService.LINES_SCALE;
      imgShape.cursor = 'pointer';
      this.options.stage.addChild(imgShape);
      DrawingService.updateStage();

      this.fillInAreaShapes.push({index: index, name: piece.name, shape: imgShape});
    });

    const path = TytsDrawGameService.IMAGE_PATH + this.options.type + '/' + this.options.code + '/lines' + '.png';
    const img = DrawingService.createBitmap({data: path, scale: this.options.scale, cursor: 'pointer'});

    img.x = this.options.pos.x + this.options.imageInfo.pos.x * this.options.scale;
    img.y = this.options.pos.y + this.options.imageInfo.pos.y * this.options.scale;
    img.cursor = 'default';
    this.options.stage.addChild(img);
    this.fillInLinesImg = img;

    DrawingService.updateStage();
  }
}
