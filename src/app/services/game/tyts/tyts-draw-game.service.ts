import { Injectable, Inject, Optional } from '@angular/core';
import { DrawingService } from './../../drawing/drawing.service';

@Injectable()
export class TytsDrawGameService {
  images = [];

  constructor(@Inject('stage') @Optional() public stage?: any, @Inject('imgs') @Optional() public imgs?: any, @Inject('scale') @Optional() public scale?: Number) {
    const a = scale;
  }

  drawImages() {
    const keys = Object.keys(this.imgs);
    keys.forEach((key) => {
      const img = DrawingService.createBitmap({data: this.imgs[key].data, scale: this.scale, cursor: key === 'lines' ? 'default' : 'pointer'});

      if (key !== 'lines') {
        img.x = this.imgs[key].pos.x;
        img.y = this.imgs[key].pos.y;
      }
      //this.stage.addChild(img);
      this.images.push(img);
    });

    this.images[10].x = 168;
    this.images[10].y = 358;
    this.stage.addChild(this.images[10]);
    this.stage.addChild(this.images[0]);
    this.stage.update();
  }
}
