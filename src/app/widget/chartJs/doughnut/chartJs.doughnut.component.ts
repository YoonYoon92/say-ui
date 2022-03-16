import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';
import 'jquery';
import { EnvService } from '../../../shared/env.service';

@Component({
    selector: 'widget-chartJs-doughnut',
    templateUrl: './chartJs.doughnut.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ChartJsPieComponent implements OnInit {

    @Input() public douctModel: any;
    
    public chart : any;
    public canvas: any;
    public ctx: any;
    
    public renders = ['percentage', 'label', 'value', 'image'];
    public index = 0;

    constructor( public envService: EnvService  ) {
        
    }
    
    ngOnInit(){}
    ngOnChanges(){
        if( this.douctModel !== undefined ) this.createChart();
    }

    //차트 생성
    createChart(){
        var that = this;
        setTimeout(function(){
            
            that.canvas = document.getElementById('donutChart');
            that.ctx = that.canvas.getContext('2d');
            that.chart = new Chart(that.ctx,{
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: that.douctModel.data,
                        backgroundColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                    }],
                    labels: that.douctModel.labels
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        // position: 'top',
                        text: that.douctModel.title
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return `${data.labels[tooltipItem.index]} : ${that.envService.comma(data.datasets[0].data[tooltipItem.index])}`;
                            }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    plugins: {
                        labels: {
                            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                            render: that.renders[that.index]
                            // precision for percentage, default is 0
    
                        ,    precision: 0
                            // identifies whether or not labels of value 0 are displayed, default is false
                        ,    showZero: true
    
                            // font size, default is defaultFontSize
                        ,    fontSize: 12
    
                            // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                        ,    fontColor: '#fff'
    
                            // font style, default is defaultFontStyle
                        ,    fontStyle: 'bold'
    
                            // font family, default is defaultFontFamily
                        ,    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    
                            // draw text shadows under labels, default is false
                        ,    textShadow: true
    
                            // text shadow intensity, default is 6
                        //,    shadowBlur: 10
    
                            // text shadow X offset, default is 3
                        //,    shadowOffsetX: -5
    
                            // text shadow Y offset, default is 3
                        //,    shadowOffsetY: 5
    
                            // text shadow color, default is 'rgba(0,0,0,0.3)'
                        //,    shadowColor: 'rgba(255,0,0,0.75)'
    
                            // draw label in arc, default is false
                            // bar chart ignores this
                        ,    arc: true
                            // position to draw label, available value is 'default', 'border' and 'outside'
                            // bar chart ignores this
                            // default is 'outside'
                        ,    position: 'default'
    
                            // draw label even it's overlap, default is true
                            // bar chart ignores this
                        ,    overlap: true
    
                            // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
                        ,    showActualPercentages: true
                            // add padding when position is `outside`
                            // default is 2
                        ,    outsidePadding: 4
    
                            // add margin of text when position is `outside` or `border`
                            // default is 2
                        ,    textMargin: 4
                        }
                    }
                },
                
            });
        }, 100);

    }

    //차트 표시 라벨 변경
    chartLable(){
        this.index = this.index == 3 ? 0 : ++this.index;
        this.chart.options.plugins.labels.render = this.renders[this.index];
        this.chart.update();
    }

    //차트 모양 변경
    chartCh(){
        if( this.chart.options.circumference === Math.PI ){
            this.chart.options.circumference = 2 * Math.PI;
            this.chart.options.rotation = -Math.PI / 2;
        }else{
            this.chart.options.circumference = Math.PI;
            this.chart.options.rotation = -Math.PI;
        }
        this.chart.update();
    }

}