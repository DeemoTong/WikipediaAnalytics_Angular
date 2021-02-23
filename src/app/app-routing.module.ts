import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevisionsResolver } from './services/revisions-resolver.service';
import { RevisionListComponent } from './revision-list/revision-list.component';
import { ArticlesResolver } from './services/articles-resolver.service';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleAuthorListComponent } from './article-list/article-author-list.component';
import { ArticleAuthorsResolver } from './services/article-authors-resolver.service'; 
import { OverallComponent } from './articles/overall.component';
import { ArticlesThumbnailComponent } from './articles/articles-thumbnail.component';
import { PieChartComponent } from './charts/piechart.component';
import { PieChartResolver } from './services/piechart-resolver.service';
import { BarChartComponent } from './charts/barchart.component';
import { DistributionBarChartResolver } from './services/distributionBarChart-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'articles/info' },
  { path: 'revisions-list', resolve: { revisions: RevisionsResolver } , component: RevisionListComponent },
  { path: 'articles/info', resolve: { articles: ArticlesResolver } , component: ArticleListComponent },
  { path: 'articles/:title', resolve: { authors: ArticleAuthorsResolver } , component: ArticleAuthorListComponent },
  { path: 'user', loadChildren: './user/user.module#UserModule'},
  { path: 'overall', resolve: { articles: ArticlesResolver } , component: OverallComponent },
  { path: 'overall/usertype-piechart' , resolve: { userTypes: PieChartResolver }, component: PieChartComponent },
  { path: 'overall/distribution-barchart' , resolve: { distribution: DistributionBarChartResolver }, component: BarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }