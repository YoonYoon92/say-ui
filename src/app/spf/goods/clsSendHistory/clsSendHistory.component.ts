/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { ClsSendHistory } from './shared/clsSendHistory.model';
import { ClsSendHistoryService } from './shared/clsSendHistory.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

// import { SearchClassParam } from 'src/app/component/searchClass/shared/searchClassParam.model';
// import { SearchClass } from 'src/app/component/searchClass/shared/searchClass.model';
// import { SearchCcpyParam } from 'src/app/component/searchCcpy/shared/searchCcpyParam.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-clsSendHistory',
	templateUrl: './clsSendHistory.component.html',
	providers: [ClsSendHistoryService],
})
export class ClsSendHistoryComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public searchClassParamModel: ClsSendHistory = <ClsSendHistory> {};
	@Output() public sendObject: any = new EventEmitter();

	isDialogShowing1:boolean = false;
	isPhone:boolean = Ext.os.is.Phone;

	//param model
	public paramModel: ClsSendHistory = <ClsSendHistory>{};

	//grid select model
	public gridModel: ClsSendHistory = <ClsSendHistory>{};
	storeCd : string;
	public gridSearchClassModel: ClsSendHistory = <ClsSendHistory>{};
	public searchCcpyParamModel: ClsSendHistory = <ClsSendHistory>{};
	// public searchClass: any = null;
	//grid store
			gridSearchClassStore = new Ext.data.Store({});

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ClsSendHistory = <ClsSendHistory>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ClsSendHistory = <ClsSendHistory>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ClsSendHistory = <ClsSendHistory>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: ClsSendHistory = <ClsSendHistory>{};
	//코너
	// public comboCls1: any = null;
	// public comboClsModel: ClsSendHistory = <ClsSendHistory>{};
	//comboBox Store
	//코너
	public comboConer: any = null;
	public comboConerModel: ClsSendHistory = <ClsSendHistory>{};
	//클래스상세
	public detailClsModel: ClsSendHistory = <ClsSendHistory>{};
	//클래스마진변경
	clsMarginStore= new Ext.data.Store({});
	public comboCls1 : any = [
		{cls1: 'N', cls1Nm: 'cls 앞 5자리 입력'}
	]
	
	//클래스키
	// public comboCls2: any = null;
	// public comboCls2Model: ClsSendHistory = <ClsSendHistory>{};
	public comboCls2 : any = [
		{cls2: 'N', cls2Nm: 'cls 앞 5자리 입력'}
	]	
	//시작일
	public startDt: any = null;
	//종료일
	public endDt: any = null;
	//grid store
	gridStore = new Ext.data.Store({});




	constructor(private clsSendHistoryService: ClsSendHistoryService, public envService: EnvService,private cd: ChangeDetectorRef ) { }
	// constructor(private clsInqService: ClsInqService, public envService: EnvService,private cd: ChangeDetectorRef) { }
	ngOnInit() { 
		
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
	
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	//    if (this.envService.account.userId=="219001"){
	// 	this.paramModel.dbType='TS'
	// 	}
	// 	else
	// 	{
	// 		this.paramModel.dbType=''
	// 	}
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		if(this.envService.getDateToString(date.newDate) == null){
			this.paramModel.startDt = '';	
			console.log('"null처리"');
		}
		else if(this.envService.getDateToString(date.newDate) == undefined){
			console.log('"undefined"');
		}
		else if(this.startDt == null){
			console.log('"null2"');
		}
		else{
			this.paramModel.startDt = this.envService.getDateToString(date.newDate);
			console.log('"else"',this.paramModel.startDt);
			console.log('"else"',this.envService.getDateToString(this.startDt));
			// console.log(this.paramModel.startDt);
		}
		console.log(`newValue : ${this.envService.getDateToString(date.newDate)} / oldValue : ${this.envService.getDateToString(date.oldValue)}`);
	}

	//달력 포멧 변경
		startDtCmp: any;
		onReadystartDt(event){
			this.startDtCmp = event.cmp;
			this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
		}	

	//달력 포멧 변경
	searchToDayCmp: any;
	onReadyEndDt(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		if(this.envService.getDateToString(date.newDate) == null){
			this.paramModel.endDt = '';	
			console.log('"null처리"');
		}
		else{
			this.paramModel.endDt = this.envService.getDateToString(date.newDate);
		}
		console.log(`newValue : ${date.newValue} / oldValue : ${date.oldValue}`);
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
		this.clsSendHistoryService.selectClsSendHistoryList(this.paramModel).subscribe(
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
		this.clsSendHistoryService.excelClsSendHistory(this.paramModel).subscribe(
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
		this.clsSendHistoryService.reportClsSendHistory(this.paramModel).subscribe(
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
		this.clsSendHistoryService.helpClsSendHistory(this.paramModel).subscribe(
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
    //조직(점) 기본 셋팅
	 baseStoreCombo = () =>{
		this.paramModel.jum = '01';	
		this.comboStoreLv1Model.paramLvCd = '01';
		
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
//    comboStoreLv2Event = (data) =>{
//        this.paramModel.bu = data.newValue;
// 	    //조직(팀) 조회
// 	    this.comboStoreLv3Model.paramLvCd = data.newValue;
// 	    this.envService.selectStoreComboLv3List(this.comboStoreLv3Model).subscribe(
// 		    (res: any) => {
// 			    //조직(팀) data set
// 			    this.comboStoreLv3 = res;
// 		    },
// 		    (err: HttpErrorResponse) => {
// 		        Ext.Msg.alert('Error!!', 'Server communication error.');
// 		    }
// 	    );
//    }

   //팀 콤보박스 선택 이벤트
//    comboStoreLv3Event = (data) =>{
//        this.paramModel.tim = data.newValue;
// 	   console.log(data.newValue)
// 	   this.comboStoreLv4Model.paramLvCd = data.newValue;
// 	   this.envService.selectStoreComboLv4List(this.comboStoreLv4Model).subscribe(
// 		   (res: any) => {
// 			   //조직(팀) data set
// 			   this.comboStoreLv4 = res;
// 		   },
// 		   (err: HttpErrorResponse) => {
// 			   Ext.Msg.alert('Error!!', 'Server communication error.');
// 		   }
// 	   );
//    }
    //PC 콤보박스 선택 이벤트
	// comboStoreLv4Event = (data) =>{
	// 	this.paramModel.pc = data.newValue;	
	// 	this.comboClsModel=this.paramModel
	// 	this.clsSendHistoryService.selectClsList(this.comboClsModel).subscribe(
	// 		(res: any) => {
	// 			//조직(팀) data set
	// 			this.comboCls = res;
	// 		},
	// 		(err: HttpErrorResponse) => {
	// 			Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		}
	// 	);
	// }
	comboClsEvent1(date){
		this.paramModel.cls1= date.newValue;
		console.log(`newValue : ${date.newValue} / oldValue : ${date.oldValue}`);
	}
	// 코너 콤보박스 선택 이벤트
	comboClsEvent = (data) =>{
		this.paramModel.cls1 = data.newValue;
		if(data.newValue == null){
			this.paramModel.cls1 = '';	
			console.log('"null처리"');
		}
		else{
			this.paramModel.cls1 = data.newValue;
			console.log(this.paramModel.cls1);
		}			
		console.log(this.paramModel);
		// this.comboCls2Model=this.paramModel
		// this.clsSendHistoryService.selectCls2List(this.comboCls2Model).subscribe(
		// 	(res: any) => {
		// 		//조직(팀) data set
		// 		this.comboCls2 = res;
		// 	},
		// 	(err: HttpErrorResponse) => {
		// 		Ext.Msg.alert('Error!!', 'Server communication error.');
		// 	}
		// );
	}

	comboCls2Event = (data) =>{
		this.paramModel.cls2 = data.newValue;	
		if(data.newValue == null){
			this.paramModel.cls2 = '';	
			console.log('"null처리"');
		}
		else{
			this.paramModel.cls2 = data.newValue;
			// console.log(this.paramModel.cls1);
		}	
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	}
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }

//검색창
showDialog = () => {
	this.isDialogShowing = true;
	// console.log(this.isDialogShowing)
	console.log('이미실행중')
	}
	searchpartner=(event)=>{
	console.log('검색창 팝업', this.isDialogShowing)
	this.isDialogShowing = true;
	console.log('검색창 팝업', this.isDialogShowing)
	this.searchCcpyParamModel.jum = this.storeCd;
	this.cd.detectChanges();
	event = this.paramModel.partnerNm
	
		//선택시 자동조회
	// if(this.paramModel.coner!=''){
	// 	this.comboConer  = [
	// 		{}
	// 		]
	// 	this.clsSendHistoryService.selectConerList(this.comboConerModel).subscribe(
	// 	    (res: any) => {
	// 		    //조직(부) data set
	// 			this.comboConer = res;
	// 			console.log("클래스선택")
	// 	    },
	// 	    (err: HttpErrorResponse) => {
	// 	        Ext.Msg.alert('Error!!', 'Server communication error.');
	// 	    }
	// 	);
	// 	}
	}

   	partnerSelected=(event)=>{
	this.paramModel.partner=event.ccpy;
	this.paramModel.partnerNm=event.cmpNm;
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
	
	
}