import { Component, ViewChild, OnInit, Input, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IArticleAuthorRevision } from '../models/author.model';

@Component({
  selector: 'article-author-list',
  templateUrl: './article-author-list.component.html',
  styleUrls: ['./article-author-list.component.css']
})

export class ArticleAuthorListComponent implements OnChanges {
  @Input() inputAuthors: IArticleAuthorRevision[];
  authors: IArticleAuthorRevision[] = [];
  dataSource: MatTableDataSource<IArticleAuthorRevision>;
  displayedColumns: string[] = ['name', 'total_revisions'];
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) 
  { }

  ngOnChanges() {
    if(this.inputAuthors.length > 0) {
      console.log("inputAuthors: ", this.inputAuthors);
      // this.getAuthors();
      this.dataSource = new MatTableDataSource<IArticleAuthorRevision>(this.inputAuthors);
    }
    // this.authors = this.route.snapshot.data['authors'].result;
  
  }

  // getAuthors() {
  //   this.dataService.getArticleAuthorRevisions(this.articleTitle).subscribe(res =>{
  //     this.authors = res;
  //     console.log("authors: ", this.authors);
  //   });
  // }


}