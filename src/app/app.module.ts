import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { CommonService } from './services/common.service'
import { ServicesManagerService } from './services/services-manager.service';

import { ShapesService } from './services/drawing/shapes.service';
import { ZiDrawingService } from './services/drawing/zi.drawing.service';
import { PinyinDrawingService } from './services/drawing/pinyin.drawing.service';
import { HanziDrawingService } from './services/drawing/hanzi.drawing.service';

import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { PinyinService } from './services/sz/pinyin.service';
import { AppComponent } from './app.component';
import { FillInTheColorComponent } from './games/fill-in-the-color/fill-in-the-color.component';

@NgModule({
  declarations: [
    AppComponent,
    FillInTheColorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    CommonService,
    ServicesManagerService,
    ShapesService,
    ZiDrawingService,
    PinyinDrawingService,
    HanziDrawingService,
    ArticleListService,
    ArticleService,
    PinyinService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
