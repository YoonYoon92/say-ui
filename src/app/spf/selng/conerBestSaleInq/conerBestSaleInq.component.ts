/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ConerBestSaleInq } from './shared/conerBestSaleInq.model';
import { ConerBestSaleInqService } from './shared/conerBestSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-conerBestSaleInq',
	templateUrl: './conerBestSaleInq.component.html',
	providers: [ConerBestSaleInqService],
})
export class ConerBestSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ConerBestSaleInq = <ConerBestSaleInq>{};

	//grid select model
	public gridModel: ConerBestSaleInq = <ConerBestSaleInq>{};

	//grid select model
	public formModel: ConerBestSaleInq = <ConerBestSaleInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ConerBestSaleInq = <ConerBestSaleInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ConerBestSaleInq = <ConerBestSaleInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ConerBestSaleInq = <ConerBestSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//매출하한선 콤보 스토어
    public storeComboSaleForm: any = [
		{valueComboSaleForm: '0', nameComboSaleForm: 'ALL'},
		{valueComboSaleForm: '10000000', nameComboSaleForm: '1000만원'},
		{valueComboSaleForm: '15000000', nameComboSaleForm: '1500만원'},
		{valueComboSaleForm: '20000000', nameComboSaleForm: '2000만원'},	
		{valueComboSaleForm: '25000000', nameComboSaleForm: '2500만원'},		
		{valueComboSaleForm: '30000000', nameComboSaleForm: '3000만원'},		
		{valueComboSaleForm: '35000000', nameComboSaleForm: '3500만원'},		
		{valueComboSaleForm: '40000000', nameComboSaleForm: '4000만원'},		
		{valueComboSaleForm: '45000000', nameComboSaleForm: '4500만원'},		
		{valueComboSaleForm: '50000000', nameComboSaleForm: '5000만원'},					
	  ]; 
	public comboSaleFormModel: ConerBestSaleInq = <ConerBestSaleInq>{};


	//매출기준 콤보 스토어
	public storeComboBaseForm: any = [
		{valueComboBaseForm: 'totalSale', nameComboBaseForm: '총매출'},
		{valueComboBaseForm: 'netSale', nameComboBaseForm: '순매출'},				
	]; 
	public comboBaseFormModel: ConerBestSaleInq = <ConerBestSaleInq>{};



   //매출하한선(ALL) 기본 셋팅
   public saleFormComboVal: string;
   baseSaleFormCombo = () =>{
		this.saleFormComboVal = this.storeComboSaleForm[0].nameComboSaleForm;
		this.paramModel.saleLimit = this.storeComboSaleForm[0].valueComboSaleForm;
   }

   //매출구분 기본 셋팅
   public baseFormComboVal: string;
   baseFormCombo = () =>{
		this.baseFormComboVal = this.storeComboBaseForm[1].nameComboBaseForm;
		this.paramModel.gubun = this.storeComboBaseForm[1].valueComboBaseForm;
   }



	constructor(private conerBestSaleInqService: ConerBestSaleInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo();
	   //매출하한선 콤보박스 셋팅
	   this.baseSaleFormCombo();
	   //매출구분 콤보박스 셋팅
	   this.baseFormCombo();	
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
		this.conerBestSaleInqService.selectConerBestSaleInqList(this.paramModel).subscribe(
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
		this.conerBestSaleInqService.excelConerBestSaleInq(this.paramModel).subscribe(
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
		this.conerBestSaleInqService.helpConerBestSaleInq(this.paramModel).subscribe(
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
       console.log(data.newValue)
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }


   //매출하한선 콤보박스 선택 이벤트
   comboSaleFormEvent = (data) =>{
		this.paramModel.saleLimit = data.newValue;
		console.log(data.newValue);
		console.log(this.paramModel.saleLimit);
		// if( this.paramModel.saleLimit == 'ALL')
		// {
		// 	this.paramModel.saleLimit='0';
		// }
	}

   //매출구분 콤보박스 선택 이벤트
	comboBaseFormEvent = (data) =>{
		this.paramModel.gubun = data.newValue;
		console.log(data.newValue);
		console.log(this.paramModel.gubun);

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




}