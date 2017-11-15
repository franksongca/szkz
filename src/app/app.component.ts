import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameConfig = {
    w: 600,
    h: 200,
    backgroundColor: 'lightyellow'
  };
  stylesSettings = {
    lineColor: 'gray',
    fillColor: 'lightyellow',
    opcity: 0.4
  }
}
