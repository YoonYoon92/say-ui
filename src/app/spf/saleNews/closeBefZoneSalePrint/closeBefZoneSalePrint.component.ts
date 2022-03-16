/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CloseBefZoneSalePrint } from './shared/closeBefZoneSalePrint.model';
import { CloseBefZoneSalePrintService } from './shared/closeBefZoneSalePrint.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-CloseBefZoneSalePrint',
	templateUrl: './CloseBefZoneSalePrint.component.html',
	providers: [CloseBefZoneSalePrintService],
})
export class CloseBefZoneSalePrintComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};

	//form model
	public formModel: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};

	//grid select model
	public gridModel: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};

    //점
    public comboStoreLv1: any = null;
	public comboStoreLv1Model: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};	

    //부
    public comboStoreLv2: any = null;
	public comboStoreLv2Model: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};	
    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};	
	
	//PC
    public comboStoreLv4: any = null;
	public comboStoreLv4Model: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};	

	
	//출력구분
    public storeComboSaleForm: any = [
		{valueComboSaleForm: '01', nameComboSaleForm: '이익액'},
		{valueComboSaleForm: '02', nameComboSaleForm: '객단가'},			
	  ]; 
	public comboSaleFormModel: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};

	//온라인구분
	// public storeComboOnlineForm: any =  [
	// 	{valueComboOnlineForm: 'ALL', nameComboOnlineForm: 'ALL'},
	// 	{valueComboOnlineForm: 'ON', nameComboOnlineForm: '온라인'},
	// 	{valueComboOnlineForm: 'OFF', nameComboOnlineForm: '오프라인'}		
	//   ];
	// public comboOnlineFormModel: CloseBefZoneSalePrint = <CloseBefZoneSalePrint>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//전년 당년 으로 그리드 헤드 컬럼 2단구조 위한 변수
	public yearColumns = [];
	public lastYearColumns = [];
	public lastYearColumns1 = [];
	public lastYearColumns2 = [];

	constructor(private CloseBefZoneSalePrintService: CloseBefZoneSalePrintService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.fromDate 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.toDate 		= this.envService.getDateToString(null);
		//점 콤보박스 셋팅
		this.baseStoreCombo()
		//판매형태 콤보박스 셋팅
		this.baseSaleFormCombo()
		//온라인구분 콤보박스 셋팅
		// this.baseOnlineFormCombo()	

	}


	
	//시작일 변경 이벤트
	onChangeStartDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) > this.paramModel.toDate)
		{
			this.searchFromDayCmp.setValue(date.oldDate);					
			Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');	
		}	
		else
		{			
			this.paramModel.fromDate = this.envService.getDateToString(date.newDate);
		}
		
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) < this.paramModel.fromDate)
		{
			// console.log(date.oldDate);
			// console.log(this.searchFromDayCmp);
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
		this.CloseBefZoneSalePrintService.selectCloseBefZoneSalePrintList(this.paramModel).subscribe(
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

	//출력 버튼 이벤트
	onTapPDFQuery(event){		
		//this.pdfUrl = `http://localhost:8000/api/closeBefZoneSalePrint/reportCloseBefZoneSalePrintList?param=${JSON.stringify(this.paramModel)}`;
		this.pdfUrl = this.CloseBefZoneSalePrintService.reportCloseBefZoneSalePrint(this.paramModel);
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
		console.log(this.pdfUrl);
		//iframe hide/show
		Ext.getCmp('pdfpanel').show();
		Ext.getCmp('schpanel').hide();		
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){		
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		let url = this.CloseBefZoneSalePrintService.excelCloseBefZoneSalePrint(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		let url = this.CloseBefZoneSalePrintService.helpCloseBefZoneSalePrint();
		console.log(url);
  
		window.open(url, '한글 PDF');
	}

	//달력 포멧 한글로 변경
	searchFromDayCmp: any;
	onReadysearchFromDay(event){
		this.searchFromDayCmp = event.cmp;
		this.searchFromDayCmp.getPicker().setHeaderFormat('Y년m월d일');
		this.searchFromDayCmp.getPicker().setNextText('다음달');
		this.searchFromDayCmp.getPicker().setPrevText('이전달');
	}

	//달력 포멧 한글로 변경
	searchToDayCmp: any;
	onReadysearchToDay(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
		this.searchToDayCmp.getPicker().setNextText('다음달');
		this.searchToDayCmp.getPicker().setPrevText('이전달');
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
	    //조직(PC) 조회
	    this.comboStoreLv4Model.paramLvCd = data.newValue;
	    this.envService.selectStoreComboLv4List(this.comboStoreLv4Model).subscribe(
		    (res: any) => {
			    //조직(팀) data set
			    this.comboStoreLv4 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

      //PC 콤보박스 선택 이벤트
   comboStoreLv4Event = (data) =>{
       this.paramModel.pc = data.newValue;
   }


   //판매형태(ALL) 기본 셋팅
   public saleFormComboVal: string;
   baseSaleFormCombo = () =>{
		this.saleFormComboVal = this.storeComboSaleForm[0].nameComboSaleForm;
		this.paramModel.saleForm = this.storeComboSaleForm[0].nameComboSaleForm;
   }

   //판매형태 콤보박스 선택 이벤트
   comboSaleFormEvent = (data) =>{
       this.paramModel.saleForm = data.newValue;
   }


   //온라인구분(ALL) 기본 셋팅
//    public onlineFormComboVal: any;
//    baseOnlineFormCombo = () =>{
// 		this.onlineFormComboVal = this.storeComboOnlineForm[0].nameComboOnlineForm;
// 		this.paramModel.onlineForm = this.storeComboOnlineForm[0].nameComboOnlineForm;
//    }

   //온라인구분 콤보박스 선택 이벤트
//    comboOnlineFormEvent = (data) =>{
//        this.paramModel.onlineForm = data.newValue;
//    }


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


   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}