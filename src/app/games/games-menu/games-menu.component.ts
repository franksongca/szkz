import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageDataService } from '../../services/game/image-data.service';

@Component({
  selector: 'app-fill-in-the-color-menu',
  templateUrl: './games-menu.component.html',
  styleUrls: ['./games-menu.component.css']
})
export class GamesMenuComponent implements OnInit, OnChanges {
  gameType = 'tyts';
  gameCode = 'Pic_2';

  gameSharedData;

  constructor(private imageDataService: ImageDataService) { }

  ngOnInit() {
    this.imageDataService.loadGameSharedData(this.gameType).subscribe(
      (response) => {
        this.gameSharedData = response;
      },
      () => console.log('error occurs when loading images of [' + this.gameType + '][' + this.gameCode + ']')
    );
  }

  ngOnChanges(changes) {
  }

}
