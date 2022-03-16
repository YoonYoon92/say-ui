/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component,OnInit,Input,Output,EventEmitter,ChangeDetectorRef} from '@angular/core';
import { ClsManagement } from './shared/clsManagement.model';
import { ClsManagementService } from './shared/clsManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCcpyParam } from 'src/app/component/searchCcpy/shared/searchCcpyParam.model';
import { SearchConerParam } from 'src/app/component/searchConer/shared/SearchConerParam.model';
import { SearchConer } from 'src/app/component/searchConer/shared/SearchConer.model';
@Component({
	selector: 'app-clsManagement',
	templateUrl: './clsManagement.component.html',
	providers: [ClsManagementService],
})
export class ClsManagementComponent implements OnInit {
	@Input() public isDialogShowing:boolean = false;
	@Input() public route: any;
	@Input() public SearchConerParamModel: SearchConerParam = <SearchConerParam> {};
	@Output() public sendObject: any = new EventEmitter();


	//param model
	public paramModel: ClsManagement = <ClsManagement>{};
	public paramConer: ClsManagement = <ClsManagement>{};
	public resultDetail: ClsManagement = <ClsManagement>{};
	public resultClass: ClsManagement = <ClsManagement>{};
	public resultCheck: ClsManagement = <ClsManagement>{};
	//grid select model
	public gridModel: ClsManagement = <ClsManagement>{};
	public SearchConerModel: SearchConer = <SearchConer>{};

    //점
	storeCd : string;
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ClsManagement = <ClsManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ClsManagement = <ClsManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ClsManagement = <ClsManagement>{};
	
	//코너목록
	public conerStore: ClsManagement = <ClsManagement>{};
	public keyStore: ClsManagement = <ClsManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	paymentShowing:any ;
	

	public featureCdStore : any = [
		{featureCd: ' ', featureCdNm: '선택 안함'},
		{featureCd: '1', featureCdNm: '1.일차 식품'},
		{featureCd: '2', featureCdNm: '2.특정 수수료'},
		{featureCd: '3', featureCdNm: '3.특정 수탁'},
		{featureCd: '4', featureCdNm: '4.특정 판매분'},
		{featureCd: '5', featureCdNm: '5.체육 기금'},
		{featureCd: '6', featureCdNm: '6.문화 기금'},
		{featureCd: '7', featureCdNm: '7.공병'},
		{featureCd: '8', featureCdNm: '8.식자재'},
		{featureCd: '9', featureCdNm: '9.비과세MD'},
	 ]

