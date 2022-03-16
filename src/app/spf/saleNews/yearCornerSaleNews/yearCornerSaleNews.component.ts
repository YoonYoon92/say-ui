/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { YearCornerSaleNews } from './shared/yearCornerSaleNews.model';
import { YearCornerSaleNewsService } from './shared/yearCornerSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-YearCornerSaleNews',
	templateUrl: './yearCornerSaleNews.component.html',
	providers: [YearCornerSaleNewsService],
})
export class YearCornerSaleNewsComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: YearCornerSaleNews = <YearCornerSaleNews>{};

	//grid select model
	public gridModel: YearCornerSaleNews = <YearCornerSaleNews>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: YearCornerSaleNews = <YearCornerSaleNews>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: YearCornerSaleNews = <YearCornerSaleNews>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: YearCornerSaleNews = <YearCornerSaleNews>{};

	//comboBox Store PC
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: YearCornerSaleNews = <YearCornerSaleNews>{};   

	//grid store
	gridStore = new Ext.data.Store({});

	//조회일자
	public searchDay: any = null;

	public ratingNetSalesAmount = [new Array()];
	public m12Col = [];
	public m11Col = [];
	public m10Col = [];
	public m09Col = [];
	public m08Col = [];
	public m07Col = [];
	public m06Col = [];
	public m05Col = [];
	public m04Col = [];
	public m03Col = [];
	public m02Col = [];
	public m01Col = [];
	public m00Col = [];
	
	//컬럼제어변수
	column1A : any;
	column1B : any;
	column1C : any;
	column1D : any;
	column1E : any;
	column1F : any;
	column1G : any;
	column1H : any;
	column1I : any;
	column1J : any;
	column1K : any;
	column1L : any;
	column1M : any;

	column2A : any;
	column2B : any;
	column2C : any;
	column2D : any;
	column2E : any;
	column2F : any;
	column2G : any;
	column2H : any;
	column2I : any;
	column2J : any;
	column2K : any;
	column2L : any;
	column2M : any;
	
	column3A : any;
	column3B : any;
	column3C : any;
	column3D : any;
	column3E : any;
	column3F : any;
	column3G : any;
	column3H : any;
	column3I : any;
	column3J : any;
	column3K : any;
	column3L : any;
	column3M : any;

	//컬럼명 변수
	public cName12 : any;
	public cName11 : any;
	public cName10 : any;
	public cName09 : any;
	public cName08 : any;	
	public cName07 : any;
	public cName06 : any;
	public cName05 : any;
	public cName04 : any;
	public cName03 : any;
	public cName02 : any;
	public cName01 : any;
	public cName00 : any;




	constructor(private YearCornerSaleNewsService: YearCornerSaleNewsService, public envService: EnvService ) { }
	ngOnInit() { 
		this.searchDay = new Date(this.envService.getBeforeDate(null));
		
		//조회일자 셋팅
		this.paramModel.searchDay 	= this.envService.getDateToString(this.envService.getBeforeDate(null));
		//test
		// this.searchDay = '04/27/2020'

       //점 콤보박스 셋팅
	   this.baseStoreCombo();
	   
	   //컬럼명 기초값 셋팅
	   //12월이 0월로 표기되는 문제 해결위해  +1 씩을 추가로 함 
	   let tempDay = new Date();	   
	   tempDay.setMonth(tempDay.getMonth() - 12);
	   this.cName12 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName11 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName10 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName09 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName08 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName07 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName06 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName05 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName04 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName03 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName02 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   tempDay.setMonth(tempDay.getMonth() + 1);
	   this.cName01 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
	   //tempDay.setMonth(tempDay.getMonth() - 1);
	   //this.cName00 = tempDay.getFullYear() + '년' + tempDay.getMonth() + '월'	   
	   this.cName00 = '당월현재';
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

		//시작일이 변경되면 그 일자에 맞게 컬럼의 표기 년월 변경작업
		//12월이 0월로 표기되는 문제 해결위해  +1 씩을 추가로 함 
		let tempDay = new Date();		
		tempDay = date.newDate;
		tempDay.setMonth(tempDay.getMonth() - 12);
		this.cName12 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName11 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName10 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName09 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName08 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName07 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName06 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName05 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName04 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName03 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName02 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName01 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';
		tempDay.setMonth(tempDay.getMonth() + 1);
		this.cName00 = tempDay.getFullYear() + '년' + (tempDay.getMonth()+1) + '월';	
		//this.cName00 = '당월현재';
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
		if (this.paramModel.jum ==null ||this.paramModel.jum =='' ){
			Ext.Msg.alert('Error!!', '점을 선택하셔야됩니다.');   
		}
		else if(this.paramModel.bu==null||this.paramModel.bu==""){
			Ext.Msg.alert('Error!!', '부를 선택하셔야됩니다.');   
		}
		else{
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});
			this.YearCornerSaleNewsService.selectYearCornerSaleNewsList(this.paramModel).subscribe(
				(res: any) => {
					console.log(res);
					/**
					 * @success
					 */
					this.gridStore.setData(res);
					this.gridCmp.setMasked(false);


					/*꺽은선 그래프 만들기*/
					this.ratingNetSalesAmount = [new Array()];
					let arrayValue = new Array();
			
					this.ratingNetSalesAmount.fill(null).map(function(x){ return Array()})
			
					for(let index in this.gridStore.getData().items) {
			
						for(let i=0; i<=12; i++) {
							arrayValue = [];
							arrayValue.push(i);
			
							switch(i) {
								case 0:
									arrayValue.push(this.gridStore.getData().items[index].data.m12Netsale);
									break;								
								case 1:
									arrayValue.push(this.gridStore.getData().items[index].data.m11Netsale);
									break;
								case 2:
									arrayValue.push(this.gridStore.getData().items[index].data.m10Netsale);
									break;
								case 3:
									arrayValue.push(this.gridStore.getData().items[index].data.m09Netsale);
									break;
								case 4:
									arrayValue.push(this.gridStore.getData().items[index].data.m08Netsale);
									break;
								case 5:
									arrayValue.push(this.gridStore.getData().items[index].data.m07Netsale);
									break;
								case 6:
									arrayValue.push(this.gridStore.getData().items[index].data.m06Netsale);
									break;
								case 7:
									arrayValue.push(this.gridStore.getData().items[index].data.m05Netsale);
									break;
								case 8:
									arrayValue.push(this.gridStore.getData().items[index].data.m04Netsale);
									break;
								case 9:
									arrayValue.push(this.gridStore.getData().items[index].data.m03Netsale);
									break;
								case 10:
									arrayValue.push(this.gridStore.getData().items[index].data.m02Netsale);
									break;
								case 11:
									arrayValue.push(this.gridStore.getData().items[index].data.m01Netsale);
									break;
								case 12:
									arrayValue.push(this.gridStore.getData().items[index].data.m00Netsale);
									break;
							} 
							this.ratingNetSalesAmount.push(arrayValue);                          
						}	
						this.gridStore.getData().items[index].data.rating_netSalesAmount = this.ratingNetSalesAmount;
						//console.log(this.ratingNetSalesAmount);
						this.ratingNetSalesAmount = [];			
					}
					//그래프의 빠른 출력을 위한 새로고침 추가
					this.gridCmp.refresh();
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
	}

	//수정 버튼 이벤트
	onTapModify(event){
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				this.YearCornerSaleNewsService.deleteYearCornerSaleNews(null).subscribe(
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
				this.YearCornerSaleNewsService.saveYearCornerSaleNews(null).subscribe(
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
		this.YearCornerSaleNewsService.excelYearCornerSaleNews(this.paramModel).subscribe(
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
		this.YearCornerSaleNewsService.reportYearCornerSaleNews(this.paramModel).subscribe(
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
		this.YearCornerSaleNewsService.helpYearCornerSaleNews(this.paramModel).subscribe(
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
		console.log(this.comboStoreLv2);
	}

	//부 콤보박스 선택 이벤트
	comboStoreLv2Event = (data) =>{
		this.paramModel.bu = data.newValue;
		this.paramModel.serchLevel = 'bu';
		console.log(this.paramModel);
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
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
			console.log(this.paramModel.bu+'jum');
		}
		else
		{
			this.paramModel.serchLevel = 'bu';
			console.log(this.paramModel.bu+'bu');
		}

	
	}

	//팀 콤보박스 선택 이벤트
	comboStoreLv3Event = (data) =>{
		this.paramModel.tim = data.newValue;
		this.paramModel.serchLevel = 'tim';
		console.log(this.paramModel);
		//조직(PC)) 조회
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
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
		}
		else if(this.paramModel.tim=='')
		{
			this.paramModel.serchLevel = 'bu';
		}
		else
		{
			this.paramModel.serchLevel = 'tim';
		}
	}

	//PC 콤보박스 선택 이벤트
	comboStoreLv4Event = (data) =>{
		this.paramModel.pc = data.newValue;
		console.log(this.paramModel);
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
		}
		else if(this.paramModel.tim=='')
		{
			this.paramModel.serchLevel = 'bu';
		}
		else if(this.paramModel.pc=='')
		{
			this.paramModel.serchLevel = 'tim';
		}
		else
		{
			this.paramModel.serchLevel = 'pc';
		}
	}

   //콤보박스 변경 이벤트
	onChangeComboBox(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.onlineChk = data.newValue;
	}


	//컬럼 보여주기 체크박스 선택 이벤트
	onChangeCheck1(data){		
		data.newValue == true ? this.column1A.show(true) : this.column1A.hide(true);
		data.newValue == true ? this.column1B.show(true) : this.column1B.hide(true);
		data.newValue == true ? this.column1C.show(true) : this.column1C.hide(true);
		data.newValue == true ? this.column1D.show(true) : this.column1D.hide(true);
		data.newValue == true ? this.column1E.show(true) : this.column1E.hide(true);
		data.newValue == true ? this.column1F.show(true) : this.column1F.hide(true);
		data.newValue == true ? this.column1G.show(true) : this.column1G.hide(true);
		data.newValue == true ? this.column1H.show(true) : this.column1H.hide(true);
		data.newValue == true ? this.column1I.show(true) : this.column1I.hide(true);
		data.newValue == true ? this.column1J.show(true) : this.column1J.hide(true);
		data.newValue == true ? this.column1K.show(true) : this.column1K.hide(true);
		data.newValue == true ? this.column1L.show(true) : this.column1L.hide(true);
		data.newValue == true ? this.column1M.show(true) : this.column1M.hide(true);		
	}
	onChangeCheck2(data){		
		data.newValue == true ? this.column2A.show(true) : this.column2A.hide(true);
		data.newValue == true ? this.column2B.show(true) : this.column2B.hide(true);
		data.newValue == true ? this.column2C.show(true) : this.column2C.hide(true);
		data.newValue == true ? this.column2D.show(true) : this.column2D.hide(true);
		data.newValue == true ? this.column2E.show(true) : this.column2E.hide(true);
		data.newValue == true ? this.column2F.show(true) : this.column2F.hide(true);
		data.newValue == true ? this.column2G.show(true) : this.column2G.hide(true);
		data.newValue == true ? this.column2H.show(true) : this.column2H.hide(true);
		data.newValue == true ? this.column2I.show(true) : this.column2I.hide(true);
		data.newValue == true ? this.column2J.show(true) : this.column2J.hide(true);
		data.newValue == true ? this.column2K.show(true) : this.column2K.hide(true);
		data.newValue == true ? this.column2L.show(true) : this.column2L.hide(true);
		data.newValue == true ? this.column2M.show(true) : this.column2M.hide(true);
	}
	onChangeCheck3(data){		
		data.newValue == true ? this.column3A.show(true) : this.column3A.hide(true);
		data.newValue == true ? this.column3B.show(true) : this.column3B.hide(true);
		data.newValue == true ? this.column3C.show(true) : this.column3C.hide(true);
		data.newValue == true ? this.column3D.show(true) : this.column3D.hide(true);
		data.newValue == true ? this.column3E.show(true) : this.column3E.hide(true);
		data.newValue == true ? this.column3F.show(true) : this.column3F.hide(true);
		data.newValue == true ? this.column3G.show(true) : this.column3G.hide(true);
		data.newValue == true ? this.column3H.show(true) : this.column3H.hide(true);
		data.newValue == true ? this.column3I.show(true) : this.column3I.hide(true);
		data.newValue == true ? this.column3J.show(true) : this.column3J.hide(true);
		data.newValue == true ? this.column3K.show(true) : this.column3K.hide(true);
		data.newValue == true ? this.column3L.show(true) : this.column3L.hide(true);
		data.newValue == true ? this.column3M.show(true) : this.column3M.hide(true);
	}

   //부서명 보여주기 체크박스에 따른 컬럼 제어 이벤트
	onColumn1A(event){				
		this.column1A = event.cmp;
	} 
	onColumn1B(event){				
		this.column1B = event.cmp;
	} 
	onColumn1C(event){				
		this.column1C = event.cmp;
	} 
	onColumn1D(event){				
		this.column1D = event.cmp;
	} 
	onColumn1E(event){				
		this.column1E = event.cmp;
	} 
	onColumn1F(event){				
		this.column1F = event.cmp;
	} 
	onColumn1G(event){				
		this.column1G = event.cmp;
	} 
	onColumn1H(event){				
		this.column1H = event.cmp;
	} 
	onColumn1I(event){				
		this.column1I = event.cmp;
	} 
	onColumn1J(event){				
		this.column1J = event.cmp;
	} 
	onColumn1K(event){				
		this.column1K = event.cmp;
	} 
	onColumn1L(event){				
		this.column1L = event.cmp;
	} 
	onColumn1M(event){				
		this.column1M = event.cmp;
	} 
	onColumn3A(event){				
		this.column3A = event.cmp;
	} 
	onColumn3B(event){				
		this.column3B = event.cmp;
	} 
	onColumn3C(event){				
		this.column3C = event.cmp;
	} 
	onColumn3D(event){				
		this.column3D = event.cmp;
	} 
	onColumn3E(event){				
		this.column3E = event.cmp;
	} 
	onColumn3F(event){				
		this.column3F = event.cmp;
	} 
	onColumn3G(event){				
		this.column3G = event.cmp;
	} 
	onColumn3H(event){				
		this.column3H = event.cmp;
	} 
	onColumn3I(event){				
		this.column3I = event.cmp;
	} 
	onColumn3J(event){				
		this.column3J = event.cmp;
	} 
	onColumn3K(event){				
		this.column3K = event.cmp;
	} 
	onColumn3L(event){				
		this.column3L = event.cmp;
	} 
	onColumn3M(event){				
		this.column3M = event.cmp;
	} 
	onColumn2A(event){				
		this.column2A = event.cmp;
	} 
	onColumn2B(event){				
		this.column2B = event.cmp;
	} 
	onColumn2C(event){				
		this.column2C = event.cmp;
	} 
	onColumn2D(event){				
		this.column2D = event.cmp;
	} 
	onColumn2E(event){				
		this.column2E = event.cmp;
	} 
	onColumn2F(event){				
		this.column2F = event.cmp;
	} 
	onColumn2G(event){				
		this.column2G = event.cmp;
	} 
	onColumn2H(event){				
		this.column2H = event.cmp;
	} 
	onColumn2I(event){				
		this.column2I = event.cmp;
	} 
	onColumn2J(event){				
		this.column2J = event.cmp;
	} 
	onColumn2K(event){				
		this.column2K = event.cmp;
	} 
	onColumn2L(event){				
		this.column2L = event.cmp;
	} 
	onColumn2M(event){				
		this.column2M = event.cmp;
	} 





	/*그리드 꺽은선 그래프*/

	renderSparkline = (rating) => { 		
		
        return
		`<ext-sparkline
			height={16}
			values={rating}
			tipTpl='Price: {y:number("0.00")}'
		></ext-sparkline>`
		
    }

    ratingsColumn = [
        // {
        //     text: '총매출',
        //     dataIndex: 'rating_totSalesAmount',
        //     randerer: this.renderSparkline,
        //     ignoreExport: true,
        //     cell: {
        //         xtype: 'widgetcell',
        //         forceWidth: true,
        //         widget: {
        //             xtype: 'sparklineline',
        //             tipTpl:'Price: {y:number("0,000")}'
        //         }
        //     }
        // },
        // {
        //     text: '할인',
        //     dataIndex: 'rating_discountAmount',
        //     randerer: this.renderSparkline,
        //     ignoreExport: true,
        //     cell: {
        //         xtype: 'widgetcell',
        //         forceWidth: true,
        //         widget: {
        //             xtype: 'sparklineline',
        //             tipTpl:'Price: {y:number("0,000")}'
        //         }
        //     }
        // },
        {
            text: '',
            dataIndex: 'rating_netSalesAmount',
            randerer: this.renderSparkline,
            ignoreExport: true,
            cell: {
                xtype: 'widgetcell',
                forceWidth: true,
                widget: {
                    xtype: 'sparklineline',
                    tipTpl:'순매출: {y:number("0,000")}'
                }
            }
        }
    ];
	



//프로그램 종료 중괄호
}