import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { EnvService } from '../../../shared/env.service';

@Component({
    selector: 'widget-chartJs-line',
    templateUrl: './chartJs.line.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ChartJsLineComponent implements OnInit {

    @Input() public lineModel: any;
    
    public chart: any;
    public canvas: any;
    public ctx: any;

    public chartIcon: string = 'fas fa-chart-bar';
    public fill: boolean = false;   //라인차트 표시방법
    public isDisabled: boolean = false; //라인차트 표시방법 버튼 활성화 구분

    public yAxes: number = 1000;                //y축 val 표시 방법 구분
    public yAxesText: string = '금액(천)';      //y축 타이틀

    constructor( public envService: EnvService ) {}
    
    ngOnInit(){
        
    }
    ngOnChanges(){
        //"Red", "Blue", "Yellow", "Green", "Purple", "Orange"
        // backgroundColor: [
        //     'rgba(255, 99, 132, 0.2)',
        //     'rgba(54, 162, 235, 0.2)',
        //     'rgba(255, 206, 86, 0.2)',
        //     'rgba(75, 192, 192, 0.2)',
        //     'rgba(153, 102, 255, 0.2)',
        //     'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //     'rgba(255,99,132,1)',
        //     'rgba(54, 162, 235, 1)',
        //     'rgba(255, 206, 86, 1)',
        //     'rgba(75, 192, 192, 1)',
        //     'rgba(153, 102, 255, 1)',
        //     'rgba(255, 159, 64, 1)'
        //     ],
        if( this.lineModel !== undefined) this.createLineChart();
    }

    //라인차트 생성
    createLineChart(){
    
        var that = this;
        setTimeout(function(){
            that.canvas = document.getElementById('lineChart');
            that.ctx = that.canvas.getContext('2d');
            that.chart = new Chart(that.ctx,{
                type: 'line',
                data: {
                    labels: that.lineModel.labels,
                    datasets: that.lineModel.rows
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: that.lineModel.title
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return `${data.datasets[tooltipItem.datasetIndex].label} : ${that.envService.comma( Math.round(tooltipItem.yLabel / that.yAxes) )}`;
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: '시간'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                callback: function(label, index, labels) {
                                    return that.envService.comma( label / that.yAxes );
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: that.yAxesText
                            }
                        }]
                    },
                    
                }
            });
        }, 100);
    }

    //바 차트
    createBarChart(){
        var that = this;
        setTimeout(function(){
            that.canvas = document.getElementById('lineChart');
            that.ctx = that.canvas.getContext('2d');
            that.chart = new Chart(that.ctx,{
                type: 'bar',
                data: {
                    labels: that.lineModel.labels,
                    datasets: that.lineModel.rows
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: that.lineModel.title
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return `${data.datasets[tooltipItem.datasetIndex].label} : ${that.envService.comma( Math.round(tooltipItem.yLabel / that.yAxes) )}`;
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: '하단타이틀'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                callback: function(label, index, labels) {
                                    return that.envService.comma( label / that.yAxes );
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: that.yAxesText
                            }
                        }]
                    },
                    
                }
            });
        }, 100);
    }

    //라인 + 바 차트
    createMixChart(){

        var that = this;
        let mixDataModel = new Array;

        this.lineModel.rows.forEach(item => {
            /**
             * line 차트, bar 차트 데이터를 따로따로 만든다
             */

            //배열객체 a = b 라고 했을때 a가 바뀌면 b도 같이 변경되서 아래와 같이 씀
            let lineItem = JSON.parse(JSON.stringify(item));
            lineItem.type = 'line';
            mixDataModel.push(lineItem);
            
            //배열객체 a = b 라고 했을때 a가 바뀌면 b도 같이 변경되서 아래와 같이 씀
            let barItem = JSON.parse(JSON.stringify(item));
            barItem.type = 'bar'
            mixDataModel.push(barItem);
        });

        setTimeout(function(){
            that.canvas = document.getElementById('lineChart');
            that.ctx = that.canvas.getContext('2d');
            that.chart = new Chart(that.ctx,{
                type: 'bar',
                data: {
                    labels: that.lineModel.labels,
                    datasets: mixDataModel
                },
                options: {
                    plugins: {
                        labels: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: that.lineModel.title
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return `${data.datasets[tooltipItem.datasetIndex].label} : ${that.envService.comma( Math.round(tooltipItem.yLabel / that.yAxes) )}`;
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: '시간'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                callback: function(label, index, labels) {
                                    return that.envService.comma( label / that.yAxes );
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: that.yAxesText
                            }
                        }]
                    },
                    
                }
            });
        }, 100);
    }

    //차트 변경
    chartType = ['line', 'bar', 'mix'];
    chartIndex = 0;
    chartCh(){

        this.chartIndex = this.chartIndex == 2 ? 0 : ++this.chartIndex;
        this.chart.destroy();
        this.isDisabled = true;

        if( this.chartType[this.chartIndex] === 'bar' ){
            this.createBarChart();
            this.chartIcon = 'fab fa-mix';
        }else if( this.chartType[this.chartIndex] === 'mix' ){
            this.createMixChart();
            this.chartIcon = 'fas fa-chart-line';
        }else{
            this.createLineChart(); 
            this.isDisabled = false;  
            this.chartIcon= 'fas fa-chart-bar';
        }

    }

    //라인차트 표시방법 변경
    changeLine(){
        
        let dataModel = new Array;
        this.fill = !this.fill;

        this.lineModel.rows.forEach(item => {
            let copy = item;
            copy.fill = this.fill;
            dataModel.push(copy);
        });

        this.chart.data.datasets = dataModel;
        this.chart.update();
    }

    /**
     * y축 라벨 변경  
     * @param val 
     */
    yLableChange(val: number){
        this.yAxes = val;
        this.yAxesText = this.yAxes === 1 ? '금액(원)' : '금액(천)';
        //y축 타이틀 변경
        this.chart.options.scales.yAxes[0].scaleLabel.labelString = this.yAxesText;
        this.chart.update();
    }
}