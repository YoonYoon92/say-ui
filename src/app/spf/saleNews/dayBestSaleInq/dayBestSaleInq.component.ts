/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { DayBestSaleInq } from './shared/dayBestSaleInq.model';
import { DayBestSaleInqService } from './shared/dayBestSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-dayBestSaleInq',
	templateUrl: './dayBestSaleInq.component.html',
	providers: [DayBestSaleInqService],
})
export class DayBestSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: DayBestSaleInq = <DayBestSaleInq>{};

	//grid select model
	public gridModel: DayBestSaleInq = <DayBestSaleInq>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: DayBestSaleInq = <DayBestSaleInq>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: DayBestSaleInq = <DayBestSaleInq>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: DayBestSaleInq = <DayBestSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//조회일자
	public searchDay: any = null;


	constructor(private dayBestSaleInqService: DayBestSaleInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.searchDay = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.searchDay 	= this.envService.getDateToString(this.envService.getBeforeDate(null));
       //점 콤보박스 셋팅
	   this.baseStoreCombo();
	}

	//달력 포멧 변경
	searchDayCmp: any;
	onReadysearchDay(event){
		this.searchDayCmp = event.cmp;
		this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.searchDay = this.envService.getDateToString(date.newDate);
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


	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.dayBestSaleInqService.selectDayBestSaleInqList(this.paramModel).subscribe(
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
		this.dayBestSaleInqService.excelDayBestSaleInq(this.paramModel).subscribe(
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
		this.dayBestSaleInqService.reportDayBestSaleInq(this.paramModel).subscribe(
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
		this.dayBestSaleInqService.helpDayBestSaleInq(this.paramModel).subscribe(
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

   //조직(점) 기본 셋팅
   public jumComboVal: string;
   baseStoreCombo = () =>{
	this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		(res: any) => {
			this.comboStoreLv1 = res;
			this.jumComboVal = this.comboStoreLv1[0].storeLvCd;
			this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
			this.paramModel.serchLevel = 'jum';
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
}

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
	this.paramModel.jum = data.newValue;
	this.paramModel.serchLevel = 'jum';
	 //조직(부) 조회
	 this.comboStoreLv2Model.paramLvCd = data.newValue;
	 this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		 (res: any) => {
			 //하위 콤보박스를 전부 초기화 한다
			 this.comboStoreLv3 = null;	
			 //조직(부) data set
			 this.comboStoreLv2 = res;
		 },
		 (err: HttpErrorResponse) => {
			 Ext.Msg.alert('Error!!', 'Server communication error.');
		 }
	 );
}

//부 콤보박스 선택 이벤트
comboStoreLv2Event = (data) =>{
	this.paramModel.bu = data.newValue;
	this.paramModel.serchLevel = 'bu';
	 //조직(팀) 조회
	 this.comboStoreLv3Model.paramLvCd = data.newValue;
	 this.envService.selectStoreComboLv3List(this.comboStoreLv3Model).subscribe(
		 (res: any) => {
			 //조직(팀) data set
			 this.comboStoreLv3 = res;
		 },
		 (err: HttpErrorResponse) => {
			 Ext.Msg.alert('Error!!', 'Server communication error.');
		 }
	 );
}

//팀 콤보박스 선택 이벤트
comboStoreLv3Event = (data) =>{
	this.paramModel.tim = data.newValue;
	this.paramModel.serchLevel = 'tim';
}
}