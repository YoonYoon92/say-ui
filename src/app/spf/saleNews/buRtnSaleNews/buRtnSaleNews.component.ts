/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { BuRtnSaleNews } 		from './shared/buRtnSaleNews.model';
import { BuRtnSaleNewsService } from './shared/buRtnSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
	selector: 'app-buRtnSaleNews',
	templateUrl: './buRtnSaleNews.component.html',
	providers: [BuRtnSaleNewsService],
})
export class BuRtnSaleNewsComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: BuRtnSaleNews = <BuRtnSaleNews>{};

	//grid select model
	public gridModel: BuRtnSaleNews = <BuRtnSaleNews>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: BuRtnSaleNews = <BuRtnSaleNews>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: BuRtnSaleNews = <BuRtnSaleNews>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: BuRtnSaleNews = <BuRtnSaleNews>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: 'A', onlineChkNm: '온라인포함'},
		{onlineChk: 'N', onlineChkNm: '온라인제외'},
		{onlineChk: 'Y', onlineChkNm: '온라인전용'}
	]

	//조회일자
	public searchDay: any = null;
	public searchDayTo: any = null;

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

	constructor(private buRtnSaleNewsService: BuRtnSaleNewsService, public envService: EnvService ) { }

	renderSign = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value/1000, '0,000');

		var col = '';
		var backCol = '';
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

	ngOnInit() { 
		//시작일자---
		this.searchDay = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.searchDay 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//종료일자---
		this.searchDayTo = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.searchDayTo 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//test
		// this.searchDay = '07/01/2020'
		// this.paramModel.searchDay = '20200701'		
		// this.searchDayTo = '07/07/2020'
		// this.paramModel.searchDayTo = '20200707'

       //점 콤보박스 셋팅
	   this.baseStoreCombo();

	   //점 기본값 세팅
	   //this.comboStoreLv1 = '01'
	   
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

	//종료일 변경 이벤트
	onChangeStartDtTo(date){
		this.paramModel.searchDayTo = this.envService.getDateToString(date.newDate);
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
		//iframe hide/show
		Ext.getCmp('pdfpanel').hide();
		Ext.getCmp('schpanel').show();
		
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.buRtnSaleNewsService.selectBuRtnSaleNewsList(this.paramModel).subscribe(
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
				this.buRtnSaleNewsService.deleteBuRtnSaleNews(null).subscribe(
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
				this.buRtnSaleNewsService.saveBuRtnSaleNews(null).subscribe(
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

	//레포트 버튼 이벤트
	onTapPdfQuery(event){
		// this.pdfUrl = `http://localhost:8000/api/buRtnSaleNews/selectReport?param=${JSON.stringify(this.paramModel)}`;
		this.pdfUrl = this.buRtnSaleNewsService.reportBuRtnSaleNews(this.paramModel);
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));            //set url
		console.log(this.pdfUrl);
		//iframe hide/show
		Ext.getCmp('pdfpanel').show();
		Ext.getCmp('schpanel').hide();
	}


	// //엑셀 버튼 이벤트
	onTapExcel(event){
		let url = this.buRtnSaleNewsService.excelBuRtnSaleNews(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
 	}

	//CSV 버튼 이벤트
	onTapCsv(event) {
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		let url = this.buRtnSaleNewsService.csvBuRtnSaleNews(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
 	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		let url = this.buRtnSaleNewsService.helpBuRtnSaleNews();
		console.log(url);
		window.open(url, '한글 PDF');
	}
	
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
		//this.paramModel.comboVal = data.newValue;
	}
}