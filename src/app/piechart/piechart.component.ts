import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app- ',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
 // Pie
 public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
 public pieChartData:number[] = [300, 500, 100];
 public pieChartType:string = 'pie';

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }
}
