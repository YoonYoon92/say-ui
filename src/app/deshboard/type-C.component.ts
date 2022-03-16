declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { Deshboard } from './shared/deshboard.model';
import { DeshboardService } from './shared/deshboard.service';
import { EnvService } from '../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-type-C',
    templateUrl: './type-C.component.html',
    providers: [DeshboardService],
})
export class TypeCComponent implements OnInit {

    //grid select model
    public gridModel: Deshboard = <Deshboard>{};

    //grid store
    gridStore = new Ext.data.Store({});

    //시작일
    public startDt: any = null;

    //종료일
    public endDt: any = null;

    //fild disabled
    public isDisabled : boolean = true;

    constructor(private deshboardService: DeshboardService, public envService: EnvService ) { }
    ngOnInit() {
        //날짜 기본 셋팅
        this.startDt = new Date(this.envService.getCalDate(-30));
        this.endDt = new Date();
    }

    //grid ready
    gridCmp : any;
    gridReady =(event) =>{
        this.gridCmp = event.cmp;
    }

    //grid row select event
    gridSelect = (row) =>{
        this.gridModel = row.selected[0].data;
    }

    //start date set
    setStartDate = (date) =>{
        console.log( this.envService.getDateToString(date.newDate) );
    }

    //end date set
    setEndDate = (date) =>{
        console.log( this.envService.getDateToString(date.newDate) );
    }
}
