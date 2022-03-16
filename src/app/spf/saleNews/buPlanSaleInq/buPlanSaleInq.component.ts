/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { BuPlanSaleInq } from './shared/buPlanSaleInq.model';
import { BuPlanSaleInqService } from './shared/buPlanSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-buPlanSaleInq',
	templateUrl: './buPlanSaleInq.component.html',
	providers: [BuPlanSaleInqService],
})
export class BuPlanSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: BuPlanSaleInq = <BuPlanSaleInq>{};

	//grid select model
	public gridModel: BuPlanSaleInq = <BuPlanSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//점
	public comboStoreLv1: any = '01';
	public comboStoreLv1Model: BuPlanSaleInq = <BuPlanSaleInq>{};
	//부
	public comboStoreLv2: any = null;
	public comboStoreLv2Model: BuPlanSaleInq = <BuPlanSaleInq>{};



	constructor(private buPlanSaleInqService: BuPlanSaleInqService, public envService: EnvService ) { }

	renderSign = (value, record) => {	
		if (record.get('division') == "달성율" || record.get('division') == "신장율"){
		var formattedValue = Ext.util.Format.number(value, '000.00%');
		}
		else{
			var formattedValue = Ext.util.Format.number(value, '0,000');
		}
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
		this.baseStoreCombo();
	
	}
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	 }
	//조직(점) 기본 셋팅
	baseStoreCombo = () =>{
		this.paramModel.jum = '01';
		this.paramModel.serchLevel = 'jum';
		this.comboStoreLv1Model.paramLvCd = '01';
		this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
			this.comboStoreLv1 = res;
		},
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);

		this.comboStoreLv2Model.paramLvCd = '01';
		this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		    (res: any) => {
			this.comboStoreLv2 = res;
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
		 this.paramModel.bu =null;
		 this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
			 (res: any) => {
				 //하위 콤보박스를 전부 초기화 한다
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
	}
	
		//달력 포멧 변경
		startDtCmp: any;
		onReadystartDt(event){
			this.startDtCmp = event.cmp;
			this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
		}
		
	//시작일 변경 이벤트
	onChangeStartDt(date){
	
		//this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		//this.startDt.getPicker().setHeaderFormat('Y년m월d일');
		// this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		if(this.envService.getDateToString(date.newDate) > this.paramModel.endDt)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.startDtCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
	}
	else
	{         
	   this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	}
	//달력 포멧 변경
	endDtCmp: any;
	onReadyendDt(event){
		this.endDtCmp = event.cmp;
		this.endDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//종료일 변경 이벤트
	onChangeEndDt(date){
		//this.paramModel.endDt = this.envService.getDateToString(date.newDate);
		if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.endDtCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
	}
	else
	{         
	   this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}
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
		this.buPlanSaleInqService.selectBuPlanSaleInqList(this.paramModel).subscribe(
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

	//수정 버튼 이벤트
	onTapModify(event){
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				this.buPlanSaleInqService.deleteBuPlanSaleInq(null).subscribe(
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
		);
	}

	//신규 버튼 이벤트
	onTapNew(event){
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				this.buPlanSaleInqService.saveBuPlanSaleInq(null).subscribe(
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
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.buPlanSaleInqService.excelBuPlanSaleInq(this.paramModel).subscribe(
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
		this.buPlanSaleInqService.reportBuPlanSaleInq(this.paramModel).subscribe(
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
		this.buPlanSaleInqService.helpBuPlanSaleInq(this.paramModel).subscribe(
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

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		this.paramModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.paramModel.comboVal = data.newValue;
	}

	
	summarizeachivmentrate(grid, record) {
		console.log(record);
		console.log(this.gridModel);
		console.log(grid());
		//(context.record.try)/(context.record.splan);
	}

	
}