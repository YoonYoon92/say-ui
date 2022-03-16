/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { AppSayMsgCoupon } 		from './shared/appSayMsgCoupon.model';
import { AppSayMsgCouponService } from './shared/appSayMsgCoupon.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-appSayMsgCoupon',
	templateUrl: './appSayMsgCoupon.component.html',
	providers: [AppSayMsgCouponService],
})
export class AppSayMsgCouponComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: AppSayMsgCoupon = <AppSayMsgCoupon>{};

	//grid select model
	public gridModel: AppSayMsgCoupon = <AppSayMsgCoupon>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: AppSayMsgCoupon = <AppSayMsgCoupon>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: AppSayMsgCoupon = <AppSayMsgCoupon>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: AppSayMsgCoupon = <AppSayMsgCoupon>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: '9020860160109266', onlineChkNm: '9020860160109266'},
		{onlineChk: '9020860160109265', onlineChkNm: '9020860160109265'},
		{onlineChk: '9020860160109264', onlineChkNm: '9020860160109264'}
	]

	//조회일자
	public frDate: any = null;
	public toDate: any = null;

	public thisYyCol = [
		{
			text: '계획',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'thisYySplan',
			align: 'right',
			width:"40%",
			formatter:'number("0,000")'
		},
		{
			text: '매출',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'thisYyNetsale',
			align: 'right',
			width:"40%",
			formatter:'number("0,000")'
		},
		{
			text: '달성율',
			xtype: 'column',
			summary:'average',
			dataIndex: 'thisYyAchivmentrate',
			align: 'right',
			width:"20%",
			formatter:'number("000.00")'
		}
	];

	public yesterYyCol = [
		{
			text: '계획',
			xtype: 'column',
			summary:'sum',
			dataIndex: "lastYySplan",
			align: 'right',
			width:"40%",
			formatter:'number("0,000")'
		},
		{
			text: '매출',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'lastYyNetsale',
			align: 'right',
			width:"40%",
			formatter:'number("0,000")'
		},
		{
			text: '달성율',
			xtype: 'column',
			summary:'average',
			dataIndex: 'lastYyAchivmentrate',
			align: 'right',
			width:"20%",
			formatter:'number("000.00")'
		},
	];

	// constructor(public datepipe: DatePipe){}

	constructor(private appSayMsgCouponService: AppSayMsgCouponService, public envService: EnvService ) { }
	ngOnInit() { 
		//시작일자---
		this.frDate = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.frDate 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//종료일자---
		this.toDate = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.toDate 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//test
		//  this.frDate = '06/01/2020'
		//  this.paramModel.frDate = '20200601'		
		//  this.toDate = '06/01/2020'
		//  this.paramModel.toDate = '20200601'


       //점 콤보박스 셋팅
	   this.baseStoreCombo();

	   //점 기본값 세팅
	   //this.comboStoreLv1 = '01'
	   
	   
	}


	
	//달력 포멧 변경
	searchFrDayCmp: any;
	onReadyStartDt(event){
		this.searchFrDayCmp = event.cmp;
		this.searchFrDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//달력 포멧 변경
	searchToDayCmp: any;
	onReadyEndDt(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) > this.paramModel.toDate)
		{
			// console.log(date.oldDate);
			// console.log(this.searchFromDayCmp);
			this.searchFrDayCmp.setValue(date.oldDate);					
			Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');	
		}	
		else
		{			
			this.paramModel.frDate = this.envService.getDateToString(date.newDate);
		}
		
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) < this.paramModel.frDate)
		{
			this.searchToDayCmp.setValue(date.oldDate);			
			Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
		}
		else
		{
			this.paramModel.toDate = this.envService.getDateToString(date.newDate);
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
		this.appSayMsgCouponService.selectAppSayMsgCouponList(this.paramModel).subscribe(
			(res: any) => {
				console.log(res);
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
				console.log(err);
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
				this.appSayMsgCouponService.deleteAppSayMsgCoupon(null).subscribe(
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
				this.appSayMsgCouponService.saveAppSayMsgCoupon(null).subscribe(
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
		this.appSayMsgCouponService.excelAppSayMsgCoupon(this.paramModel).subscribe(
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
		this.appSayMsgCouponService.reportAppSayMsgCoupon(this.paramModel).subscribe(
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
		this.appSayMsgCouponService.helpAppSayMsgCoupon(this.paramModel).subscribe(
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
//    baseStoreCombo = () =>{
// 	this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
// 		(res: any) => {
// 			this.comboStoreLv1 = res;
// 			this.comboStoreLv1 = '01'
// 		},
// 		(err: HttpErrorResponse) => {
// 			Ext.Msg.alert('Error!!', 'Server communication error.');
// 		}
// 	);
// }
	
//조직(점) 기본 셋팅
	baseStoreCombo = () =>{
		this.comboStoreLv1Model.paramLvCd = '01';
		this.paramModel.jum = '01';
		this.paramModel.serchLevel = 'jum';
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

   //콤보박스 변경 이벤트
	onChangeComboBox(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.onlineChk = data.newValue;
	}
}