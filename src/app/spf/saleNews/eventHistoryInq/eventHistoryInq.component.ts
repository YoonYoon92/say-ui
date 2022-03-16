/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { EventHistoryInq } from './shared/eventHistoryInq.model';
import { EventHistoryInqService } from './shared/eventHistoryInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-eventHistoryInq',
	templateUrl: './eventHistoryInq.component.html',
	providers: [EventHistoryInqService],
})
export class EventHistoryInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: EventHistoryInq = <EventHistoryInq>{};

	//grid select model
	public gridModel: EventHistoryInq = <EventHistoryInq>{};

    
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private eventHistoryInqService: EventHistoryInqService, public envService: EnvService ) { }
	
	
	renderSign = (value, record) => {	
		var formattedValue = Ext.util.Format.number(value);


	var col = '';
	var backCol = '';
	if (value > 0) { col = 'black'; }
	else if (value < 0) { col = 'red'; }

	const result = `<span style='color:${col}'>${formattedValue}</span>`;
	return result;
}
	
	
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
  
     
	
	}
	 //달력 포멧 변경
	 startDtCmp: any;
	 onReadystartDt(event){
		 this.startDtCmp = event.cmp;
		 this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	 }

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.eventHistoryInqService.selectEventHistoryInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
			}
		);
	}

    
   

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.eventHistoryInqService.excelEventHistoryInq(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

	//레포트 버튼 이벤트
	onTapReport(event){
		this.eventHistoryInqService.reportEventHistoryInq(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.eventHistoryInqService.helpEventHistoryInq(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

  

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}