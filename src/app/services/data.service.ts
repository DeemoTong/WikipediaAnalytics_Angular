import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IRevision } from '../models/revision.model';
import { IArticle, IArticleInfo } from '../models/article.model';
import { IArticleAuthorRevision } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint: string = 'http://localhost:8080/api';
  revisionEndpoint: string = 'http://localhost:8080/api/revisions';
  articleEndpoint: string = 'http://localhost:8080/api/articles';
  authorEndpoint: string = 'http://localhost:8080/api/authors';
  chartEndpoint: string = 'http://localhost:8080/api/charts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getUserTypePie(): Observable<any[]> {
    let url = this.chartEndpoint + '/piechart';
    return this.http.get<any[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<any[]>('getUserTypePie', [])));
  }

  getYearUserDistributionBarChart(): Observable<any[]> {
    let url = this.chartEndpoint + '/barchart';
    return this.http.get<any[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<any[]>('getYearUserDistributionBarChart', [])));
  }

  getRevisions(): Observable<IRevision[]> {
    let url = this.revisionEndpoint;
    return this.http.get<IRevision[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<IRevision[]>('getRevisions', [])));
  }

  getArticlesInfo(): Observable<IArticleInfo[]> {
    let url = this.articleEndpoint + '/info';
    return this.http.get<IArticleInfo[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<IArticleInfo[]>('getArticles', [])));
  }

  getAuthorCountArticles(): Observable<[]> {
    let url = this.articleEndpoint + '/countAuthors';
    return this.http.get<[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<[]>('getAuthorCountArticles', [])));
  }

  getArticlesHistory(): Observable<[]> {
    let url = this.articleEndpoint + '/history';
    return this.http.get<[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<[]>('getArticlesHistory', [])));
  }

  getArticleAuthorRevisions(title: string): Observable<IArticleAuthorRevision[]> {
    let url = this.articleEndpoint + '/' + title;
    return this.http.get<IArticleAuthorRevision[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<IArticleAuthorRevision[]>('getArticleAuthorRevisions', [])));
  }

  getArticleTopAuthors(title: string, num: number): Observable<IArticleAuthorRevision[]> {
    let url = this.articleEndpoint + '/topUsers/' + title + '/' + num.toString;
    return this.http.get<IArticleAuthorRevision[]>(url, { headers: this.headers })
      .pipe(catchError(this.handleError<IArticleAuthorRevision[]>('getArticleTopAuthors', [])));
  }











  GetRevisions(): Observable<IRevision[]> {
    let API_URL = `${this.endpoint}/revisions`;
    return this.http.get<IRevision[]>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError<IRevision[]>('GetArticleRevisions', [])));
  }

  GetArticles() {
    return this.http.get(`${this.endpoint}/articles`);
  }

  // GetArticleRevisions(title: string) {
  //   return this.http.get(`${this.endpoint}/title`);
  // }

  GetArticleRevisions(title: string): Observable<IRevision[]> {
    let API_URL = `${this.endpoint}/article/${title}`;
    return this.http.get<IRevision[]>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError<IRevision[]>('GetArticleRevisions', [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}