/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CloseBefProfitInq } from './shared/closeBefProfitInq.model';
import { CloseBefProfitInqService } from './shared/closeBefProfitInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-closeBefProfitInq',
	templateUrl: './closeBefProfitInq.component.html',
	providers: [CloseBefProfitInqService],
})
export class CloseBefProfitInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: CloseBefProfitInq = <CloseBefProfitInq>{};

	//form model
	public formModel: CloseBefProfitInq = <CloseBefProfitInq>{};

	//grid select model
	public gridModel: CloseBefProfitInq = <CloseBefProfitInq>{};

    //점
    public comboStoreLv1: any = null;
	public comboStoreLv1Model: CloseBefProfitInq = <CloseBefProfitInq>{};
	public jumDisplay: boolean = true;

    //부
    public comboStoreLv2: any = null;
	public comboStoreLv2Model: CloseBefProfitInq = <CloseBefProfitInq>{};
	public buDisplay: boolean = true;

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: CloseBefProfitInq = <CloseBefProfitInq>{};
	public timDisplay: boolean = true;
	
	//PC
    public comboStoreLv4: any = null;
	public comboStoreLv4Model: CloseBefProfitInq = <CloseBefProfitInq>{};
	public pcDisplay: boolean = true;

	//코너
	public class1Display: boolean = true;

	//판매형태별 출력시에는 목표가 없기에 관련 필수 숨김
	public saleTry: boolean = false;	

	
	//판매형태
    public storeComboSaleForm: any = [
		{valueComboSaleForm: 'ALL', nameComboSaleForm: 'ALL'},
		{valueComboSaleForm: '01', nameComboSaleForm: '정상'},
		{valueComboSaleForm: '02', nameComboSaleForm: '세일'},
		{valueComboSaleForm: '03', nameComboSaleForm: '균일'}				
	  ]; 
	public comboSaleFormModel: CloseBefProfitInq = <CloseBefProfitInq>{};

	//온라인구분
	public storeComboOnlineForm: any =  [
		{valueComboOnlineForm: 'ALL', nameComboOnlineForm: 'ALL'},
		{valueComboOnlineForm: 'ON', nameComboOnlineForm: '온라인'},
		{valueComboOnlineForm: 'OFF', nameComboOnlineForm: '오프라인'}		
	  ];
	public comboOnlineFormModel: CloseBefProfitInq = <CloseBefProfitInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//전년 당년 으로 그리드 헤드 컬럼 2단구조 위한 변수
	public yearColumns = [];
	public lastYearColumns = [];

	constructor(private closeBefProfitInqService: CloseBefProfitInqService, public envService: EnvService ) { }
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
		this.baseOnlineFormCombo()	

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
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.closeBefProfitInqService.selectCloseBefProfitInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);

				/*조회 조건에 따른 그리드 보여주는 범위 지정*/				
				this.buDisplay=false;
				if(this.paramModel.bu != null && this.paramModel.bu != '')
				{
					this.timDisplay=false;
					this.buDisplay=true;
				}
				else
				{
					this.timDisplay=true;
				}
				if(this.paramModel.tim != null && this.paramModel.tim != '')
				{
					this.pcDisplay=false;
					this.buDisplay=true;
					this.timDisplay=true;
				}
				else
				{
					this.pcDisplay=true;
				}
				if(this.paramModel.pc != null && this.paramModel.pc != '')
				{
					this.class1Display=false;
					this.buDisplay=true;
					this.timDisplay=true;
					this.pcDisplay=true;
				}
				else
				{
					this.class1Display=true;
				}			
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
		this.closeBefProfitInqService.excelCloseBefProfitInq(this.paramModel).subscribe(
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
		this.closeBefProfitInqService.helpCloseBefProfitInq(this.paramModel).subscribe(
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
	   console.log(data.newValue)
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
	   console.log(data.newValue);
	   console.log(this.paramModel.saleForm);
	   if( this.paramModel.saleForm == 'ALL')
	   {
		   this.saleTry=false;
	   }
	   else
	   {
		   this.saleTry=true;
	   }	
   }


   //온라인구분(ALL) 기본 셋팅
   public onlineFormComboVal: any;
   baseOnlineFormCombo = () =>{
		this.onlineFormComboVal = this.storeComboSaleForm[0].nameComboSaleForm;
		this.paramModel.onlineForm = this.storeComboSaleForm[0].nameComboSaleForm;
   }

   //온라인구분 콤보박스 선택 이벤트
   comboOnlineFormEvent = (data) =>{
       this.paramModel.onlineForm = data.newValue;
       console.log(data.newValue)
   }


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