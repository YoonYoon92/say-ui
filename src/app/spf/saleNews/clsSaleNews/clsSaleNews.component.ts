/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ClsSaleNews } from './shared/clsSaleNews.model';
import { ClsSaleNewsService } from './shared/clsSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-clsSaleNews',
	templateUrl: './clsSaleNews.component.html',
	providers: [ClsSaleNewsService],
})
export class ClsSaleNewsComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ClsSaleNews = <ClsSaleNews>{};

	//grid select model
	public gridModel: ClsSaleNews = <ClsSaleNews>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: ClsSaleNews = <ClsSaleNews>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: ClsSaleNews = <ClsSaleNews>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: ClsSaleNews = <ClsSaleNews>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: 'A', onlineChkNm: '온라인합산'},
		{onlineChk: 'N', onlineChkNm: '온라인제외'},
		{onlineChk: 'Y', onlineChkNm: '온라인전용'}
	]

	//조회일자
	public searchDay: any = null;

	public dayCol = [
		{
			text: '할인',
			xtype: 'column',
			dataIndex: 'dayAchivmentrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		},
		{
			text: '순매출',
			xtype: 'column',
			dataIndex: 'dayNetsale',
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '월실적',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'dayLastyearSplan',
			align: 'right',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '년실적',
			xtype: 'column',
			dataIndex: 'dayIncrsrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		}
	];

	public monthCol = [
		{
			text: '목표',
			xtype: 'column',
			dataIndex: "mmTry",
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '실적',
			xtype: 'column',
			dataIndex: 'mmNetsale',
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '달성율',
			xtype: 'column',
			dataIndex: 'mmAchivmentrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		},
		{
			text: '전년실적',
			xtype: 'column',
			dataIndex: 'mmLastyearSplan',
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '신장율',
			xtype: 'column',
			dataIndex: 'mmIncrsrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		}
	];

	public yearCol = [
		{
			text: '목표',
			xtype: 'column',
			dataIndex: "yyTry",
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '실적',
			xtype: 'column',
			dataIndex: 'yyNetsale',
			align: 'right',
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '달성율',
			xtype: 'column',
			dataIndex: 'yyAchivmentrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		},
		{
			text: '전년실적',
			xtype: 'column',
			dataIndex: 'yyLastyearSplan',
			align: 'right',
			width:"150",
			summary:'sum',
			summaryFormatter:'number("0,000")',
			formatter:'number("0,000")'
		},
		{
			text: '신장율',
			xtype: 'column',
			dataIndex: 'yyIncrsrate',
			align: 'right',
			summaryFormatter:'number("000.00")',
			formatter:'number("000.00")'
		}
	];

	constructor(private clsSaleNewsService: ClsSaleNewsService, public envService: EnvService ) { }
	ngOnInit() { 
		this.searchDay = new Date(this.envService.getBeforeDate(null));
		
		//조회일자 셋팅
		this.paramModel.searchDay 	= this.envService.getDateToString(this.envService.getBeforeDate(null));
		//test
		// this.searchDay = '04/27/2020'

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
		this.clsSaleNewsService.selectClsSaleNewsList(this.paramModel).subscribe(
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
				this.clsSaleNewsService.deleteClsSaleNews(null).subscribe(
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
				this.clsSaleNewsService.saveClsSaleNews(null).subscribe(
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
		this.clsSaleNewsService.excelClsSaleNews(this.paramModel).subscribe(
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
		this.clsSaleNewsService.reportClsSaleNews(this.paramModel).subscribe(
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
		this.clsSaleNewsService.helpClsSaleNews(this.paramModel).subscribe(
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


//    //조직(점) 기본 셋팅
//    baseStoreCombo = () =>{
// 	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
// 		    (res: any) => {
// 		    this.comboStoreLv1 = res;
// 		    },
// 		    (err: HttpErrorResponse) => {
// 		        Ext.Msg.alert('Error!!', 'Server communication error.');
// 		    }
// 	    );
//    }

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