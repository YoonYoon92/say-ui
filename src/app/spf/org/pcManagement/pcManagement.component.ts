/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { PcManagement } from './shared/pcManagement.model';
import { PcManagementSave } from './shared/pcManagement.saveModel';
import { PcManagementService } from './shared/pcManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-pcManagement',
	templateUrl: './pcManagement.component.html',
	providers: [PcManagementService],
})
export class PcManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: PcManagement = <PcManagement>{};

	//form model
	public formModel: PcManagementSave = <PcManagementSave>{};

	//grid select model
	public gridModel: PcManagement = <PcManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: PcManagement = <PcManagement>{};


    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: PcManagement = <PcManagement>{};

	//부2
	public comboStoreBu: any = null;
	public comboStoreBuModel: PcManagement = <PcManagement>{};

	//팀2
	public comboStoreTim: any = null;
	public comboStoreTimModel: PcManagement = <PcManagement>{};

	//PC2
	public comboStorePc: any = null;
	public comboStorePcModel: PcManagement = <PcManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: PcManagement = <PcManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: PcManagement = <PcManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: PcManagement = <PcManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: PcManagement = <PcManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});


	constructor(private pcManagementService: PcManagementService, public envService: EnvService ) { }
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
		this.formModel.ms04Jum= date.newValue;
	}

	//점명 변경 이벤트
	onChangeJumNm(date){
		this.formModel.ms04JumNm= date.newValue;
	}

	//부코드 변경 이벤트
	onChangeBu(date){
		this.formModel.ms04Bu= date.newValue;
	}

	//부명 변경 이벤트
	onChangeBuNm(date){
		this.formModel.ms04BuNm= date.newValue;
	}
	//팀코드 변경 이벤트
	onChangeTim(date){
		this.formModel.ms04Tim= date.newValue;
	}

	//팀명 변경 이벤트
	onChangeTimNm(date){
		this.formModel.ms04TimNm= date.newValue;
	}

	//PC명 변경 이벤트
	onChangePcNm(date){
		this.formModel.ms04PcNm= date.newValue;
	}

	//층 변경 이벤트
	onChange0411(date){
		this.formModel.ms0411= date.newValue;
	}

	//직영인원 변경 이벤트
	onChange0409(date){
		this.formModel.ms0409= date.newValue;
	}

	//총평수 변경 이벤트
	onChange0410(date){
		this.formModel.ms0410= date.newValue;
	}

	//판촉인원 변경 이벤트
	onChange0412(date){
		this.formModel.ms0412= date.newValue;
	}

	//전용면적 변경 이벤트
	onChange0413(date){
		this.formModel.ms0413= date.newValue;
	}

	//공유면적 변경 이벤트
	onChange0414(date){
		this.formModel.ms0414= date.newValue;
	}

	//부서장명 이벤트
	onChange0415(date){
		this.formModel.ms0415= date.newValue;
	}

	//코드폐기일 변경 이벤트
	onChange0418(date){
		this.formModel.ms0418= date.newValue;
	}

	//코드부여일 변경 이벤트
	onChange0419(date){
		this.formModel.ms0419= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChange0420(date){
		this.formModel.ms0420= date.newValue;
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

		this.formModel.ms04Jum = this.paramModel.jum;
		this.formModel.ms04Bu  = this.paramModel.bu;
		this.formModel.ms04Tim = this.paramModel.tim;
		this.formModel.ms04Pc = this.paramModel.pc;
	this.pcManagementService.selectPcManagement(this.formModel).subscribe(
		
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
				this.formModel.ms04Jum = this.paramModel.jum;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.pcManagementService.savePcManagement(this.formModel).subscribe(
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
				this.formModel.ms04Jum = this.paramModel.jum;
				this.formModel.ms04Bu = this.paramModel.bu;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.pcManagementService.insertPcManagement(this.formModel).subscribe(
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
		this.formModel.ms04JumNm        = '';       //점명
		this.formModel.ms04BuNm         = '';       //부명
		this.formModel.ms04TimNm        = '';       //팀명
		this.formModel.ms04PcNm         = '';       //PC명
		this.formModel.ms0409         = null;       //         5P         COLHDG(' ＰＣ직영인원 ')
		this.formModel.ms0410         = null;       //         5P         COLHDG(' ＰＣ총평수 ')  
		this.formModel.ms0411         = '';       //          2          COLHDG(' 층수 ')        
		this.formModel.ms0412         = null;       //         5  0       COLHDG(' 판촉인원 ')    
		this.formModel.ms0413         = null;       //         5  0       COLHDG(' 전용면적 ')    
		this.formModel.ms0414         = null;       //         5  0       COLHDG(' 공유면적 ')    
		this.formModel.ms0415         = '';       //         16J         COLHDG(' ＰＣ장명 ')    
		this.formModel.ms0416         = '';       //          8          COLHDG(' 등록 USER-ID') 
		this.formModel.ms0417         = '';       //          8          COLHDG(' 변경 USER-ID') 
		this.formModel.ms0418         = '';       //          8          COLHDG(' 코드폐기일 ')  
		this.formModel.ms0419         = '';       //          8          COLHDG(' 코드부여일 ')  
		this.formModel.ms0420         = '';       //          8          COLHDG(' 코드수정일 ')  
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.pcManagementService.helpPcManagement(this.paramModel).subscribe(
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
			this.pcManagementService.selectBuList(this.comboStoreBuModel).subscribe(
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
			this.pcManagementService.selectBuList(this.comboStoreBuModel).subscribe( //내장 호출시 콤보 모델을 넘겨야됨
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
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.comboStoreBuModel.bu = data.newValue;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.paramModel.tim = '';
			console.log(this.comboStoreBuModel);
			console.log(this.paramModel);
		   this.pcManagementService.selectTimList(this.paramModel).subscribe( // 파람모델을 넘겨야됨
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
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.comboStoreBuModel.tim = data.newValue;
		this.paramModel.tim = this.comboStoreBuModel.tim;
		console.log(this.comboStoreBuModel);
		console.log(this.paramModel);
		this.pcManagementService.selectPcList(this.paramModel).subscribe( // 파람모델을 넘겨야됨
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				//조직(PC) data set
				this.comboStorePc = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);

	}

	//PC 콤보박스 선택 이벤트
	comboStorePcEvent = (data) =>{
		//조직(PC) 세부 조회
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.paramModel.tim = this.comboStoreBuModel.tim;
		this.comboStoreBuModel.pc = data.newValue;
		this.paramModel.pc = this.comboStoreBuModel.pc;

		//PC 선택했을때 자동조회
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
	// 	this.pcManagementService.selectClsList(this.comboClsModel).subscribe(
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
	// 	this.pcManagementService.selectCls2List(this.comboCls2Model).subscribe(
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
	// 	this.pcManagementService.excelPcManagement(this.paramModel).subscribe(
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
	// 	this.pcManagementService.reportPcManagement(this.paramModel).subscribe(
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
	