import { Component } from '@angular/core';
import { ArticleListService } from './services/sz/article-list.service';
import { ArticleService } from './services/sz/article.service';

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

  testing = true;

  constructor(private articleListService: ArticleListService, private articleService: ArticleService) {
    ArticleListService.loadArticleList().subscribe((response) => {
      // test article-list.service
      if (this.testing) {
        alert(ArticleListService.getAppName());

        this.articleService.loadArticle('kj-SZJ');
      }
    });
  }

  // loadArticle() {
  //   this.articleService.loadArticle('kj-SZJ');
  // }


}
