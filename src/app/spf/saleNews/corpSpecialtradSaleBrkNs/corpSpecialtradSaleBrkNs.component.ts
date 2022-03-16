/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CorpSpecialtradSaleBrkNs } 		from './shared/corpSpecialtradSaleBrkNs.model';
import { CorpSpecialtradSaleBrkNsService } from './shared/corpSpecialtradSaleBrkNs.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-corpSpecialtradSaleBrkNs',
	templateUrl: './corpSpecialtradSaleBrkNs.component.html',
	providers: [CorpSpecialtradSaleBrkNsService],
})
export class CorpSpecialtradSaleBrkNsComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: CorpSpecialtradSaleBrkNs = <CorpSpecialtradSaleBrkNs>{};

	//grid select model
	public gridModel: CorpSpecialtradSaleBrkNs = <CorpSpecialtradSaleBrkNs>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: CorpSpecialtradSaleBrkNs = <CorpSpecialtradSaleBrkNs>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: CorpSpecialtradSaleBrkNs = <CorpSpecialtradSaleBrkNs>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: CorpSpecialtradSaleBrkNs = <CorpSpecialtradSaleBrkNs>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: 'A', onlineChkNm: '온라인포함'},
		{onlineChk: 'N', onlineChkNm: '온라인제외'},
		{onlineChk: 'Y', onlineChkNm: '온라인전용'}
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

	constructor(private corpSpecialtradSaleBrkNsService: CorpSpecialtradSaleBrkNsService, public envService: EnvService ) { }
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
		//  this.frDate = '05/10/2020'
		//  this.paramModel.frDate = '20200510'		
		//  this.toDate = '05/11/2020'
		//  this.paramModel.toDate = '20200511'


       //점 콤보박스 셋팅
	   this.baseStoreCombo();

	   //점 기본값 세팅
	   //this.comboStoreLv1 = '01'

 
	}


	
	//달력 포멧 변경
	searchfrDayCmp: any;
	onReadysearchfrDay(event){
		this.searchfrDayCmp = event.cmp;
		this.searchfrDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//달력 포멧 변경
	searchtoDayCmp: any;
	onReadysearchtoDay(event){
		this.searchtoDayCmp = event.cmp;
		this.searchtoDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	// onChangeStartDt(date){
	// 	this.paramModel.frDate = this.envService.getDateToString(date.newDate);
	// }

	   //시작일 변경 이벤트
	   onChangeStartDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) > this.paramModel.toDate)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.searchfrDayCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
		}   
		else
		{         
		   this.paramModel.frDate = this.envService.getDateToString(date.newDate);
		}
		
	 }

	//종료일 변경 이벤트
	onChangeStartDtTo(date){
	//종료일이 시작일보다 클때
		// this.toDate.setvalue = date.oldDate
		  if (this.envService.getDateToString(date.newDate) < this.paramModel.frDate )
		 {
			Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
			// this.frDate 			= this.toDate
			// this.frDate = '03/10/2020' + this.paramModel.toDate.substring(1,2) 20200310
			// this.frDate = this.paramModel.toDate.substring(5,2) + '/'
            //             + this.paramModel.toDate.substring(7,2) + '/'
			// 			+ this.paramModel.toDate.substring(1,4)
			
			this.searchtoDayCmp.setValue(this.toDate);
			this.paramModel.frDate	= this.paramModel.toDate;
			
			// this.searchfrDayCmp.setValue(this.toDate);
			// this.frDate = this.toDate(date.oldDate);
			// this.frDate = '03/10/2020'
			
		// 	this.paramModel.frDate = this.envService.getDateToString(date.newDate);
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
		this.corpSpecialtradSaleBrkNsService.selectCorpSpecialtradSaleBrkNsList(this.paramModel).subscribe(
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
				this.corpSpecialtradSaleBrkNsService.deleteCorpSpecialtradSaleBrkNs(null).subscribe(
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
				this.corpSpecialtradSaleBrkNsService.saveCorpSpecialtradSaleBrkNs(null).subscribe(
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
		this.corpSpecialtradSaleBrkNsService.excelCorpSpecialtradSaleBrkNs(this.paramModel).subscribe(
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
		this.corpSpecialtradSaleBrkNsService.reportCorpSpecialtradSaleBrkNs(this.paramModel).subscribe(
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
		this.corpSpecialtradSaleBrkNsService.helpCorpSpecialtradSaleBrkNs(this.paramModel).subscribe(
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
		
		if(this.paramModel.jum == '' || this.paramModel.jum == null)
		{
			Ext.Msg.alert('Error!!', '점은 필수로 선택해야 합니다.');   
		}
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
		//this.paramModel.comboVal = data.newValue;
	}
}