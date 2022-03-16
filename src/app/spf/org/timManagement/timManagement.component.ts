/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { TimManagement } from './shared/timManagement.model';
import { TimManagementSave } from './shared/timManagement.saveModel';
import { TimManagementService } from './shared/timManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-timManagement',
	templateUrl: './timManagement.component.html',
	providers: [TimManagementService],
})
export class TimManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: TimManagement = <TimManagement>{};

	//form model
	public formModel: TimManagementSave = <TimManagementSave>{};

	//grid select model
	public gridModel: TimManagement = <TimManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: TimManagement = <TimManagement>{};


    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: TimManagement = <TimManagement>{};

	//부2
	public comboStoreBu: any = null;
	public comboStoreBuModel: TimManagement = <TimManagement>{};

	//팀2
	public comboStoreTim: any = null;
	public comboStoreTimModel: TimManagement = <TimManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: TimManagement = <TimManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: TimManagement = <TimManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: TimManagement = <TimManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: TimManagement = <TimManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});
	public ms0312Store : any = [
		{ms0312: '11', ms0312Nm: '11.식품'},
		{ms0312: '12', ms0312Nm: '12.잡화'},
		{ms0312: '13', ms0312Nm: '13.여성'},
		{ms0312: '14', ms0312Nm: '14.남성'},
		{ms0312: '15', ms0312Nm: '15.아동'},
		{ms0312: '16', ms0312Nm: '16.생활'},
		{ms0312: '17', ms0312Nm: '17.문화'},
		{ms0312: '19', ms0312Nm: '19.특판'},
	 ]

	constructor(private timManagementService: TimManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		
	
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	   if (this.envService.account.userId=="219001"){
		this.paramModel.dbType='TS'
		}
		else
		{
			this.paramModel.dbType=''
		}
	}

	//점코드 변경 이벤트
	onChangeJum(date){
		this.formModel.ms03Jum= date.newValue;
	}

	//점명 변경 이벤트
	onChangeJumNm(date){
		this.formModel.ms03JumNm= date.newValue;
	}

	//부코드 변경 이벤트
	onChangeBu(date){
		this.formModel.ms03Bu= date.newValue;
	}

	//부명 변경 이벤트
	onChangeBuNm(date){
		this.formModel.ms03BuNm= date.newValue;
	}
	//팀코드 변경 이벤트
	onChangeTim(date){
		this.formModel.ms03Tim= date.newValue;
	}

	//팀명 변경 이벤트
	onChangeTimNm(date){
		this.formModel.ms03TimNm= date.newValue;
	}

	//부서구분 변경 이벤트
	onChange0312(date){
		this.formModel.ms0312= date.newValue;
	}

	//직영인원 변경 이벤트
	onChange0307(date){
		this.formModel.ms0307= date.newValue;
	}

	//총평수 변경 이벤트
	onChange0309(date){
		this.formModel.ms0309= date.newValue;
	}

	//판촉인원 변경 이벤트
	onChange0308(date){
		this.formModel.ms0308= date.newValue;
	}

	//전용면적 변경 이벤트
	onChange0310(date){
		this.formModel.ms0310= date.newValue;
	}

	//공유면적 변경 이벤트
	onChange0311(date){
		this.formModel.ms0311= date.newValue;
	}

	//부서장명 이벤트
	onChange0313(date){
		this.formModel.ms0313= date.newValue;
	}

	//코드폐기일 변경 이벤트
	onChange0318(date){
		this.formModel.ms0318= date.newValue;
	}

	//코드부여일 변경 이벤트
	onChange0316(date){
		this.formModel.ms0316= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChange0317(date){
		this.formModel.ms0317= date.newValue;
	}
	
	//grid row 선택 이벤트
	// onSelectGrid(row){
	// 	//row 데이터 model 바인딩
	// 	this.gridModel = row.selected[0].data;
	// }

	// //grid ready
	// gridCmp : any;
	// onReadyGrid(event){
	// 	this.gridCmp = event.cmp;
	// }

	//조회 버튼 이벤트
	onTapQuery(event){
		// console.log(this.formModel);
		// this.gridCmp.setMasked({
		// 	xtype: 'loadmask',
		// 	message: 'Loading...'
		// });

		this.formModel.ms03Jum = this.paramModel.jum;
		this.formModel.ms03Bu  = this.paramModel.bu;
		this.formModel.ms03Tim = this.paramModel.tim;
	this.timManagementService.selectTimManagement(this.formModel).subscribe(
		
			(res: any) => {
				/**
				 * @success
				 */
				
				// this.gridStore.setData(res);
				this.formModel = res;
				console.log(this.formModel);
				// this.gridCmp.setMasked(false);

			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				// this.gridCmp.setMasked(false);
			}
		);
	}


	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			()=>{
				this.formModel.ms03Jum = this.paramModel.jum;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.timManagementService.saveTimManagement(this.formModel).subscribe(
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
		Ext.Msg.confirm("신규", "새 데이터를 저장합니다", 
			()=>{
				this.formModel.ms03Jum = this.paramModel.jum;
				this.formModel.ms03Bu = this.paramModel.bu;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.timManagementService.insertTimManagement(this.formModel).subscribe(
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

	//초기화 버튼 이벤트
	onTapClear(event){
		this.formModel.ms03JumNm  = '';       //점명
		this.formModel.ms03BuNm   = '';       //부명
		this.formModel.ms03TimNm   = '';       //팀명
		this.formModel.ms0306   = '';       //        20J         COLHDG(' 팀명 ')        
		this.formModel.ms0307     = null;       //         5  0       COLHDG(' 직영인원 ')    
		this.formModel.ms0308     = null;       //         5  0       COLHDG(' 팀판촉인원 ')  
		this.formModel.ms0309     = null;       //         5  0       COLHDG(' 팀총평수 ')    
		this.formModel.ms0310     = null;       //         5  0       COLHDG(' 팀전용면적 ')  
		this.formModel.ms0311     = null;       //         5  0       COLHDG(' 팀공유면적 ')  
		this.formModel.ms0312   = '';       //         2A         COLHDG(' 내부부서코드 ')
		this.formModel.ms0313   = '';       //        16J         COLHDG(' 팀장명 ')      
		this.formModel.ms0314   = '';       //         8A         COLHDG(' 등록 USER-ID') 
		this.formModel.ms0315   = '';       //         8A         COLHDG(' 변경 USER-ID') 
		this.formModel.ms0316   = '';       //         8A         COLHDG(' 코드부여일 ')  
		this.formModel.ms0317   = '';       //         8A         COLHDG(' 코드수정일 ')  
		this.formModel.ms0318   = '';       //         8A         COLHDG(' 코드폐기일 ')  
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.timManagementService.helpTimManagement(this.paramModel).subscribe(
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

				//점부코드 기본세팅
				this.comboStoreBu = {
					storeLvCd: '71',
					storeLvNm: '제1사업부'
				}  
				this.paramModel.bu = '71';	
				//this.comboStoreBuModel.paramLvCd = '71';
		this.comboStoreBuModel.jum = this.comboStoreLv1Model.paramLvCd;
		//this.envService.selectStoreComboLv2List(this.comboStoreBuModel).subscribe(
			this.timManagementService.selectBuList(this.comboStoreBuModel).subscribe(
		    (res: any) => {
			this.comboStoreBu = res;
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
		 this.comboStoreBuModel.jum = data.newValue;
		 this.paramModel.bu =null;
		 //this.envService.selectStoreComboLv2List(this.comboStoreBuModel).subscribe(
			console.log(this.paramModel);
			console.log(this.formModel);
			this.timManagementService.selectBuList(this.comboStoreBuModel).subscribe( //내장 호출시 콤보 모델을 넘겨야됨
			 (res: any) => {
				 //하위 콤보박스를 전부 초기화 한다
				 //조직(부) data set
				 this.comboStoreBu = res;
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
	}

	//부 콤보박스 선택 이벤트
	comboStoreBuEvent = (data) =>{
		//조직(팀) 조회
		this.comboStoreBuModel.bu = data.newValue;
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.paramModel.tim = '';
			console.log(this.comboStoreBuModel);
			console.log(this.paramModel);
		   this.timManagementService.selectTimList(this.paramModel).subscribe( // 파람모델을 넘겨야됨
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				//조직(팀) data set
				this.comboStoreTim = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
	}

	//팀 콤보박스 선택 이벤트
	comboStoreTimEvent = (data) =>{
		//조직(팀) 세부 조회
		this.comboStoreBuModel.tim = data.newValue;
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.paramModel.tim = this.comboStoreBuModel.tim;

		//팀 선택했을때 자동조회
		this.onTapQuery(this.paramModel);
		
	}


      //Title 버튼 이벤트
	  onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}
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
    //팀 콤보박스 선택 이벤트
	// comboStoreLv4Event = (data) =>{
	// 	this.paramModel.pc = data.newValue;	
	// 	this.comboClsModel=this.paramModel
	// 	this.timManagementService.selectClsList(this.comboClsModel).subscribe(
	// 		(res: any) => {
	// 			//조직(팀) data set
	// 			this.comboCls = res;
	// 		},
	// 		(err: HttpErrorResponse) => {
	// 			Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		}
	// 	);
	// }
	//코너 콤보박스 선택 이벤트
	// comboClsEvent = (data) =>{
	// 	this.paramModel.cls1 = data.newValue;	
	// 	console.log(this.paramModel);
	// 	this.comboCls2Model=this.paramModel
	// 	this.timManagementService.selectCls2List(this.comboCls2Model).subscribe(
	// 		(res: any) => {
	// 			//조직(팀) data set
	// 			this.comboCls2 = res;
	// 		},
	// 		(err: HttpErrorResponse) => {
	// 			Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		}
	// 	);
	// }
	// comboCls2Event = (data) =>{
	// 	this.paramModel.cls2 = data.newValue;	
	// 	console.log(this.paramModel);
	// }


	//엑셀 버튼 이벤트
	// onTapExcel(event){
	// 	this.timManagementService.excelTimManagement(this.paramModel).subscribe(
	// 		(res: any) => {
	// 			/**
	// 			 * @success
	// 			 */
	// 		},
	// 		(err: HttpErrorResponse) => {
	// 			/**
	// 			 * @error
	// 			 */
	// 			Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		}
	// 	);
	// }

	//레포트 버튼 이벤트
	// onTapReport(event){
	// 	this.timManagementService.reportTimManagement(this.paramModel).subscribe(
	// 		(res: any) => {
	// 			/**
	// 			 * @success
	// 			 */
	// 		},
	// 		(err: HttpErrorResponse) => {
	// 			/**
	// 			 * @error
	// 			 */
	// 			Ext.Msg.alert('Error!!', 'Server communication error.');
	// 		}
	// 	);
	// }
	