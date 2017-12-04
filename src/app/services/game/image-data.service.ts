import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ImageDataService {

  constructor(private http: Http) { }

  load(url) {
    return this.http.get(url).map(response => response.json());
  }

  loadTytsGameData(gameType, gameCode) {
    const url = 'assets\\imgs\\games\\' + gameType + '\\' + gameCode + '\\imgs.json' ;
    return this.load(url);
  }

  loadGameSharedData(gameType) {
    const url = 'assets\\imgs\\games\\' + gameType + '\\imgs.json' ;
    return this.load(url);
  }

}
