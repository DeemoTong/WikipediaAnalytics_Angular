import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IRevision } from '../models/revision.model';
import { IArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  endpoint: string = 'http://localhost:8080/api';
  revisionEndpoint: string = 'http://localhost:8080/api/revisions';
  articleEndpoint: string = 'http://localhost:8080/api/articles';
  authorEndpoint: string = 'http://localhost:8080/api/authors';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  GetRevisions(): Observable<IRevision[]> {
    let API_URL = `${this.endpoint}/revisions`;
    return this.http.get<IRevision[]>(API_URL, { headers: this.headers })
      .pipe(catchError(this.handleError<IRevision[]>('GetArticleRevisions', [])));
  }


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