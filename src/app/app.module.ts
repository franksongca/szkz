import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { CommonService } from './services/common.service'
import { ServicesManagerService } from './services/services-manager.service';

import { ShapesService } from './services/drawing/shapes.service';
import { HzService } from './services/drawing/hz.service';



import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';

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
    HzService,
    ArticleListService,
    ArticleService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
