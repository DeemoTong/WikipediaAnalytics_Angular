import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IArticle, IArticleInfo } from '../models/article.model';
import { IArticleAuthorRevision } from '../models/author.model';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit {

  articles: IArticleInfo[] = [];
  dataSource: MatTableDataSource<IArticleInfo>;
  displayedColumns: string[] = ['title', 'total_revisions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  panelOpenState = false;
  authors: IArticleAuthorRevision[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {
    // this.dataService.GetRevisions().subscribe(data => {
    //   this.revisions = data;
    //   this.dataSource = new MatTableDataSource<IRevision>(this.revisions);
    //   setTimeout(() => {
    //     this.dataSource.paginator = this.paginator;
    //   }, 0);
    // })    
  }

  ngOnInit() {
    this.articles = this.route.snapshot.data['articles'].result;
    this.dataSource = new MatTableDataSource<IArticleInfo>(this.articles);
    this.dataSource.paginator = this.paginator;
    console.log("this.route", this.route);
    console.log("articles list: count: ", this.articles.length);
  }

  beforePanelOpened(title: string) {
    this.panelOpenState = true;
    this.getAuthors(title);
  }

  beforePanelClosed() {
    this.panelOpenState = false;
    this.authors = [];
  }

  afterPanelClosed(){
    console.log("Panel closed!");
  }
  afterPanelOpened(){
    console.log("Panel opened!");
  }

  getAuthors(title: string) {
    this.dataService.getArticleAuthorRevisions(title).subscribe((res:any) =>{
      this.authors = res.result;
      console.log("authors: ", this.authors);
      return this.authors;
    });
  }


}