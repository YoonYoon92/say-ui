/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/





declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProfitAnalysisOfMarginRateChg } from './shared/profitAnalysisOfMarginRateChg.model';
import { ProfitAnalysisOfMarginRateChgList } from './shared/profitAnalysisOfMarginRateChgList.model';
import { ProfitAnalysisOfMarginRateChgService } from './shared/profitAnalysisOfMarginRateChg.service';
import { EnvService, ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchClassParam } from 'src/app/component/searchClass/shared/searchClassParam.model';
import { ProfitAnalysisOfMarginRateChgCls } from './shared/profitAnalysisOfMarginRateChgCls.model';

@Component({
	selector: 'app-profitAnalysisOfMarginRateChgInq',
	templateUrl: './profitAnalysisOfMarginRateChg.component.html',
	providers: [ProfitAnalysisOfMarginRateChgService],
})
export class ProfitAnalysisOfMarginRateChgComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	storeCd : string;
	buCd : string;
	orgTitle : string;

	//param model
	public paramModel: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};
	public clsParamModel: ProfitAnalysisOfMarginRateChgCls = <ProfitAnalysisOfMarginRateChgCls>{};

	public detailClsModel: ProfitAnalysisOfMarginRateChgCls = <ProfitAnalysisOfMarginRateChgCls>{};

	//grid select model
	public gridModel: ProfitAnalysisOfMarginRateChgList = <ProfitAnalysisOfMarginRateChgList>{};
	public searchClassParamModel: SearchClassParam = <SearchClassParam>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

	//PC(세분류)
    public comboStoreLv4: any = null;
    public comboStoreLv4Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

	//코너
	public comboStoreLv5: any = null;
	public comboStoreLv5Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

	//클래스 key
    public comboStoreLv6: any = null;
    public comboStoreLv6Model: ProfitAnalysisOfMarginRateChg = <ProfitAnalysisOfMarginRateChg>{};

	//grid store
	gridStore = new Ext.data.Store({});
	gridDetailStore = new Ext.data.Store({});	
	clsMarginStore = new Ext.data.Store({});

	//시작년월
	public startYM: any = null;

	//종료년월
	public endYM: any = null;

	prevMarginRate:number = 0;
	afterMarginRate:number = 0;

	searchClassCd:string = null;
	searchClassNm:string = null;

    netAmountSum: number = 0;
    profitAmountSum: number = 0;


	public performance = [];
	public marginChg = [];
	public sum = [];

	constructor(private profitAnalysisOfMarginRateChgService: ProfitAnalysisOfMarginRateChgService, public envService: EnvService, private cd: ChangeDetectorRef ) { }
	ngOnInit() { 
		//this.startDt = new Date(this.envService.getBeforeDate(30));
		this.startYM = new Date(this.envService.getBeforeDate(null));
		this.endYM = new Date(this.envService.getBeforeDate(null));
		//시작점 
		this.storeCd = '01';
		//this.paramModel.jum = this.storeCd;

		//조회 모델에 시작년월과 종료년월 기본값 셋팅
		this.paramModel.startYM 	= this.envService.getDateToString(this.envService.getBeforeDate(null)).substr(0,6);
		this.paramModel.endYM 	    = this.envService.getDateToString(this.envService.getBeforeDate(null)).substr(0,6);

       	//점/부 콤보박스 셋팅
	   	this.baseStoreCombo()	
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
		};
		
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

	//달력 포멧 한글로 변경
	searchEndYMCmp: any;
	onReadysearchEndYM(event){
		this.searchEndYMCmp = event.cmp;
		this.searchEndYMCmp.getPicker().setHeaderFormat('Y년m월');
	}

	//시작일 변경 이벤트
	onChangeStartYM(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.endYM)
	   {
		  this.searchStartYMCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.startYM = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndYM(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.startYM)
	   {
		  this.searchEndYMCmp.set
		  this.searchEndYMCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.endYM = this.envService.getDateToString(date.newDate);
	   }
	}

	prevMarginRateChange = (param) => {
		this.prevMarginRate = param.newValue;
		this.paramModel.prevMarginRate = param.newValue;
		this.cd.detectChanges();
	}

	afterMarginRateChange = (param) => {
		this.afterMarginRate = param.newValue;
		this.paramModel.afterMarginRate = param.newValue;
		this.cd.detectChanges();
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

	//grid row 선택 이벤트
	// onSelectGrid(row){
	// 	//row 데이터 model 바인딩
	// 	if(row.selected[0].data.orgName != '합계' && row.selected[0].data.orgName != '구성비' ) {
	// 		this.gridModel = row.selected[0].data;
	// 		// this.paramModel.detailInqOrgCd = this.gridModel.orgCd;

	// 		if(this.isCollapse != false) {
	// 			this.isCollapse = false;
	// 		}

	// 		// this.singleItemSalesInqService.selectSingleItemSalesInqDetail(this.paramModel).subscribe(
	// 		// 	(res: any) => {
	// 		// 		/**
	// 		// 		 * @success
	// 		// 		 */

	// 		// 		console.log('res:'+ JSON.stringify(res));

	// 		// 		this.gridDetailModel=res

	// 		// 		this.gridDetailStore.setData(res);
	// 		// 		//console.log('this.gridStore:' + this.gridDetailStore.getData());

	// 		// 		this.gridCmpDetail.setMasked(false);

	// 		// 	},
	// 		// 	(err: HttpErrorResponse) => {
	// 		// 		/**
	// 		// 		 * @error
	// 		// 		 */
	// 		// 		Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		// 		this.gridCmpDetail.setMasked(false);
	// 		// 	}
	// 		// );
	// 	};
	// }



	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		if(this.paramModel.classCd == null) {
			/**
					 * @error
					 */
			 Ext.Msg.alert('Error!!', '2번 조직에서 클래스key까지 선택하거나 3번 클래스를 입력하고 조회하세요.');
			 this.gridCmp.setMasked(false);

		} else {
			this.profitAnalysisOfMarginRateChgService.selectProfitAnalysisOfMarginRateChgList(this.paramModel).subscribe(
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
			//클래스 정보 조회
			this.clsParamModel.jum = this.paramModel.jum;
			this.clsParamModel.cls1 = this.paramModel.classCd.substr(0,5);
			this.clsParamModel.cls2 = this.paramModel.classCd.substr(5,2);

			this.profitAnalysisOfMarginRateChgService.selectDetailClsList(this.clsParamModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.detailClsModel=res;
					console.log(this.detailClsModel)
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
					this.gridCmp.setMasked(false);
					}
				);
				this.profitAnalysisOfMarginRateChgService.selectDetailClsMargin(this.clsParamModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
						this.clsMarginStore=res;
						console.log(this.clsMarginStore)
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
		this.clearSearchClass(data.newValue);
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
		this.clearSearchClass(data.newValue);
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
		this.clearSearchClass(data.newValue);
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
		this.clearSearchClass(data.newValue);
		this.paramModel.cornerCd = data.newValue;
			//조직(코너) 조회
			this.comboStoreLv6Model.paramLvCd = this.storeCd + data.newValue;
			this.envService.selectStoreComboLv6List(this.comboStoreLv6Model).subscribe(
				(res: any) => {
					//조직(팀) data set
					this.comboStoreLv6 = res;
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
	}


	//클래스Key 콤보박스 선택 이벤트
	comboStoreLv6Event = (data) =>{	
		this.clearSearchClass(data.newValue);	
		this.paramModel.classkeyCd = data.newValue;
		this.paramModel.classCd = this.paramModel.cornerCd + this.paramModel.classkeyCd
		this.paramModel.classNm = data.newValue.classNm;
		console.log(data.newValue)
	}


	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	searchClass=(event)=>{
		this.paramModel.classCd=null;
		this.paramModel.classNm=null;
		this.isDialogShowing = true;
		this.searchClassParamModel.jum = this.storeCd;
		this.cd.detectChanges();
	}
	
	
	classSelected=(event)=>{
		this.searchClassCd=event.classNo;
		this.searchClassNm=event.className;
		this.paramModel.classCd =event.classNo;
		this.paramModel.classNm =event.className;
		console.log(event);
		// this.buCd = null;
		this.cd.detectChanges();
	}

	closeClass(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}

	clearSearchClass(value) {
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