import { Injectable } from '@angular/core';
import { ArticleListService } from './sz/article-list.service';


@Injectable()
export class ServicesManagerService {
  static services = {}

  testing = false;
  constructor(private articleListService: ArticleListService) {
    ArticleListService.loadArticleList().subscribe((response) => {
      ServicesManagerService.services[ArticleListService.ModuleName] = true;
      // test article-list.service
      if (this.testing) {
        alert(ArticleListService.getAppName());
      }
    });
  }

}
