import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameConfig = {
    w: 800,
    h: 300,
    backgroundColor: 'lightyellow'
  };
  stylesSettings = {
    stroke: 'gray',
    fill: 'lightyellow',
    thickness: 1
  }
}
