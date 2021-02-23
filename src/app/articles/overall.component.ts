import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IArticle, IArticleInfo } from '../models/article.model';
import { IArticleAuthorRevision } from '../models/author.model';

@Component({
  selector: 'overall',
  template: `
  <div>
    <h1>Overall Analytics</h1>
    <hr/>
    <div class="row">
      <div *ngFor="let a of tasks" class="col-md-5">
        <articles-thumbnail (click)="handleThumbnailClick(a.name)" [task]="a" [taskname]="a.name"></articles-thumbnail>
      </div>
    </div>
  </div>
  `
})

export class OverallComponent implements OnInit {
  tasks = TASKS;
  articles: IArticleInfo[] = [];
  authors: IArticleAuthorRevision[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService) {   
  }

  ngOnInit() {
    this.articles = this.route.snapshot.data['articles'].result;
    this.handleTasks();
  }

  handleThumbnailClick(eventName) {
    // this.toastr.success(eventName)
  }
  handleTimestamp() {
    let articlesHistory = [];

    this.dataService.getArticlesHistory().subscribe((res:any) =>{
      let articles = res.result;
      let count = res.result.length;
      
      for(let a of articles) {
        let day = 1000*60*60*24;
        let duration = Math.round((Date.parse(a.latest) - Date.parse(a.start)) / day);
        articlesHistory.push({'_id': a._id, 'total': duration})
      }
      articlesHistory.sort((a, b) => a.duration < b.duration ? 1 : a.duration > b.duration ? -1 : 0);
      console.log("articlesHistory", articlesHistory);
      this.tasks[4].articles = articlesHistory.slice(0,2);
      this.tasks[5].articles = articlesHistory.slice(count-2);
    });

  }


  handleTasks() {
    // top2article-highestRevision
    this.dataService.getArticlesInfo().subscribe((res:any) =>{
      let top2articles = res.result.slice(0, 2);
      console.log("top2article-highestRevision: ", top2articles);
      this.tasks[0].articles = top2articles;
    });

    // top2article-lowestRevision
    this.dataService.getArticlesInfo().subscribe((res:any) =>{
      let count = res.result.length;
      let top2articles = res.result.slice(count-2);
      console.log("top2article-lowestRevision: ", top2articles);
      this.tasks[1].articles = top2articles;
    });

    // top2article-largest-nonbot-users
    this.dataService.getAuthorCountArticles().subscribe((res:any) =>{
      let top2articles = res.result.slice(0, 2);
      console.log("top2article-largest-nonbot-users: ", top2articles);
      this.tasks[2].articles = top2articles;
    });

    // top2article-smalest-nonbot-users
    this.dataService.getAuthorCountArticles().subscribe((res:any) =>{
      let count = res.result.length;
      let top2articles = res.result.slice(count-2);
      console.log("top2article-lowestRevision: ", top2articles);
      this.tasks[3].articles = top2articles;
    });

    // Top 2 article longest-history
    // this.dataService.getArticlesHistory().subscribe((res:any) =>{
    //   let top2articles = res.result.slice(0, 2);
    //   console.log("Top 2 article longest-history: ", top2articles);
    //   this.tasks[4].articles = top2articles;
    // });

    // Top 2 article shortest-history
    // this.dataService.getArticlesHistory().subscribe((res:any) =>{
    //   let count = res.result.length;
    //   let top2articles = res.result.slice(count-2);
    //   console.log("Top 2 article shortest-history: ", top2articles);
    //   this.tasks[5].articles = top2articles;
    // });
    this.handleTimestamp();
  }
}

const TASKS = [
  { name: 'Top 2 article highestRevision', show: 'Revision Number', articles: []},
  { name: 'Top 2 article lowestRevision', show: 'Revision Number', articles: []},
  { name: 'Top 2 article largest-nonbot-users', show: 'Author Number', articles: []},
  { name: 'Top 2 article smalest-nonbot-users', show: 'Author Number', articles: []},
  { name: 'Top 2 article longest-history', show: 'Duration', articles: []},
  { name: 'Top 2 article shortest-history', show: 'Duration', articles: []}
] 