/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CardApprLogInq } from './shared/cardApprLogInq.model';
import { CardApprLogInqList } from './shared/cardApprLogInqList.model';
import { CardApprLogInqService } from './shared/cardApprLogInq.service';
import { EnvService, ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-cardApprLogInq',
	templateUrl: './cardApprLogInq.component.html',
	providers: [CardApprLogInqService],
})
export class CardApprLogInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	storeCd : string;
	apprCd : string;

	//param model
	public paramModel: CardApprLogInq = <CardApprLogInq>{};


	//grid select 
	public gridModel: CardApprLogInqList = <CardApprLogInqList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: CardApprLogInq = <CardApprLogInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	apprStore = new Ext.data.Store({
			//data 속성의 json object에 정의된 key 값들과 매칭시켜줍니다.
			fields : ['apprLvCd','apprLvNm'],
			//저장공간에 fix값으로 data 속성에 json array type으로 담아줍니다.
			data : [{
						apprLvCd : 'A',
						apprLvNm : 'SWIPE거래'
					},{
						apprLvCd : 'I',
						apprLvNm : 'IC카드거래'
					},{
						apprLvCd : 'F',
						apprLvNm : 'FALLBACK거래'
					},{
						apprLvCd : 'Z',
						apprLvNm : '수기(IC카드)'
					},{
						apprLvCd : '@',
						apprLvNm : '수기(마그네틱)'
					}]}
		);	

	//시작년월
	public startDate: any = null;

	//종료년월
	public endDate: any = null;


	searchWCC:string = null;
	searchRegi:string = null;
	searchCardCoNm:string = null;
	searchCardNo:string = null;


	public performance = [];
	public marginChg = [];
	public sum = [];

	constructor(private cardApprLogInqService: CardApprLogInqService, public envService: EnvService, private cd: ChangeDetectorRef ) { }
	ngOnInit() { 
		//this.startDt = new Date(this.envService.getBeforeDate(30));
		this.startDate = new Date(this.envService.getBeforeDate(null));
		this.endDate = new Date(this.envService.getBeforeDate(null));
		//시작점 
		this.storeCd = '01';
		//this.paramModel.jum = this.storeCd;

		//조회 모델에 시작년월과 종료년월 기본값 셋팅
		this.paramModel.startDate 	= this.envService.getDateToString(null);
		this.paramModel.endDate     = this.envService.getDateToString(null);

       	//점/부 콤보박스 셋팅
	   	this.baseStoreCombo()	
	
	}

	renderSign = (value, record) => {
		var formattedValue = null;
		var col = '';
		var backCol = '';

		if (record.get('orgName') == "구성비" || record.get('sortation') == "구성비") {
			formattedValue = Ext.util.Format.number(value, '000.00 %');
		} else if (record.get('orgName') == "고객수" || record.get('sortation') == "고객수") {
			formattedValue = Ext.util.Format.number(value, '0,000');
		} else {
			formattedValue = Ext.util.Format.number(value/1000, '0,000');
		};
		
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignRate = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '000.00 %');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignNormal = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	//점 초기 01 세팅
	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
	}

	//달력 포멧 한글로 변경
	searchStartDateCmp: any;
	onReadysearchStartDate(event){
		this.searchStartDateCmp = event.cmp;
		this.searchStartDateCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//달력 포멧 한글로 변경
	searchEndDateCmp: any;
	onReadysearchEndDate(event){
		this.searchEndDateCmp = event.cmp;
		this.searchEndDateCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDate(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.endDate)
	   {
		  this.searchStartDateCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.startDate = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndDate(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.startDate)
	   {
		  this.searchEndDateCmp.set
		  this.searchEndDateCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.endDate = this.envService.getDateToString(date.newDate);
	   }
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//grid ready
	gridCmpDetail : any;
	onReadyDetailGrid(event){
		this.gridCmpDetail = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		this.cardApprLogInqService.selectCardApprLogInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */

				console.log('res:'+ res);

				//console.log('res:'+ JSON.stringify(res));
				this.gridModel=res
				this.gridStore.setData(res);
				console.log('res:' + this.gridStore);
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

    
	//조직(점) 기본 셋팅
	public jumComboVal: string;
	baseStoreCombo = () =>{
			this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
				(res: any) => {
			this.comboStoreLv1 = res;
			this.jumComboVal = this.comboStoreLv1[0].storeLvCd;
			this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
	}


	//점 콤보박스 선택 이벤트
	comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
	}

	//카드사
	onChgCardCoNm = (data) =>{
		this.paramModel.searchCardCoNm = data.newValue;
	}

	//카드번호
	onChgCardNo = (data) =>{
		this.paramModel.searchCardNo = data.newValue;
	}

	//pos번호
	onChgRegi = (data) =>{
		this.paramModel.searchRegi = data.newValue;
	}

	//승인구분
	apprStoreEvent = (data) =>{
		this.paramModel.searchWCC = data.newValue;
	}


	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

		  

}