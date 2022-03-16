declare var Ext: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnvService } from '../../shared/env.service';

@Component({
    selector: 'widget-pagination',
    templateUrl: './pagination.component.html',
    
})
export class PaginationComponent implements OnInit {

    //페이지 정보
	public pageInfo: string;

    //현재 페이지
    public index : number = 1;
    
    //전체 페이지
    @Input() totPage : number;

    @Output() pageEvent = new EventEmitter();

    constructor(public envService: EnvService ) { }
    ngOnInit() {}

    //이전 페이지
	beforePage(event){
		if( this.index > 1 ){
			this.index--;
            this.pageInfo= `${this.index} / ${this.totPage}`;
            this.pageEvent.emit(this.index);
		}else{
            Ext.toast('첫번째 페이지 입니다.');
        }
	}

	//다음 페이지
	afterPage(event){
		if( this.index < this.totPage ){
			this.index++;
            this.pageInfo= `${this.index} / ${this.totPage}`;
            this.pageEvent.emit(this.index);
		}else{
            Ext.toast('마지막 페이지 입니다.');
        }
	}
}