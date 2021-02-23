import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { DataService } from './data.service';

@Injectable()
export class ArticleAuthorsResolver implements Resolve<any> {
  
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataService.getArticleAuthorRevisions(route.params['title']);
  }
}