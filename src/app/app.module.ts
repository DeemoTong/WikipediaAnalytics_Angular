import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar.component'
import { OverallComponent } from './articles/overall.component';
import { ArticlesThumbnailComponent } from './articles/articles-thumbnail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlesResolver } from './services/articles-resolver.service';
import { RevisionListComponent } from './revision-list/revision-list.component';
import { RevisionsResolver } from './services/revisions-resolver.service';
import { ArticleAuthorListComponent } from './article-list/article-author-list.component';
import { ArticleAuthorsResolver } from './services/article-authors-resolver.service'; 
import { PieChartComponent } from './charts/piechart.component';
import { PieChartResolver } from './services/piechart-resolver.service';
import { BarChartComponent } from './charts/barchart.component';
import { DistributionBarChartResolver } from './services/distributionBarChart-resolver.service';

import { AuthService } from './user/auth.service'
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ArticleListComponent,
    RevisionListComponent,
    ArticleAuthorListComponent,
    OverallComponent,
    ArticlesThumbnailComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    RevisionsResolver,
    ArticlesResolver,
    ArticleAuthorsResolver,
    PieChartResolver,
    DistributionBarChartResolver
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }