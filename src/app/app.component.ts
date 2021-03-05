import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component } from '@angular/core';
import { CoronaService } from './services/corona.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19app';

  countries:any;
  country:any;
  Confirmed:number;
  Recovered:number;
  Deaths:number;
  chart: [];

  constructor(private corona : CoronaService) {}

  ngOnInit(){
    this.corona.getCountries().subscribe((data)=>{
      console.log(data);
      this.countries = data;
    });
  }

  getCoronaData(){
    this.corona.getCoronaRealtimeData(this.country).subscribe((data)=>{
      console.log(data);
      var index = data.length - 1;
      this.Confirmed = data[index].Confirmed;
      this.Recovered = data[index].Recovered;
      this.Deaths = data[index].Deaths;

      const coronaLabels = ['Confirmed', 'Recovered', 'Deaths'];

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: coronaLabels,
          datasets: [
            {
              data: this.Confirmed,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: this.Recovered,
              borderColor: '#ffcc00',
              fill: false
            },
            {
              data: this.Deaths,
              borderColor: '#ff6c6c',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxis: [{
              display: true
            }],
            yAxis: [{
              display: true
            }]
          }
        }
      })
    });
  }

  getCountry(country:any){
    this.country = country;
  }
}
