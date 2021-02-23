import { Component, Input, OnChanges } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styles: [`
  `]
})
export class PieChartComponent {
  userTypes = [];
  pieChartType:string = 'pie';
  // Pie
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userTypes = this.route.snapshot.data['userTypes'];
    console.log("userTypes: ", this.userTypes);
    for(let e of this.userTypes) {
      this.pieChartLabels.push(e.type);
      this.pieChartData.push(e.number);
    }
    console.log("pieChartLabels: ", this.pieChartLabels);
    console.log("pieChartData: ", this.pieChartData);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
