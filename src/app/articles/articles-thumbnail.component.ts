import { Component, Input } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table';
import { IArticle, IArticleInfo } from '../models/article.model';
import { IArticleAuthorRevision } from '../models/author.model';

@Component({
  selector: 'articles-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h3>{{taskname}}</h3>

      <div *ngFor="let a of task.articles; let i = index">
        <ng-container>Title: {{a._id}},  {{task.show}}: {{a.total}}</ng-container>
      </div>
    </div>
  `,
  styles: [`
    .thumbnail { min-height: 210px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class ArticlesThumbnailComponent {
  @Input() taskname: string
  @Input() task: any  
}
