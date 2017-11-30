import { Component } from '@angular/core';
import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';
import { DeviceTimerService } from './services/device-timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameConfig = {
    w: 800,
    h: 600,
    backgroundColor: 'lightyellow'
  };
  stylesSettings = {
    zi : {
      errorFlashing: ['red', 'white'],
      successFlashing: ['green', 'white'],
      normalFlashing: ['yellow', 'blue'],
      width: 100,
      fontFamily: '楷体',
      hzColor: 'blue',
      hzPadding: 3,
      grid: {
        thickness: 1,
        hzBoxBorder: 'red',
        fill: 'yellow',
        dot: [2, 1],
        dottedLineColor: {
          r: 255,
          g: 0,
          b: 0,
          a: 0.5
        }
      },
    },
    pinyinOptions: {
      marginTop: 10,
      thickness: 0.3,
      top: 4,
      lineDist: 14,
      fontSize: 26,
      stroke: 'black',
      shengMuColor: 'red',
      yunMuColor: 'green',
      fontFamily: 'Arial',
      size: {w: 100}
    }
  };

  testing = true;

  constructor(private articleListService: ArticleListService, private articleService: ArticleService) {
    DeviceTimerService.init();

    ArticleListService.loadArticleList().subscribe((response) => {
      // test article-list.service
      if (this.testing) {
        // alert(ArticleListService.getAppName());

        this.articleService.loadArticle('kj-SZJ');
      }
    });
  }

  // loadArticle() {
  //   this.articleService.loadArticle('kj-SZJ');
  // }


}
