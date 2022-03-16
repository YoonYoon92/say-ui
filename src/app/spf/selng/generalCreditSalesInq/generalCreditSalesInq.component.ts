/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { GeneralCreditSalesInq } from './shared/generalCreditSalesInq.model';
import { GeneralCreditSalesInqList } from './shared/generalCreditSalesInqList.model';
import { GeneralCreditSalesInqService } from './shared/generalCreditSalesInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-generalCreditSalesInq',
	templateUrl: './generalCreditSalesInq.component.html',
	providers: [GeneralCreditSalesInqService],
})
export class GeneralCreditSalesInqComponent implements OnInit {

	@Input() public route: any;

	storeCd : string;

	//param model
	public paramModel: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

	//grid select model
	public gridModel: GeneralCreditSalesInqList = <GeneralCreditSalesInqList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

	//PC(세분류)
    public comboStoreLv4: any = null;
    public comboStoreLv4Model: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

	//클래스 key
    public comboStoreLv6: any = null;
    public comboStoreLv6Model: GeneralCreditSalesInq = <GeneralCreditSalesInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	gridDetailStore = new Ext.data.Store({});	

	saleClsStore = new Ext.data.Store({
		//data 속성의 json object에 정의된 key 값들과 매칭시켜줍니다.
		fields : ['saleClsCd','saleClsNm'],
		//저장공간에 fix값으로 data 속성에 json array type으로 담아줍니다.
		data : [{
					saleClsCd : '1',
					saleClsNm : '일반외상'
				},{
					saleClsCd : '2',
					saleClsNm : '사용매출'
				},{
					saleClsCd : '3',
					saleClsNm : '특판'
				},{
					saleClsCd : '4',
					saleClsNm : 'COD'
				}]}
	);	

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public dispositType = [];
	public salesType = [];
	public sum = [];

	constructor(private generalCreditSalesInqService: GeneralCreditSalesInqService, public envService: EnvService ) { }
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
	onSelectGrid(row){
	// 	//row 데이터 model 바인딩
	// 	if(row.selected[0].data.orgName != '합계' && row.selected[0].data.orgName != '구성비' ) {
	// 		this.gridModel = row.selected[0].data;
	// 		this.paramModel.detailInqOrgCd = this.gridModel.orgCd;

	// 		//console.log("this.gridModel.orgCd.length: "+this.gridModel.orgCd.length);
	// 		if(this.gridModel.orgCd.length > 10) {
	// 			this.isComboHidden = false;	
	// 			this.baseClassCombo();	
	// 		} else {
	// 			this.isComboHidden = true;	
	// 		}

	// 		if(this.isCollapse != false) {
	// 			this.isCollapse = false;
	// 		}
	// 	};
	}



	//조회 버튼 이벤트
	onTapQuery(event){

		if(this.paramModel.saleCls == null) {         
		   Ext.Msg.alert('Error!!', '조회구분은 반드시 선택하셔야 합니다');
		} else { 
			console.log(this.paramModel);
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});
			this.generalCreditSalesInqService.selectGeneralCreditSalesInqList(this.paramModel).subscribe(
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
	//엑셀조회
    onTapExcel(event){
		if(this.paramModel.saleCls == null) {         
			Ext.Msg.alert('Error!!', '조회구분은 반드시 선택하셔야 합니다');
		 } else { 
			let url = this.generalCreditSalesInqService.excel(this.paramModel);
			console.log(this.paramModel);
			console.log(url);
	
			let downloadLink = document.createElement('a');
			downloadLink.href = encodeURI(url);
			document.body.appendChild(downloadLink);
			downloadLink.click();
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
		console.log(data.newValue);
	}


	//조회 구분 선택 이벤트
	comboSaleClsEvent = (data) =>{
		this.paramModel.saleCls = data.newValue;
		console.log(data.newValue);
		console.log("this.paramModel.saleCls :" + this.paramModel.saleCls);
	}

	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

}