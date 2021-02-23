import { Component, Input, OnChanges } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'barchart',
  templateUrl: './barchart.component.html',
  styles: [`
  `]
})
export class BarChartComponent {
  distribution = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLabels: Label[] = [];
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  // barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  minYear: number;
  maxYear: number;
  numYears: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.distribution = this.route.snapshot.data['distribution'];
    console.log("distribution: ", this.distribution);
    this.getLabelYearRange(this.distribution);
    console.log("barChartLabels", this.barChartLabels);
    this.barChartData.push({ data: [], label: 'regular' })
    this.barChartData.push({ data: [], label: 'anonymous' })
    this.barChartData.push({ data: [], label: 'admin' })
    this.barChartData.push({ data: [], label: 'bot' })
    console.log(this.numYears);
    this.computeData(this.distribution);
  }

  getLabelYearRange(distribution) {
    this.minYear = this.findMinMax(this.distribution)[0];
    this.maxYear = this.findMinMax(this.distribution)[1];
    this.numYears = this.maxYear - this.minYear;
    console.log("Year range:", this.minYear, this.maxYear);

    for(let i = this.minYear; i <= this.maxYear; i++) {
      this.barChartLabels.push(i.toString());
    }

    // for(let l of this.barChartLabels) {
    //   this.barChartData.push({ data: [], label: l.toString() })
    // }
  }

  findMinMax(arr) {
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i=arr.length-1; i>=0; i--) {
        tmp = arr[i].year;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    return [lowest, highest];
  }

  computeData(distribution) {
    for(let l of this.barChartData) {
      l.data = new Array(this.numYears);
      l.data.fill(0);
    }
    for(let e of distribution) {
      if(e.type == 'regular') {
        this.barChartData[0].data[Number(e.year)-this.minYear] += e.number;
      } else if(e.type == 'anonymous') {
        this.barChartData[1].data[Number(e.year)-this.minYear] += e.number;
      } else if(e.type == 'admin') {
        this.barChartData[2].data[Number(e.year)-this.minYear] += e.number;
      } else if(e.type == 'bot') {
        this.barChartData[3].data[Number(e.year)-this.minYear] += e.number;
      }
    }

    console.log("barChartData:", this.barChartData);
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
}
