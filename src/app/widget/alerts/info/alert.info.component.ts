import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvService } from '../../../shared/env.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'widget-alert-info',
    templateUrl: './alert.info.component.html',
    styleUrls: [
        '../../../deshboard/css/deshboard.css'
    ],
})
export class AlertInfoComponent implements OnInit {

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
    }

}