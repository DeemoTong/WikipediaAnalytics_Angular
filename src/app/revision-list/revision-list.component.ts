import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRevision } from '../models/revision.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.css']
})

export class RevisionListComponent implements OnInit {
  revisions: IRevision[] = [];
  dataSource: MatTableDataSource<IRevision>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['revid', 'title', 'timestamp', 'user'];

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
    this.revisions = this.route.snapshot.data['revisions'];
    console.log("revision list: count: ", this.revisions.length);
  }
}