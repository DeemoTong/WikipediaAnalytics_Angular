import { IRevision } from './revision.model';

export interface IArticle {
  title: string
  revisions: IRevision[]
}

export interface IArticleInfo {
  _id: string
  total: number
}


