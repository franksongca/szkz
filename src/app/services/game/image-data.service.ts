import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ImageDataService {

  constructor(private http: Http) { }

  load(gameType, gameCode) {
    const url = 'assets\\imgs\\games\\' + gameType + '\\' + gameCode + '\\imgs.json' ;

    return this.http.get(url).map(response => response.json());
  }

}
