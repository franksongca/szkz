import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  static clone(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }
}
