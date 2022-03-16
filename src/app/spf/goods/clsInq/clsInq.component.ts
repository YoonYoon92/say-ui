/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter,ChangeDetectorRef} from '@angular/core';
import { ClsInq } from './shared/clsInq.model';
import { ClsInqService } from './shared/clsInq.service';
import { EnvService,ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchClassParam } from 'src/app/component/searchClass/shared/searchClassParam.model';

import { SearchClass } from 'src/app/component/searchClass/shared/searchClass.model';
import { SearchCcpyParam } from 'src/app/component/searchCcpy/shared/searchCcpyParam.model';
//import { ChangeDetectorRef } from '@angular/core';
import { SearchConerParam } from 'src/app/component/searchConer/shared/SearchConerParam.model';
@Component({
	selector: 'app-clsInq',
	templateUrl: './clsInq.component.html',
	providers: [ClsInqService],
})
export class ClsInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public isDialogShowing3:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	isDialogShowing1:boolean = false;
	isPhone:boolean = Ext.os.is.Phone;
	//param model
	public paramModel: ClsInq = <ClsInq>{};

	//grid select model
	public gridModel: ClsInq = <ClsInq>{};
	storeCd : string;

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ClsInq = <ClsInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ClsInq = <ClsInq>{};

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: ClsInq = <ClsInq>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: ClsInq = <ClsInq>{};
	//코너
	public comboConer: any = null;
	public comboConerModel: ClsInq = <ClsInq>{};
	//클래스상세
	public detailClsModel: ClsInq = <ClsInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	//클래스마진변경
	clsMarginStore= new Ext.data.Store({});
	//param model
	
	
	public searchClass: any = null;
	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	
	//grid select model
	public gridSearchClassModel: SearchClass = <SearchClass>{};
	public searchCcpyParamModel: SearchCcpyParam = <SearchCcpyParam>{};
	public SearchConerParamModel: SearchConerParam = <SearchConerParam>{};
	//grid store
	gridSearchClassStore = new Ext.data.Store({});

	constructor(private clsInqService: ClsInqService, public envService: EnvService,private cd: ChangeDetectorRef) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();
		this.comboConer  = [
			{}
			]

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.baseStoreCombo();
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
		this.gridModel.jum = this.paramModel.jum;
		console.log(this.gridModel)
		this.clsInqService.selectDetailClsList(this.gridModel).subscribe(
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
			this.clsInqService.selectDetailClsMargin(this.gridModel).subscribe(
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
			this.isDialogShowing1 = true;
			this.cd.detectChanges();
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}
	public jumComboVal: string;
	baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
           this.jumComboVal = this.comboStoreLv1[0].storeLvCd;
		   this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
		   this.storeCd = this.comboStoreLv1[0].storeLvCd;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }
	//점 콤보박스 선택 이벤트
	comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
		
		this.storeCd = data.newValue;
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
 
	//세분류 콤보박스 선택 이벤트
	 comboStoreLv4Event = (data) =>{
		 this.paramModel.pc = data.newValue;	
		 this.comboConerModel=this.paramModel
		 console.log(this.comboConerModel)
		 this.clsInqService.selectConerList(this.comboConerModel).subscribe(
			 (res: any) => {
				 //조직(팀) data set
				 this.comboConer = res;
				 
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
	 }
	 //코너 콤보박스 선택 이벤트
	 comboConerEvent = (data) =>{
		 this.paramModel.coner = data.newValue;	
		 this.paramModel.conerNm = data.newValue;	
		 this.paramModel.partner = null;	
		 this.paramModel.partnerNm = null;
		 console.log(this.paramModel);
		 
	 }
	//조회 버튼 이벤트
	onTapQuery(event){
		if ((this.paramModel.coner==''||this.paramModel.coner==null) && (this.paramModel.partner==''||this.paramModel.partner==null))
		{
			Ext.Msg.alert('Error!!', '코너 또는 협력업체를 선택하셔야됩니다.');  
		}
		else
			{
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.clsInqService.selectClsInqList(this.paramModel).subscribe(
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
	}

    
   

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.clsInqService.excelClsInq(this.paramModel).subscribe(
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
		this.clsInqService.reportClsInq(this.paramModel).subscribe(
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
		this.clsInqService.helpClsInq(this.paramModel).subscribe(
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
  
 

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
   
   	// showDialog = () => {
	// this.isDialogShowing = true;
	// console.log(this.isDialogShowing)
	// }
	searchpartner=(event)=>{
	console.log("click");
	this.isDialogShowing = true;
	console.log(this.isDialogShowing);
	this.searchCcpyParamModel.jum = this.storeCd;
	this.cd.detectChanges();
	event= this.paramModel.partnerNm
	
	if(this.paramModel.coner!=''){
		this.comboConer  = [
			{}
			]
		this.clsInqService.selectConerList(this.comboConerModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.comboConer = res;
				console.log("클래스선택")
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		}
	}

   	partnerSelected=(event)=>{
	this.paramModel.partner=event.ccpy;
	this.paramModel.partnerNm=event.cmpNm;
	console.log(event)
	  }
	  
	searchconer=(event)=>{
		this.isDialogShowing3 = true;
		this.SearchConerParamModel.jum = this.storeCd;
		this.cd.detectChanges();
		event= this.paramModel.conerNm
		}
	conerSelected=(event)=>{
		this.paramModel.coner=event.conerNo;
		this.paramModel.conerNm=event.conerName;
		console.log(event)
	}  
		
	
		onCancel1 = () => {
			this.isDialogShowing1 = false;
			this.cd.detectChanges();
		}
	
		onHide1 = () => {
			this.isDialogShowing1 = false;
			this.cd.detectChanges();
		}
		closeCcpy(event){
			this.isDialogShowing = false;
			this.cd.detectChanges();
		}
	


}