	 public eventCdStore : any = [
		{eventCd: '1', eventCdNm: '1.정상'},
		{eventCd: '2', eventCdNm: '2.행사'},
		{eventCd: '3', eventCdNm: '3.균일'},
	 ]
	 public tagCdStore : any = [
		{tagCd: ' ',tagCdNm: '선택안함'},
		{tagCd: 'T1',tagCdNm: 'T1'},
		{tagCd: 'T2',tagCdNm: 'T2'},
		{tagCd: 'L1',tagCdNm: 'L1'},
		{tagCd: 'L2',tagCdNm: 'L2'},
		{tagCd: 'S1',tagCdNm: 'S1'},
		{tagCd: 'S2',tagCdNm: 'S2'},
	 ]
	constructor(private clsManagementService: ClsManagementService, public envService: EnvService,private cd: ChangeDetectorRef) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.delDt='';
		this.paramModel.userId = this.envService.account.userId;
		this.paramModel.clsNm='';
		this.paramModel.coner='';
		this.paramModel.key='';
		this.paramModel.margin=0;
		console.log("hello");
		//this.paramModel.payment = 'N';
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}
	onPaymentShowing(event){					//컬럼 변수로 지정
		this.paymentShowing = event.cmp;
		console.log('onPaymentShowing'+event.cmp+'event'+event)
	
	}
	onConerReady(event){					//컬럼 변수로 지정
		this.resultClass.coner = event.cmp;
		console.log('onPaymentShowing'+event.cmp+'event'+event)
	
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

	partnerSelected=(event)=>{
		this.paramModel.partner=event.ccpy;
		this.paramModel.partnerNm=event.cmpNm;
		console.log(event)
		  }
	
		
	// closeCcpy(event){
	// 		this.isDialogShowing = false;
	// 		this.cd.detectChanges();
	// 	}
	
	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}
	// searchpartner=(event)=>{
	// 	console.log("click");
	// 	this.isDialogShowing = true;
	// 	console.log(this.isDialogShowing);
	// 	this.searchCcpyParamModel.jum = this.storeCd;
	// 	this.cd.detectChanges();
	// 	event= this.paramModel.partnerNm		
	// }

	//조회 버튼 이벤트
	onTapQuery(event){
		//클래스코드 공백 X 
		//거래형태코드가 매입인 경우 (1,2) 경우 키값이 있어야함
		//MS0627(코드삭제일)이 값이있으면 삭제처리된것
		//직매입일 경우 특정코드 값이 1이면 안됨(1차식품일 경우 마진율 필요없음)
		//코너번호 마지막자리가 3~7사이이면 행사구분값이 없고 매입마진율이 0보다 작으면 안됨
		//키가 01키이거나 99키이면 행사구분 1이면안됨
		//키가 02,21~29이면 행사구분2면안됨
		//키가03,05,31~39,51~59,91~98일땐 행사구분3이면안됨
		//
		
		console.log(this.paramModel);
		this.clsManagementService.selectClsManagement(this.paramModel).subscribe(
			(res: any) => {
				this.resultDetail=res;
				
				if(this.resultDetail!=null)
				{
					this.resultClass=this.resultDetail;
					if(this.resultDetail.payment=null){
						this.resultClass.payment=''
					}
				}
				console.log("resultDetail2:"+this.resultDetail);
				if(this.resultClass.payment==''){
					this.paymentShowing.reset();
				}
				else{
					this.paymentShowing.check();
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
		console.log("resultDetail:"+this.resultDetail);
	}

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		this.clsManagementService.selectClsManagement(this.paramModel).subscribe(
			(res: any) => {
				this.resultCheck=res;
				console.log(this.resultCheck);
				if(this.resultCheck==null){Ext.Msg.alert('Error!!', '폐기할 클래스가 없습니다.');}
				else if(this.resultCheck.delDt!=''){{Ext.Msg.alert('Error!!', '이미 폐기된 클래스입니다.');}}
				else{
					Ext.Msg.confirm("폐기", "클래스를 폐기합니다", 
						(e)=>{
							if( e == 'yes' ){
								this.paramModel.delDt=this.envService.getDateToString(this.startDt);
								this.clsManagementService.saveClsManagement(this.paramModel).subscribe(
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
								this.paramModel.delDt='';
							}
						}
					);
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

		onTapClear(event){
			this.resultClass.clsNm='';
			this.resultClass.coner='';
			this.resultClass.cls1='';
			this.resultClass.cls2='';
			this.resultClass.margin=0;
			this.resultClass.stockLoss=0;
			this.resultClass.partner='';
			this.resultClass.eventCd='';
			this.resultClass.tagCd='';
			this.resultClass.Expire=' ';
			this.paymentShowing.reset();
			this.resultClass.featureCd=' ';
			this.resultClass.eventCd='';
			this.resultClass.tagCd='';
			this.resultClass.stopDt='';
			this.paramModel.userId = this.envService.account.userId;
			console.log("resultDetail:"+this.resultClass);
		}

	//신규 버튼 이벤트
	// onTapNew(event){
	// 	this.formModel = <ClsManagement>{};
	// 	this.isDisabled = false;
	// }

	//수정 버튼 이벤트
	// onTapModify(event){
	// 	this.isDisabled = false;
	// }

	//저장 버튼 이벤트
	onTapSave(event){
		console.log(this.paramModel);
		console.log(this.paramModel.coner+'-------');
		console.log(this.paramModel.coner.length);
		if(this.paramModel.coner==''){{Ext.Msg.alert('Error!!', '1.'); }}
		if(this.paramModel.coner.length!=5){{Ext.Msg.alert('Error!!', '2.'); }}
		if(this.paramModel.coner.substr(4,1)=='6'){{Ext.Msg.alert('Error!!', '3.'); }}
		if(this.paramModel.coner.substr(4,1)=='8'){{Ext.Msg.alert('Error!!', '4.'); }}
		if(this.paramModel.jum==''||this.paramModel.jum==null){Ext.Msg.alert('Error!!', '점를 확인을 해주세요.'); }
		else{
			if(this.paramModel.coner=='' || this.paramModel.coner.length!=5||this.paramModel.coner.substr(4,1)=='6'||this.paramModel.coner.substr(4,1)=='8'){Ext.Msg.alert('Error!!', '코너를 확인을 해주세요.');  }
			
			else{
				//직매입일경우 키값이 안들어가는경우도있음
				console.log(this.paramModel.coner.substr(4,1));
				if((this.paramModel.coner.substr(4,1)=='1'||this.paramModel.coner.substr(4,1)=='2')&&(this.paramModel.key==''||this.paramModel.key.length!=2)){Ext.Msg.alert('Error!!', '키를 확인을 해주세요.');}
				else{
					if(this.paramModel.clsNm==''){Ext.Msg.alert('Error!!', '클래스명을 입력하세요.');}
					else{
						if(this.paramModel.featureCd==null){Ext.Msg.alert('Error!!', '특정코드값을 입력하세요.');}
						else{
							console.log(this.paramModel.margin);
							console.log(this.paramModel.featureCd);
							if((this.paramModel.margin<=0 && this.paramModel.featureCd!='1' &&(this.paramModel.coner.substr(4,1)=='1'||this.paramModel.coner.substr(4,1)=='2'))){Ext.Msg.alert('Error!!', '마진율을 확인하세요.(직매입)');}
							else{
								if(this.paramModel.margin<=0&&(this.paramModel.coner.substr(4,1)>='3'&&this.paramModel.coner.substr(4,1)<='7')&&this.paramModel.key!='99'){Ext.Msg.alert('Error!!', '마진율을 확인하세요(특정)');}
								else{
									if(this.paramModel.eventCd==''||this.paramModel.eventCd==null){Ext.Msg.alert('Error!!', '행사구분을 확인을 해주세요.'); }
									else{
										if(
											  (this.paramModel.featureCd!='1'&&(this.paramModel.key=='01'||this.paramModel.key=='99'))
											// ||(this.paramModel.featureCd!='2'&&(this.paramModel.key=='02'||(this.paramModel.key>='21'&&this.paramModel.key>='29')))
											// ||(this.paramModel.featureCd!='3'&&(this.paramModel.key=='03'||this.paramModel.key=='05'||(this.paramModel.key>='31'&&this.paramModel.key<='39')
											// 	||(this.paramModel.key>='51'&&this.paramModel.key<='59')
											// 	||(this.paramModel.key>='91'&&this.paramModel.key<='98')))
										)
										{Ext.Msg.alert('Error!!', '행사구분과 키값이 일치하지않습니다.'); }
										else{
											if(this.paramModel.tagCd==null){Ext.Msg.alert('Error!!', '태그구분을 선택해주세요.');}
											else{
															Ext.Msg.confirm("저장", "데이터를 저장합니다", 
																(e)=>{
															
																		if( e == 'yes' ){
																			console.log(this.paramModel);				
																			this.clsManagementService.saveClsManagement(this.paramModel).subscribe(
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
																			}
																
																		);
					}}}}}}}}
				}
			}
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.clsManagementService.excelClsManagement(this.paramModel).subscribe(
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
		this.clsManagementService.reportClsManagement(this.paramModel).subscribe(
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
		this.clsManagementService.helpClsManagement(this.paramModel).subscribe(
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
		   this.storeCd=this.comboStoreLv1[0].storeLvCd;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
       this.paramModel.jum = data.newValue;
	   this.storeCd=data.newValue;
	    this.clsManagementService.selectConerList(this.paramModel).subscribe(
		    (res: any) => {
			    //하위 콤보박스를 전부 초기화 한다
			    this.conerStore = res;	
			    //조직(부) data set
			    
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

   // 콤보박스 선택 이벤트
   conerStoreEvent = (data) =>{
       this.paramModel.coner = data.newValue;
	   this.clsManagementService.selectKeyList(this.paramModel).subscribe(
		(res: any) => {
			//하위 콤보박스를 전부 초기화 한다
			this.keyStore = res;	
			//조직(부) data set
			
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
       console.log(data.newValue)
   }
   keyStoreEvent = (data) =>{
	this.paramModel.key = data.newValue;
	console.log(data.newValue)
}
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
   featureCdEvent = (data) =>{
	if(data!=null){
	this.paramModel.featureCd = data.newValue;
	console.log(data.newValue)
	}
}
	clsNmEvent = (data) =>{
		if(data!=null){
		this.paramModel.clsNm = data.newValue;
		console.log(data.newValue)
		}
	}
	ConerEvent = (data) =>{
		if(data!=null){
		this.paramModel.cls1 = data.newValue;
		console.log(data.newValue)
		}
	}
	marginEvent = (data) =>{
		if(data!=null){
		this.paramModel.margin = data.newValue;
		console.log(data.newValue)
		}
	}
	stockLossEvent = (data) =>{
		if(data!=null){
		this.paramModel.stockLoss = data.newValue;
		console.log(data.newValue)
		}
	}
	partnerEvent = (data) =>{
		if(data!=null){
		this.paramModel.partner = data.newValue;
		console.log(data.newValue)
		}
	}
	eventCdEvent = (data) =>{
		if(data!=null){
		this.paramModel.eventCd = data.newValue;
		console.log(data.newValue)
		}
	}
	tagCdEvent = (data) =>{
		if(data!=null){
		this.paramModel.tagCd = data.newValue;
		console.log(data.newValue)
		}
	}
	expireEvent = (data) =>{
		if(data!=null){
		this.paramModel.Expire = data.newValue;
		console.log(data.newValue)
		}
	}
	paymentEvent= (data) =>{
		
		if (data.newValue==true||data.newValue=='Y'){
			this.paramModel.payment = 'Y';
		}
		else if (data.newValue==false||data.newValue=='N')
		{
			this.paramModel.payment = 'N';
		}
		
	}
	searchconer=(event)=>{
		console.log("click")
		this.isDialogShowing = true;
		this.SearchConerParamModel.jum = this.storeCd;
		this.cd.detectChanges();		
		console.log(this.paramModel);
	}


	closeConer(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}
	conerSelected=(event)=>{
		this.paramModel.cls1=event.conerNo;
		this.paramModel.conerNm=event.conerName;
	
		this.paramModel.coner = this.paramModel.cls1;
	   this.clsManagementService.selectKeyList(this.paramModel).subscribe(
		(res: any) => {
			//하위 콤보박스를 전부 초기화 한다
			this.keyStore = res;	
			//조직(부) data set
			
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
	console.log(event);
	console.log(this.paramModel);
	} 

	
}