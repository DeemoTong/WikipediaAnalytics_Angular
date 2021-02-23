export interface IRevision {
  revid: number
  parentid: number
  minor: boolean
  user: string
  anon?: boolean
  userid: number
  timestamp: string
  size: number
  sha1: string
  parsedcomment: string
  title: string
}