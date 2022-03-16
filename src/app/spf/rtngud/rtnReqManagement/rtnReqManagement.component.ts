/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { RtnReqManagement } from './shared/rtnReqManagement.model';
import { RtnReqManagementService } from './shared/rtnReqManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { SearchClassParam } from 'src/app/component/searchClass/shared/searchClassParam.model';
import { Output } from '@angular/core';
import { timeHours } from 'd3';
import { RouteConfigLoadEnd } from '@angular/router';

@Component({
	selector: 'app-rtnReqManagement',
	templateUrl: './rtnReqManagement.component.html',
	providers: [RtnReqManagementService],
})
export class RtnReqManagementComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public isDialogShowing3:boolean = false;
	@Input() public searchClassParamModel: SearchClassParam = <SearchClassParam> {};
	@Input() public searchCcpyParamModel: SearchClassParam = <SearchClassParam> {};
	@Output() public sendObject: any = new EventEmitter();
	@Output() public closeClass = new EventEmitter();

	isDialogShowing2:boolean = false;
	//전표입력
	isDialogShowing4:boolean = false;
	detailStore = new Ext.data.Store({});
	public chitList = new Array();
	//param model
	public paramModel: RtnReqManagement = <RtnReqManagement>{};
	public uparamModel: RtnReqManagement = <RtnReqManagement>{};
	public chitSearchModel: RtnReqManagement = <RtnReqManagement>{};
	public chitResultModel: RtnReqManagement = <RtnReqManagement>{};
	
	public gridParamModel: RtnReqManagement = <RtnReqManagement>{};
	public detailParamModel: RtnReqManagement = <RtnReqManagement>{};

	//grid select model
	public gridModel: RtnReqManagement = <RtnReqManagement>{};
	public chitGridModel: RtnReqManagement = <RtnReqManagement>{};
	
    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: RtnReqManagement = <RtnReqManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: RtnReqManagement = <RtnReqManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: RtnReqManagement = <RtnReqManagement>{};
	//단품코드 리스트
	public itemList: any = null;
	//단품리스트 상세
	public itemDetail: RtnReqManagement = <RtnReqManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;
	public returnDt: any = null;

	//종료일
	public endDt: any = null;
	public payDt: any = null;
	//전표
	public chitYearStore: any = null;
	public chitYear: string;
	public items: RtnReqManagement = <RtnReqManagement>{};
	public i: number;
	public j: number;
	public check: string;
	chitSearchShowing:any ;
	chitWriteShowing: any ;
	writeItem:any ;
	updateItem:any ;
	write0:any ;
	write1:any ;
	write2:any ;
	write3:any ;
	write4:any ;
	write5:any ;
	delete0:any ;
	update0:any ;
	update1:any ;
	update2:any ;
	update3:any ;
	update4:any ;
	update5:any ;
	update6:any ;
	inq:any ;
	 //거래선체크
	 public checkPartner: RtnReqManagement = <RtnReqManagement>{};
	

	constructor(private rtnReqManagementService: RtnReqManagementService, public envService: EnvService,private cd: ChangeDetectorRef  ) { }
	ngOnInit() { 
		this.check='';
		this.startDt = new Date();
		this.returnDt = new Date();
		this.endDt = new Date();
		this.payDt = new Date();
		this.chitYear = this.envService.getDateToString(null).substr(0,4);
		this.paramModel.chitYear = this.chitYear;
		this.chitSearchModel.chitYear = this.chitYear;
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.returnDt 	= this.envService.getDateToString(null);
		this.paramModel.payDt 		= this.envService.getDateToString(null);
		this.paramModel.partner='';
		this.paramModel.cls='';
		this.paramModel.totCost=0;
		this.paramModel.totPrice=0;
		
		this.chitGridModel.itemCd='';
		this.chitGridModel.itemsCd='';
		this.chitGridModel.num=0;
		this.chitGridModel.unit=0.00;
		this.chitGridModel.cost=0.00;
		this.chitGridModel.price=0;

		this.gridParamModel.itemCd='';
		this.gridParamModel.itemsCd='';
		this.gridParamModel.num=0;
		this.gridParamModel.unit=0;
		this.gridParamModel.cost=0.00;
		this.gridParamModel.price=0.00;
		this.paramModel.userId = this.envService.account.userId;

	
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}

	//시작일 변경 이벤트
	onChangeOrderDt(date){
		console.log(date.newDate);
		this.paramModel.returnDt = this.envService.getDateToString(date.newDate);
		this.returnDt = date.newDate;
	}

	//종료일 변경 이벤트
	onChangePayDt(date){
		this.paramModel.payDt = this.envService.getDateToString(date.newDate);
		this.payDt = date.newDate;
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}
	onchitSearchShowing(event){						//컬럼 변수로 지정
		this.chitSearchShowing = event.cmp;
	}
	onchitWriteShowing(event){						//컬럼 변수로 지정
		this.chitWriteShowing = event.cmp;
	}
	updateItemShowing(event){						//컬럼 변수로 지정
		this.updateItem = event.cmp;
	}
	writeItemShowing(event){						//컬럼 변수로 지정
		this.writeItem = event.cmp;
	}
	inqShowing(event){						//컬럼 변수로 지정
		this.inq = event.cmp;
	}
	Write0Showing(event){						//컬럼 변수로 지정
		this.write0 = event.cmp;
	}
	Write1Showing(event){						//컬럼 변수로 지정
		this.write1 = event.cmp;
	}
	Write2Showing(event){						//컬럼 변수로 지정
		this.write2 = event.cmp;	
	}
	Write3Showing(event){						//컬럼 변수로 지정
		this.write3 = event.cmp;
	}
	Write4Showing(event){						//컬럼 변수로 지정
		this.write4 = event.cmp;	
	}
	Write5Showing(event){						//컬럼 변수로 지정
		this.write5 = event.cmp;	
	}
	delete0Showing(event){						//컬럼 변수로 지정
		this.delete0 = event.cmp;
	}
	update0Showing(event){						//컬럼 변수로 지정
		this.update0 = event.cmp;
	}
	update1Showing(event){						//컬럼 변수로 지정
		this.update1 = event.cmp;
	}
	update2Showing(event){						//컬럼 변수로 지정
		this.update2 = event.cmp;	
	}
	update3Showing(event){						//컬럼 변수로 지정
		this.update3 = event.cmp;	
	}
	update4Showing(event){						//컬럼 변수로 지정
		this.update4 = event.cmp;	
	}
	update5Showing(event){						//컬럼 변수로 지정
		this.update5 = event.cmp;	
	}
	update6Showing(event){						//컬럼 변수로 지정
		this.update6 = event.cmp;	
	}
	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		console.log(this.gridCmp);
		console.log(event.cmp);
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onChitSearch(event){
		this.isDialogShowing4 = true;
		this.cd.detectChanges();
	
	}
	onChitSearch1(event){
		this.chitWriteShowing.show(true);
		this.chitSearchShowing.hide(true);
		this.write0.hide(true);
		this.write1.hide(true);
		// this.write2.hide(true);
		this.write3.hide(true);
		this.write4.hide(true);
		this.write5.hide(true);
		this.writeItem.hide(true);
		this.inq.show(true);
		this.delete0.show(true);
		this.update0.show(true);
		this.update1.show(true);
		this.update2.show(true);
		this.update3.show(true);
		this.update4.show(true);
		// this.update5.show(true);
		this.update6.show(true);
		this.updateItem.show(true);
	
	}
	onChitWrite(event){
		this.chitSearchShowing.show(true);
		this.chitWriteShowing.hide(true);
		this.write0.show(true);
		this.write1.show(true);
		// this.write2.show(true);
		this.write3.show(true);
		this.write4.show(true);
		this.write5.show(true);
		this.writeItem.show(true);
		this.inq.hide(true);
		this.delete0.hide(true);
		this.update0.hide(true);
		this.update1.hide(true);
		this.update2.hide(true);
		this.update3.hide(true);
		this.update4.hide(true);
		// this.update5.hide(true);
		this.update6.hide(true);
		this.updateItem.hide(true);
	}
	onTapQuery(event){
		this.gridParamModel.itemsCd='';
		this.gridParamModel.num=0;
		this.gridParamModel.cost=0;
		this.gridParamModel.price=0;


		console.log(this.paramModel);
		console.log(this.paramModel.partner.substr(0,1))
		console.log(this.paramModel.cls.substr(4,1))
		if(this.paramModel.cls==''){Ext.Msg.alert('Error!!', '클래스를 선택하세요.');}
				else{
					if(this.paramModel.partner==''){Ext.Msg.alert('Error!!', '협력업체를 선택하세요.');}
					else{
							if(
								((this.paramModel.partner.substr(0,1)=='1'||this.paramModel.partner.substr(0,1)=='2')&&(this.paramModel.cls.substr(4,1)=='1'||this.paramModel.cls.substr(4,1)=='2'))
								||((this.paramModel.partner.substr(0,1)=='3'||this.paramModel.partner.substr(0,1)=='4')&&(this.paramModel.cls.substr(4,1)=='3'||this.paramModel.cls.substr(4,1)=='4'))
								||((this.paramModel.partner.substr(0,1)=='5'||this.paramModel.partner.substr(0,1)=='7')&&(this.paramModel.cls.substr(4,1)=='5'||this.paramModel.cls.substr(4,1)=='7'))
								)	{
									this.rtnReqManagementService.checkPartner(this.paramModel).subscribe(
										(res: any) => {
												this.checkPartner=res;
												console.log(this.checkPartner);
										},
										(err: HttpErrorResponse) => {
											/**
											 * @error
											 */
											Ext.Msg.alert('Error!!', 'Server communication error.');
										}
										);
							
										if(this.checkPartner.partnerStatus!=''){
											
											this.rtnReqManagementService.itemList(this.paramModel).subscribe(
												(res: any) => {
														this.itemList=res;
														console.log(this.checkPartner);
												},
												(err: HttpErrorResponse) => {
													/**
													 * @error
													 */
													Ext.Msg.alert('Error!!', 'Server communication error.');
												}
												);

										this.isDialogShowing2 = true;
										this.cd.detectChanges();
										}
										else{Ext.Msg.alert('Error!!', '협력업체를 확인해주세요.');}
									}
								else{
									Ext.Msg.alert('Error!!', '거래형태를 확인해주세요.');
								}
						}		
					}	
			
	}
	

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		console.log(this.paramModel);
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
		(e)=>{
			if( e == 'yes' ){
			console.log(this.paramModel);
			this.rtnReqManagementService.deleteRtnReqManagement(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.chitList=[];
					this.gridStore.setData(this.chitList);
					this.paramModel.totCost=0;
					this.paramModel.totPrice=0;
					 Ext.Msg.alert('삭제완료!!', '삭제완료되었습니다.');
					 
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
		
		}}
	);  
	}

	//신규 버튼 이벤트
	onTapNew(event){
		
	}

	//수정 버튼 이벤트
	onTapModify(event){
		this.chitList=[];
		this.chitList.push(this.paramModel);
		for(let index in this.gridStore.getData().items) {
			let checkedItem = {
				itemCd:this.gridStore.getData().items[index].data.itemCd,
				itemsCd:this.gridStore.getData().items[index].data.itemsCd,
				num:this.gridStore.getData().items[index].data.num,
				unit:this.gridStore.getData().items[index].data.unit,
				itemsNm:this.gridStore.getData().items[index].data.itemsNm,
				cost:this.gridStore.getData().items[index].data.cost,
				price:this.gridStore.getData().items[index].data.price,
				totCost:this.gridStore.getData().items[index].data.totCost,
				totPrice:this.gridStore.getData().items[index].data.totPrice
			};
			this.chitList.push(checkedItem);
			console.log(this.chitList);
		}
		this.rtnReqManagementService.updateRtnReqManagement(this.chitList).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.chitList=[];
				this.gridStore.setData(this.chitList);
				this.paramModel.totCost=0;
				this.paramModel.totPrice=0;
				 Ext.Msg.alert('수정완료!!', '수정완료되었습니다.');
				 
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

	// //저장 버튼 이벤트
	onTapSave(event){
		console.log(this.paramModel);
		
					// this.rtnReqManagementService.insertRtnReqManagement(this.paramModel).subscribe(
					// 				(res: any) => {
					// 						this.i=res;
					// 						console.log("1번"+this.i);
					// 				},
					// 				(err: HttpErrorResponse) => {
					// 					/**
					// 					 * @error
					// 					 */
					// 					Ext.Msg.alert('Error!!', 'Server communication error.');
					// 				}
					// 			);
								this.chitList=[];
								this.chitList.push(this.paramModel);
								for(let index in this.gridStore.getData().items) {
										let checkedItem = {
											itemCd:this.gridStore.getData().items[index].data.itemCd,
											itemsCd:this.gridStore.getData().items[index].data.itemsCd,
											num:this.gridStore.getData().items[index].data.num,
											unit:this.gridStore.getData().items[index].data.unit,
											itemsNm:this.gridStore.getData().items[index].data.itemsNm,
											cost:this.gridStore.getData().items[index].data.cost,
											price:this.gridStore.getData().items[index].data.price,
											totCost:this.gridStore.getData().items[index].data.totCost,
											totPrice:this.gridStore.getData().items[index].data.totPrice
										};
										this.chitList.push(checkedItem);
										console.log(this.chitList);
									}
								
							
										this.rtnReqManagementService.insertRtnReqManagement2(this.chitList).subscribe(
											(res: any) => {
												/**
												 * @success
												 */
												this.chitList=[];
												this.gridStore.setData(this.chitList);
												this.paramModel.totCost=0;
												this.paramModel.totPrice=0;
												 Ext.Msg.alert('저장완료!!', '저장완료되었습니다.');
												 
											},
											(err: HttpErrorResponse) => {
												/**
												 * @error
												 */
												Ext.Msg.alert('Error!!', 'Server communication error.');
											}
										);
				   

		
	}
	onclear(){
		console.log(this.returnDt);
		console.log(this.payDt);
	
		this.paramModel.returnDt 	= this.envService.getDateToString(this.returnDt);
		this.paramModel.payDt 		= this.envService.getDateToString(this.payDt);
		this.paramModel.chitYear='';
		this.paramModel.chitNum='';
		this.paramModel.cls='';
		this.paramModel.clsNm='';
		this.paramModel.cls='';
		this.paramModel.partner='';
		this.paramModel.partnerNm='';


		this.paramModel.totCost=0;
		this.paramModel.totPrice=0;
		
		this.chitGridModel.itemCd='';
		this.chitGridModel.itemsCd='';
		this.chitGridModel.num=0;
		this.chitGridModel.unit=0.00;
		this.chitGridModel.cost=0.00;
		this.chitGridModel.price=0;

		this.gridParamModel.itemCd='';
		this.gridParamModel.itemsCd='';
		this.gridParamModel.num=0;
		this.gridParamModel.unit=0;
		this.gridParamModel.cost=0.00;
		this.gridParamModel.price=0.00;
		this.chitList=[];
		this.gridStore.setData(this.chitList);
		this.chitSearchShowing.show(true);
		this.chitWriteShowing.hide(true);
		this.write0.show(true);
		this.write1.show(true);
		// this.write2.show(true);
		this.write3.show(true);
		this.write4.show(true);
		this.write5.show(true);
		this.inq.hide(true);
		this.update0.hide(true);
		this.update1.hide(true);
		this.update2.hide(true);
		this.update3.hide(true);
		this.update4.hide(true);
		// this.update5.hide(true);
		this.update6.hide(true);
		this.delete0.hide(true);

	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.rtnReqManagementService.excelRtnReqManagement(this.paramModel).subscribe(
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
		this.rtnReqManagementService.reportRtnReqManagement(this.paramModel).subscribe(
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
		this.rtnReqManagementService.helpRtnReqManagement(this.paramModel).subscribe(
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
   searchcls=(event)=>{
		console.log("click");
		this.isDialogShowing = true;
		this.searchClassParamModel.jum = this.paramModel.jum;
		this.cd.detectChanges();		
		console.log(this.paramModel);
	}
   clsSelected=(event)=>{
	   	console.log(event);
	   	this.paramModel.bu=event.bu;
		this.paramModel.tim=event.team;
		this.paramModel.pc=event.pc;
		this.paramModel.cls=event.classNo;
		this.paramModel.clsNm=event.className;
		//this.paramModel.partner=event.partner;
		this.paramModel.partnerNm=event.partner;
		this.paramModel.partner=this.paramModel.partnerNm;
		this.paramModel.featureCd=event.featureCd; 
		this.paramModel.taxDiv=event.taxDiv; 
		this.paramModel.purchaseMargin=event.purchaseMargin;

		console.log(this.paramModel);
   	}
   closeCls(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}
	partnerSelected=(event)=>{
		this.paramModel.partner=event.ccpy;
		this.paramModel.partnerNm=event.cmpNm;
		console.log(event);
	}

	 closeCcpy(event){
		this.isDialogShowing3 = false;
		this.cd.detectChanges();
	}
	
	clsEvent = (data) =>{
		console.log(data)
		console.log(this.paramModel.partner);
		if(data.newValue==''){
		this.paramModel.cls = String(data.newValue);
		}
		else{
			this.paramModel.clsNm = data.newValue;
		}
	}
	partnerEvent = (data) =>{
		console.log(data)
		console.log(this.paramModel.partner);
		if(data.newValue==''){
		this.paramModel.partner = String(data.newValue);
		}
	}
	searchpartner=(event)=>{
		console.log("click");
		this.isDialogShowing3 = true;
		console.log(this.isDialogShowing);
		this.searchCcpyParamModel.jum = this.paramModel.jum;
		this.cd.detectChanges();

		}

		onChitCancel = () => {
			this.isDialogShowing2 = false;
			this.cd.detectChanges();
		}
		onChitSearchCancel= () => {
			this.isDialogShowing2 = false;
			this.cd.detectChanges();
		}
		onChitHide = () => {
			this.isDialogShowing2 = false;
			this.cd.detectChanges();
		}
		onChitOk = () => {
			this.gridParamModel.itemsNm='';
			console.log(this.paramModel);
			console.log(this.gridParamModel);
			this.rtnReqManagementService.itemsCdCheck(this.gridParamModel).subscribe(
								(res: any) => {
										this.items=res;

		if(this.items==null){Ext.Msg.alert('Error!!', '없는 품목코드입니다.');}
		else{
			//응답성공시 
			this.gridParamModel.itemsNm=this.items.itemsNm;
		if(this.gridParamModel.price==null||this.gridParamModel.price==0){Ext.Msg.alert('Error!!', '매가를 입력하세요');}
		else{
		if(this.gridParamModel.num==null||this.gridParamModel.num==0){Ext.Msg.alert('Error!!', '수량를 입력하세요');}
		else{
		if(this.gridParamModel.itemsCd==null||this.gridParamModel.itemsCd==''){Ext.Msg.alert('Error!!', '품목코드를 입력하세요');}
		else{
			if(this.paramModel.featureCd=='1')
			{
				if(this.paramModel.cls.substr(4,1)=='1'||this.paramModel.cls.substr(4,1)=='3'||this.paramModel.cls.substr(4,1)=='5'){
					this.paramModel.totCost=this.paramModel.totCost+(this.gridParamModel.cost*this.gridParamModel.num);
					this.paramModel.totPrice=this.paramModel.totPrice+(this.gridParamModel.price*this.gridParamModel.num);
					this.gridStore.add({	
										itemsCd:this.gridParamModel.itemsCd,
										itemsNm:this.gridParamModel.itemsNm,
										num:this.gridParamModel.num,
										unit:this.gridParamModel.unit,
										cost:this.gridParamModel.cost,
										price:this.gridParamModel.cost*1.1,
										totCost:this.gridParamModel.num*this.gridParamModel.cost,
										totPrice:this.gridParamModel.cost*1.1*this.gridParamModel.num
										}); 
				}
				else{
					this.paramModel.totCost=this.paramModel.totCost+(this.gridParamModel.cost*this.gridParamModel.num);
					this.paramModel.totPrice=this.paramModel.totPrice+(this.gridParamModel.price*this.gridParamModel.num);
						this.gridStore.add({	itemsCd:this.gridParamModel.itemsCd,
												itemsNm:this.gridParamModel.itemsNm,
												num:this.gridParamModel.num,
												unit:this.gridParamModel.unit,
												cost:this.gridParamModel.cost,
												price:this.gridParamModel.cost*1.1,
												totCost:this.gridParamModel.num*this.gridParamModel.cost,
												totPrice:this.gridParamModel.cost*1.1*this.gridParamModel.num
							}); 
				}
			}
			
			else{
				console.log("길이"+this.paramModel.cls.substr(4,1));
				if(this.paramModel.cls.substr(4,1)=='1'||this.paramModel.cls.substr(4,1)=='3'||this.paramModel.cls.substr(4,1)=='4'||this.paramModel.cls.substr(4,1)=='5'||this.paramModel.cls.substr(4,1)=='7'){
					console.log("1");	
					if(this.gridParamModel.cost==0||this.gridParamModel.cost==null){
							this.check=' ';
							this.paramModel.totCost=this.paramModel.totCost+(Math.floor((((100.00-this.paramModel.purchaseMargin)*this.gridParamModel.price)/110))*this.gridParamModel.num);
							this.paramModel.totPrice=this.paramModel.totPrice+(this.gridParamModel.price*this.gridParamModel.num);
							
							this.gridStore.add({itemCd:this.gridParamModel.itemCd,
								itemsCd:this.gridParamModel.itemsCd,
								itemsNm:this.gridParamModel.itemsNm,
								num:this.gridParamModel.num,
								unit:this.gridParamModel.unit,
								cost:((100.00-this.paramModel.purchaseMargin)*this.gridParamModel.price/110).toFixed(2),
								price:this.gridParamModel.price,
								totCost:Math.floor((((100.00-this.paramModel.purchaseMargin)*this.gridParamModel.price)/110))*this.gridParamModel.num,
								totPrice:this.gridParamModel.price*this.gridParamModel.num
							}); 
						}
						else{
							console.log("3");
							this.check=' ';
							this.paramModel.totCost=this.paramModel.totCost+(this.gridParamModel.cost*this.gridParamModel.num);
							this.paramModel.totPrice=this.paramModel.totPrice+(this.gridParamModel.price*this.gridParamModel.num);
							this.gridStore.add({itemCd:this.gridParamModel.itemCd,
								itemsCd:this.gridParamModel.itemsCd,
								itemsNm:this.gridParamModel.itemsNm,
								num:this.gridParamModel.num,
								unit:this.gridParamModel.unit,
								cost:this.gridParamModel.cost,
								price:this.gridParamModel.price,
								totCost:this.gridParamModel.cost*this.gridParamModel.num,
								totPrice:this.gridParamModel.price*this.gridParamModel.num
								}); 
						}
					}
				
				else if(this.paramModel.cls.substr(5,1)=='2'){
					if(this.gridParamModel.cost==0){Ext.Msg.alert('Error!!', '원가를 입력하세요');
					this.check='Y'
					}
					else{
						this.paramModel.totCost=this.paramModel.totCost+(this.gridParamModel.cost*this.gridParamModel.num);
						this.paramModel.totPrice=this.paramModel.totPrice+(this.gridParamModel.price*this.gridParamModel.num);
						this.check=' ';
						this.gridStore.add({itemCd:this.gridParamModel.itemCd,
							itemsCd:this.gridParamModel.itemsCd,
							itemsNm:this.gridParamModel.itemsNm,
							num:this.gridParamModel.num,
							unit:this.gridParamModel.unit,
							cost:this.gridParamModel.cost,
							price:this.gridParamModel.price,
							totCost:this.gridParamModel.cost*this.gridParamModel.num,
							totPrice:this.gridParamModel.price*this.gridParamModel.num
							}); 
					}

				}
				else{
						this.check='Y'
					}
			}
			if(this.check=' '){
				this.isDialogShowing2 = false;
			
			
				let checkItem={
					itemCd:this.gridParamModel.itemCd,
					itemsCd:this.gridParamModel.itemsCd,
					itemsNm:this.gridParamModel.itemsNm,
					num:this.gridParamModel.num,
					unit:this.gridParamModel.unit,
					cost:this.gridParamModel.cost,
					price:this.gridParamModel.price
				}

				console.log(this.paramModel.totCost);
				console.log(this.paramModel.totPrice);
				this.cd.detectChanges();
			}
		}}}}
								},
								(err: HttpErrorResponse) => {
									/**
									 * @error
									 */
									Ext.Msg.alert('Error!!', 'Server communication error.');
								}
							);
		}

		chitYearEvent = (data) =>{
			this.chitSearchModel.chitYear = data.newValue;
		}
		chitNumEvent = (data) =>{
			this.chitSearchModel.chitNum = data.newValue;
		}
		buyHandler = (button) => {
			let gridrow = button.up('gridrow'),
			  record = gridrow.getRecord();
			  this.gridParamModel.itemCd=record.get('itemCd')
			  this.gridParamModel.itemsCd=record.get('itemCd')
			  this.gridParamModel.itemsNm=record.get('itemNm'),
			  this.gridParamModel.num=record.get('num')
			  this.gridParamModel.unit=record.get('unit')
			  this.gridParamModel.cost=record.get('cost')
			  this.gridParamModel.price=record.get('price')
			

			  console.log(this.gridParamModel);
			  this.gridStore().add(this.gridParamModel);
			  console.log(this.gridStore);
		  }

		actionsCell = {
			xtype: 'widgetcell',
			widget: {
			  xtype: 'segmentedbutton',
		   maxWidth: "100",
		   allowDepress: "true",
		   items: [
			{
			  text: '추가',
			  handler : this.buyHandler
			}
			]
		  }
		};

	
		  onGridadd(event){
		  this.gridParamModel.itemCd='';
		  this.gridParamModel.itemsCd='';
		  this.gridParamModel.num=0;
		  this.gridParamModel.unit=0;
		  this.gridParamModel.cost=0;
		  this.gridParamModel.price=0;
		  this.gridStore.add({itemCd:this.gridParamModel.itemCd,itemsCd:this.gridParamModel.itemsCd,
								num:this.gridParamModel.num,unit:this.gridParamModel.unit,
								cost:this.gridParamModel.cost,price:this.gridParamModel.price}); 
		  }

		itemCdEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.itemCd = data.newValue;
			this.detailParamModel.itemCd = data.newValue;
			this.detailParamModel.jum=this.paramModel.jum;
			this.detailParamModel.bu=this.paramModel.bu;
			console.log(data.newValue)
			this.rtnReqManagementService.itemDetail(this.detailParamModel).subscribe(
				(res: any) => {
						this.itemDetail=res;
						console.log(this.itemDetail);
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
				);
			//값이 있으면 그리드에 저절로 입력
			console.log("this.paramModel");
			console.log(this.paramModel);
			console.log("this.itemDetail:");
			console.log(this.itemDetail);
			if(this.paramModel.featureCd=='1'){
				if(this.paramModel.cls.substr(5,1)=='1'||this.paramModel.cls.substr(5,1)=='3'||this.paramModel.cls.substr(5,1)=='5'){
					this.gridParamModel.itemsCd=this.itemDetail.itemsCd;
					this.gridParamModel.cost=this.itemDetail.cost;
					this.gridParamModel.price=this.itemDetail.cost*1.1;
					console.log("featurecd=1:"+this.gridParamModel);
					}
				else{
					this.gridParamModel.itemsCd=this.itemDetail.itemsCd;
					this.gridParamModel.cost=this.itemDetail.cost;
					this.gridParamModel.price=this.itemDetail.price;
					console.log("featurecd!=1:"+this.gridParamModel);
					}
				}
			if(this.itemDetail.cost!=0){
				if(this.paramModel.featureCd=='7'){
					this.gridParamModel.itemsCd=this.itemDetail.itemsCd;
					this.gridParamModel.cost=this.itemDetail.emptyCost;
					this.gridParamModel.price=this.itemDetail.price;
					console.log("this.itemDetail.cost!=0 and 7:"+this.gridParamModel);
				}
				else{
					this.gridParamModel.itemsCd=this.itemDetail.itemsCd;
					this.gridParamModel.cost=this.itemDetail.cost;
					this.gridParamModel.price=this.itemDetail.price;
					console.log("this.itemDetail.cost!=0 and not 7:"+this.gridParamModel);
				}
			}
			}
		}
		itemsCdEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.itemsCd = data.newValue;
			console.log(data.newValue)
			}
		}
		numEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.num = data.newValue;
			console.log(data.newValue)
			}
		}
		unitEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.unit = data.newValue;
			console.log(data.newValue)
			}
		}
		costEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.cost = data.newValue;
			console.log(data.newValue)
			}
		}
		priceEvent = (data) =>{
			if(data!=null){
			this.gridParamModel.price = data.newValue;
			console.log(data.newValue)
			}
	
		}
		
		onChitSearchOk = () => {
			console.log(this.chitSearchModel);
			this.rtnReqManagementService.chitSearchResult(this.chitSearchModel).subscribe(
				(res: any) => {
						this.chitResultModel=res;
						console.log(this.chitResultModel);
						this.paramModel.chitYear=this.chitResultModel.chitYear;
						this.paramModel.chitNum=this.chitResultModel.chitNum;
						this.paramModel.returnDt=this.chitResultModel.returnDt;
						this.paramModel.payDt=this.chitResultModel.payDt;
						this.jumComboVal=this.chitResultModel.jum;
						this.paramModel.jum=this.chitResultModel.jum;
						this.paramModel.bu=this.chitResultModel.bu;
						this.paramModel.tim=this.chitResultModel.tim;
						this.paramModel.pc=this.chitResultModel.pc;	
						this.paramModel.featureCd=this.chitResultModel.featureCd;
						this.paramModel.purchaseMargin=this.chitResultModel.purchaseMargin;
						this.paramModel.cls=this.chitResultModel.cls;
						this.paramModel.clsNm=this.chitResultModel.clsNm;
						this.paramModel.partner=this.chitResultModel.partner;
						this.paramModel.partnerNm=this.chitResultModel.partnerNm;	
						this.paramModel.deleteDt=this.chitResultModel.deleteDt;	
						if(this.paramModel.deleteDt==''){
						this.rtnReqManagementService.chitSearchResultDetail(this.chitSearchModel).subscribe(
							(res: any) => {
										this.gridStore.setData(res);
							},
							(err: HttpErrorResponse) => {
								/**
								 * @error
								 */
								Ext.Msg.alert('Error!!', 'Server communication error.');
							}
							)
						}
						else{ Ext.Msg.alert('Error!!', '삭제된 전표입니다.');}
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
				);
		}
		editEvent =(grid, item, event) =>{
			console.log(item.record.data);          //수정된 그리드 데이터
		}
		deleteGrid =(grid, item, event) =>{
			console.log(item.record.data);          
			this.gridStore.remove(item.record);
			console.log(this.gridStore);    
		}
}