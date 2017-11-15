import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShapesService } from './services/shapes.service';

import { AppComponent } from './app.component';
import { FillInTheColorComponent } from './games/fill-in-the-color/fill-in-the-color.component';

@NgModule({
  declarations: [
    AppComponent,
    FillInTheColorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ShapesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
