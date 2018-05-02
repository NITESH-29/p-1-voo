import { element } from 'protractor/built';
import { FormatWidth } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {ChartService} from './chart.service';
 
@Component({
  selector: 'line-chart-demo',
  templateUrl: './chart.component.html'
})
export class LineChartDemoComponent implements OnInit {
  // lineChart data to be passed i.e number of activities that too userwise 65=Sanjeev,28=sanjeev etc.
  constructor(
    private charts:ChartService
  ){

  }
  public dateArray:Array<any> = [];
  public userArray:Array<any> = [];
  public tagArray:Array<any> = [];
  public groupArray:Array<any> = [];
  public lineChartData:any = [{data:[],label:''},{data:[],label:''},{data:[],label:''}];
  public lineChartLabels:any = []; //Users 
  public lineChartOptions:any = {
    responsive: true,
    scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
    height:'500px',
    width :'720px'
                
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.3)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public getCounts(){
    this.charts.getChartCount().subscribe((result)=>{
    
    if(result.code === 200){
    this.userArray = result.data.linechart.users;
    this.tagArray = result.data.linechart.tags;
    this.dateArray = result.data.linechart.date;
    this.groupArray = result.data.linechart.groups;    
    this.lineChartData = [
      {data: this.userArray, label: 'Users'},
      {data: this.tagArray, label: 'Tags'},
      {data: this.groupArray, label: 'Groups'}
    ]
    this.lineChartLabels = []
    this.dateArray.forEach((element)=>{
      this.lineChartLabels.push(element);
    })
    }else{
      console.log('No record found')
    }
  })
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
ngOnInit() {
      this.getCounts()
    }
}
