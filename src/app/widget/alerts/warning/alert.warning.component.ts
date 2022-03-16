import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvService } from '../../../shared/env.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'widget-alert-warning',
    templateUrl: './alert.warning.component.html',
    styleUrls: [
        '../../../deshboard/css/deshboard.css'
    ],
})
export class AlertWarningComponent implements OnInit {

    @Input() public data: any;
    @Output() testClick = new EventEmitter();

    public canvas: any;
    public ctx: any;
    public chart: any;
    
    constructor(public envService: EnvService ) { }
    ngOnInit() {}
    ngOnChanges(){
        
        if( this.data ===  undefined){
            this.data = {
                title   : 'none'
            ,   style   : 'alert alert-dark'
            ,   dayInfo : null
            ,   isChart: false
            }
        }
        if( this.data.isChart){
             this.createChartDou();
            
            
        }
    }

    createChartDou(){
        var that = this;
        setTimeout(function(){
            
            let tryVal = that.data.value > 100 ? 100 : that.data.value;
            that.canvas = document.getElementById(that.data.canvasId);
            that.ctx = that.canvas.getContext('2d');
            that.chart = new Chart(that.ctx,{
                type: 'doughnut',
                data: {
                    labels: ["달성율", '목표율'],
                    datasets: [{
                        backgroundColor: [
                            'rgba(255, 206, 86, 1)',
                        ,   '#E4E5E7'
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 0.2)',
                        ,   '#D2D4D7'
                        ],
                        data: [that.data.value, (100-tryVal).toFixed(2)]
                    }]
                },
                plugins: [{
                    beforeDraw: function(chart) {
                      var width = chart.chart.width,
                          height = chart.chart.height,
                          ctx = chart.chart.ctx;
                  
                      ctx.restore();
                      var fontSize = (height / 150).toFixed(2);
                      ctx.font = fontSize + "em sans-serif";
                      ctx.fillStyle = "#9b9b9b";
                      ctx.textBaseline = "middle";
                  
                      var text = `${that.data.value}%`,
                          textX = Math.round((width - ctx.measureText(text).width) / 2),
                          textY = height / 2;
                  
                      ctx.fillText(text, textX, textY);
                      ctx.save();
                    },
                }],
                options: {
                    plugins: {
                        labels: {
                            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                            render: 'image'
                        ,   images: [
                                { src: '', width: 0, height: 0 },
                                { src: '', width: 0, height: 0 }
                              ]
    
                        },
                    },
                    legend: {
                      display: false,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 85
                  }
            });
        }, 100);

       
    }

    createChart(){
        let that = this;
        setTimeout(function(){
            that.canvas = document.getElementById(that.data.canvasId);
            that.ctx = that.canvas.getContext('2d');

            that.chart = new Chart(that.ctx,{
                type: 'gauge',
                data: {
                    //labels: ['Success', 'Warning', 'Warning', 'Error'],
                    datasets: [{
                        labels: ['심각', '경고', '분발', '만족'],
                        data: [25, 50, 75, 100],
                        value: that.data.value,
                        backgroundColor: [
                            '#EF1A1A'
                        ,   '#F28C26'
                        ,   '#F2F226'
                        ,   '#0DE72A'
                        ],
                        borderWidth: 2
                    }]
                },

                options: {
                    responsive: true,
                    title: {
                        display: false,
                        text: that.data.value
                    },
                    needle: {
                        // Needle circle radius as the percentage of the chart area width
                        radiusPercentage: 2,
                        // Needle width as the percentage of the chart area width
                        widthPercentage: 3.2,
                        // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                        lengthPercentage: 60,
                        // The color of the needle
                        color: 'rgba(0, 0, 0, 1)'
                    },
                }
            });
        }, 100);
        
    }

    emitTest(){
        console.log(this.data);
        this.testClick.emit(this.data);
    }

}