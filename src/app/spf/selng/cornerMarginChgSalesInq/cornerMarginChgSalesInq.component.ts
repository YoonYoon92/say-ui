/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* 수정내용     : '' 
*/





declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CornerMarginChgSalesInq } from './shared/cornerMarginChgSalesInq.model';
import { CornerMarginChgSalesInqList } from './shared/cornerMarginChgSalesInqList.model';
import { CornerMarginChgSalesInqService } from './shared/cornerMarginChgSalesInq.service';
import { EnvService, ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchConerParam } from 'src/app/component/searchConer/shared/searchConerParam.model';

@Component({
	selector: 'app-cornerMarginChgSalesInq',
	templateUrl: './cornerMarginChgSalesInq.component.html',
	providers: [CornerMarginChgSalesInqService],
})
export class CornerMarginChgSalesInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	storeCd : string;
	buCd : string;
	orgTitle : string;

	//param model
	public paramModel: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

	//grid select model
	public gridModel: CornerMarginChgSalesInqList = <CornerMarginChgSalesInqList>{};
	public searchConerParamModel: SearchConerParam = <SearchConerParam>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

	//PC(세분류)
    public comboStoreLv4: any = null;
    public comboStoreLv4Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

	//코너
	public comboStoreLv5: any = null;
	public comboStoreLv5Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

	//클래스 key
    public comboStoreLv6: any = null;
    public comboStoreLv6Model: CornerMarginChgSalesInq = <CornerMarginChgSalesInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	gridDetailStore = new Ext.data.Store({});	

	//시작년월
	public startYM: any = null;

	prevMarginRate:number = 0;
	afterMarginRate:number = 0;

	searchConerCd:string = null;
	searchConerNm:string = null;

    netAmountSum: number = 0;
    profitAmountSum: number = 0;


	public performance = [];
	public marginChg = [];
	public sum = [];

	constructor(private cornerMarginChgSalesInqService: CornerMarginChgSalesInqService, public envService: EnvService, private cd: ChangeDetectorRef ) { }
	ngOnInit() { 

		this.startYM = new Date(this.envService.getBeforeDate(null));
		//시작점 
		this.storeCd = '01';

		//조회 모델에 시작년월과 종료년월 기본값 셋팅
		this.paramModel.yyyymm 	= this.envService.getDateToString(this.envService.getBeforeDate(null)).substr(0,6);

       	//점/부 콤보박스 셋팅
	   	this.baseStoreCombo();	
		this.baseBuCombo();
	
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
		}
		
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
	searchStartYMCmp: any;
	onReadysearchStartYM(event){
		this.searchStartYMCmp = event.cmp;
		this.searchStartYMCmp.getPicker().setHeaderFormat('Y년m월');
	}

	//시작일 변경 이벤트
	onChangeStartYM(date){	
		   this.paramModel.yyyymm = this.envService.getDateToString(date.newDate);		
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

		if(this.paramModel.conerCd == null) {
			/**
					 * @error
					 */
			 Ext.Msg.alert('Error!!', '2번 조직에서 코너까지 선택하거나 3번 코너를 입력하고 조회하세요.');
			 this.gridCmp.setMasked(false);

		} else {

			this.cornerMarginChgSalesInqService.selectCornerMarginChgSalesInqList(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
	
					console.log('res:'+ res);
	
	
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

	//조직(부) 기본 셋팅
	baseBuCombo = () =>{
		this.paramModel.jum = this.storeCd;
		this.comboStoreLv2Model.paramLvCd = this.storeCd;
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

	//점 콤보박스 선택 이벤트
	comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
			//조직(부) 조회
			this.comboStoreLv2Model.paramLvCd = data.newValue;
			this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
				(res: any) => {
					//하위 콤보박스를 전부 초기화 한다
					this.comboStoreLv3 = null;	
					this.comboStoreLv4 = null;
					this.comboStoreLv5 = null;
					this.comboStoreLv6 = null;
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
		this.clearSearchConer(data.newValue);
		this.paramModel.bu = data.newValue;	   
		this.buCd = data.newValue;	   
			//조직(팀) 조회
			this.comboStoreLv3Model.paramLvCd = data.newValue;
			this.envService.selectStoreComboLv3List(this.comboStoreLv3Model).subscribe(
				(res: any) => {
					//하위 콤보박스를 전부 초기화 한다
					this.comboStoreLv4 = null;	
					this.comboStoreLv5 = null;	
					this.comboStoreLv6 = null;	
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
		this.clearSearchConer(data.newValue);
		this.paramModel.tim = data.newValue;	
			//조직(pc) 조회
			this.comboStoreLv4Model.paramLvCd = data.newValue;
			this.envService.selectStoreComboLv4List(this.comboStoreLv4Model).subscribe(
				(res: any) => {
					//하위 콤보박스를 전부 초기화 한다
					this.comboStoreLv5 = null;	
					this.comboStoreLv6 = null;
					//조직(팀) data set
					this.comboStoreLv4 = res;
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
	}

	//PC(세분류) 콤보박스 선택 이벤트
	comboStoreLv4Event = (data) =>{
		this.clearSearchConer(data.newValue);
		this.paramModel.pc = data.newValue;
		//조직(코너) 조회
		this.comboStoreLv5Model.paramLvCd = data.newValue;
		this.envService.selectStoreComboLv5List(this.comboStoreLv5Model).subscribe(
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				this.comboStoreLv6 = null;
				//조직(팀) data set
				this.comboStoreLv5 = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

	//코너 콤보박스 선택 이벤트
	comboStoreLv5Event = (data) =>{
		this.clearSearchConer(data.newValue);
		this.paramModel.conerCd = data.newValue;
		//조직(코너) 조회
		this.comboStoreLv6Model.paramLvCd = this.storeCd + data.newValue;
		this.searchConerCd = null;
		this.searchConerNm = null;
	}


	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	searchConer=(event)=>{
		this.paramModel.conerCd=null;
		this.paramModel.conerNm=null;
		this.isDialogShowing = true;
		this.searchConerParamModel.jum = this.storeCd;
		this.cd.detectChanges();
	}
	
	
	conerSelected=(event)=>{
		this.searchConerCd=event.conerNo;
		this.searchConerNm=event.conerName;
		this.paramModel.conerCd =event.conerNo;
		this.paramModel.conerNm =event.conerName;
		console.log(event);
		this.buCd = null;
		// this.buCd = null;
		this.cd.detectChanges();
	}

	closeConer(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}

	clearSearchConer(value) {
		console.log('clear:' + value);
		if(value != null || value != "") {
			// this.searchClassCd = null;
			// this.searchClassNm = null;
		}
	}

	summaryRendererNet = (value, record) => {
		this.netAmountSum = value;

		var formattedValue = Ext.util.Format.number(value , '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	summaryRendererProfit = (value, record) => {
		this.profitAmountSum = value;

		var formattedValue = Ext.util.Format.number(value , '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	summaryRate = (value, record) => {

		var formattedValue = Ext.util.Format.number((this.profitAmountSum / this.netAmountSum)*100, '0,000.00 %');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	summarizeTitle = (grid, context) => '합  계';
	  

}