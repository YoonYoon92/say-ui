/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SingleItemSalesInq } from './shared/singleItemSalesInq.model';
import { SingleItemSalesInqList } from './shared/singleItemSalesInqList.model';
import { SingleItemSalesInqService } from './shared/singleItemSalesInq.service';
import { EnvService, ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCcpyParam } from 'src/app/component/searchCcpy/shared/searchCcpyParam.model';

@Component({
	selector: 'app-singleItemSalesInq',
	templateUrl: './singleItemSalesInq.component.html',
	providers: [SingleItemSalesInqService],
})
export class SingleItemSalesInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	storeCd : string;
	orgTitle : string;

	isCollapse: boolean = true;
	isComboHidden: boolean = true;


	//param model
	public paramModel: SingleItemSalesInq = <SingleItemSalesInq>{};

	//grid select model
	public gridModel: SingleItemSalesInqList = <SingleItemSalesInqList>{};
	public searchCcpyParamModel: SearchCcpyParam = <SearchCcpyParam>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: SingleItemSalesInq = <SingleItemSalesInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: SingleItemSalesInq = <SingleItemSalesInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: SingleItemSalesInq = <SingleItemSalesInq>{};

	//PC(세분류)
    public comboStoreLv4: any = null;
    public comboStoreLv4Model: SingleItemSalesInq = <SingleItemSalesInq>{};

	//코너
	public comboStoreLv5: any = null;
	public comboStoreLv5Model: SingleItemSalesInq = <SingleItemSalesInq>{};

	//클래스 key
    public comboStoreLv6: any = null;
    public comboStoreLv6Model: SingleItemSalesInq = <SingleItemSalesInq>{};

	//품목코드 대분류
    public comboItemStoreLv1: any = null;
    public comboItemStoreLv1Model: SingleItemSalesInq = <SingleItemSalesInq>{};

    //부
    public comboItemStoreLv2: any = null;
    public comboItemStoreLv2Model: SingleItemSalesInq = <SingleItemSalesInq>{};

    //팀
    public comboItemStoreLv3: any = null;
    public comboItemStoreLv3Model: SingleItemSalesInq = <SingleItemSalesInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	gridDetailStore = new Ext.data.Store({});	

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public dispositType = [];
	public salesType = [];
	public sum = [];

	constructor(private singleItemSalesInqService: SingleItemSalesInqService, public envService: EnvService, private cd: ChangeDetectorRef ) { }
	ngOnInit() { 
		//this.startDt = new Date(this.envService.getBeforeDate(30));
		this.startDt = new Date();
		this.endDt = new Date();
		this.storeCd = '01';

		//조회 모델에 시작일과 종료일 기본값 셋팅
		//this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       	//점 콤보박스 셋팅
	   	this.baseStoreCombo()
	   	//시작점 
		this.storeCd = "01";
		//this.paramModel.jum = this.storeCd;
		this.baseBuCombo();
		this.chgGridColumnName();
		//품목코드 대분류 콤보박스 셋팅
		this.baseLCatCombo()
	
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
	searchFromDayCmp: any;
	onReadysearchFromDay(event){
		this.searchFromDayCmp = event.cmp;
		this.searchFromDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//달력 포멧 한글로 변경
	searchToDayCmp: any;
	onReadysearchToDay(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.endDt)
	   {
		  this.searchFromDayCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
	   {
		  this.searchToDayCmp.set
		  this.searchToDayCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	   }
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

		this.isCollapse = true;

		this.singleItemSalesInqService.selectSingleItemSalesInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */

				console.log('res:'+ res);


				this.gridModel=res
				this.gridStore.setData(res);
				console.log('res:' + this.gridStore);
				this.gridCmp.setMasked(false);

				this.chgGridColumnName();
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
		this.paramModel.bu = data.newValue;	   
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
		
		this.paramModel.classKeyCd = data.newValue;
		console.log(data.newValue)
	}


	//품목코드(대분류) 기본 셋팅
	baseLCatCombo = () =>{
		this.singleItemSalesInqService.selectStoreComboLargeCatList(this.paramModel).subscribe(
			(res: any) => {
				this.comboItemStoreLv1 = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

	//품목코드(대분류)  콤보박스 선택 이벤트
	comboStoreLCatEvent = (data) =>{
		this.paramModel.lcatCd = data.newValue;
			//조직(부) 조회
			this.comboItemStoreLv2Model.lcatCd = data.newValue;
			this.singleItemSalesInqService.selectStoreComboMidiumCatList(this.comboItemStoreLv2Model).subscribe(
				(res: any) => {
					//하위 콤보박스를 전부 초기화 한다
					this.comboItemStoreLv3 = null;	
					//중분류 data set
					this.comboItemStoreLv2 = res;
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
	}

	//품목코드(중분류) 콤보박스 선택 이벤트
	comboStoreMCatEvent = (data) =>{
		this.paramModel.mcatCd = data.newValue;
			//조직(부) 조회
			this.comboItemStoreLv3Model.mcatCd = data.newValue;
			this.singleItemSalesInqService.selectStoreComboSmallCatList(this.comboItemStoreLv3Model).subscribe(
				(res: any) => {
					//소분류 data set
					this.comboItemStoreLv3 = res;
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
	}


	//품목코드(소분류) 콤보박스 선택 이벤트
	comboStoreSCatEvent = (data) =>{
		this.paramModel.scatCd = data.newValue;
		console.log(data.newValue)
	}

	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

   	chgGridColumnName(){
	   	if(this.paramModel.pc != null) {
		   	this.orgTitle = "코 너 명";
	   	} 
	   	else if (this.paramModel.tim != null) {
			this.orgTitle = "세분류명";
	   	}
	   	else if (this.paramModel.bu != null) {
			this.orgTitle = "팀    명";
   		}
		else if (this.paramModel.jum != null) {
			this.orgTitle = "부    명";
   		};
  	}

	onTabDetailInqClosed(event){
    	this.isCollapse = !this.isCollapse;
	}

	searchPartner=(event)=>{
		this.paramModel.partner=null;
		this.paramModel.partnerNm=null;
		this.isDialogShowing = true;
		this.searchCcpyParamModel.jum = this.storeCd;
		console.log(this.searchCcpyParamModel.jum);
		this.cd.detectChanges();
		//event= this.paramModel.partnerNm
	}

	partnerSelected=(event)=>{
		this.paramModel.partner=event.ccpy;
		this.paramModel.partnerNm=event.cmpNm;
		console.log(event)
	}

	closeCcpy(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}
		  

}