/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ZoneManagement } from './shared/zoneManagement.model';
import { ZoneManagementSave } from './shared/zoneManagement.saveModel';
import { ZoneManagementService } from './shared/zoneManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-zoneManagement',
	templateUrl: './zoneManagement.component.html',
	providers: [ZoneManagementService],
})
export class ZoneManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ZoneManagement = <ZoneManagement>{};

	//form model
	public formModel: ZoneManagementSave = <ZoneManagementSave>{};

	//grid select model
	public gridModel: ZoneManagement = <ZoneManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ZoneManagement = <ZoneManagement>{};


    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ZoneManagement = <ZoneManagement>{};

	//부2
	public comboStoreBu: any = null;
	public comboStoreBuModel: ZoneManagement = <ZoneManagement>{};

	// //팀2
	// public comboStoreTim: any = null;
	// public comboStoreTimModel: ZoneManagement = <ZoneManagement>{};

	// //PC2
	// public comboStorePc: any = null;
	// public comboStorePcModel: ZoneManagement = <ZoneManagement>{};

	//존2
	public comboStoreZone: any = null;
	public comboStoreZoneModel: ZoneManagement = <ZoneManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ZoneManagement = <ZoneManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: ZoneManagement = <ZoneManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: ZoneManagement = <ZoneManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: ZoneManagement = <ZoneManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});


	constructor(private zoneManagementService: ZoneManagementService, public envService: EnvService ) { }
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
		this.formModel.ms21Jum= date.newValue;
	}

	//부코드 변경 이벤트
	onChangeBu(date){
		this.formModel.ms21Bu= date.newValue;
	}

	//존코드 변경 이벤트
	onChangeZone(date){
		this.formModel.ms21Zone= date.newValue;
	}

	//Pc 변경 이벤트
	onChangePc(date){
		this.formModel.ms21Pc= date.newValue;
	}

	//Pc명 변경 이벤트
	onChangePcNm(date){
		this.formModel.ms04PcNm= date.newValue;
	}

	//존명 변경 이벤트
	onChangeZoneNm(date){
		this.formModel.ms21ZoneNm= date.newValue;
	}

	//전용면적 변경 이벤트
	onChange2107(date){
		this.formModel.ms2107= date.newValue;
	}

	//공유면적 변경 이벤트
	onChange2108(date){
		this.formModel.ms2108= date.newValue;
	}

	//직영인원 변경 이벤트
	onChange2109(date){
		this.formModel.ms2109= date.newValue;
	}

	//판촉인원 변경 이벤트
	onChange2110(date){
		this.formModel.ms2110= date.newValue;
	}
	
	//코드부여일 변경 이벤트
	onChange2111(date){
		this.formModel.ms2111= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChange2112(date){
		this.formModel.ms2112= date.newValue;
	}
	
	//코드폐기일 변경 이벤트
	onChange2113(date){
		this.formModel.ms2113= date.newValue;
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

		this.formModel.ms21Jum = this.paramModel.jum;
		this.formModel.ms21Bu  = this.paramModel.bu;
		// this.formModel.ms21Tim = this.paramModel.tim;
		// this.formModel.ms21Pc = this.paramModel.pc;
		this.formModel.ms21Zone  = this.paramModel.zone;
		console.log(this.formModel);
	this.zoneManagementService.selectZoneManagement(this.formModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				
				// this.gridStore.setData(res);
				this.formModel = res;
				// console.log(this.formModel);
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
				this.formModel.ms21Jum = this.paramModel.jum;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.zoneManagementService.saveZoneManagement(this.formModel).subscribe(
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
				this.formModel.ms21Jum = this.paramModel.jum;
				this.formModel.ms21Bu = this.paramModel.bu;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.zoneManagementService.insertZoneManagement(this.formModel).subscribe(
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
		this.formModel.ms21Jum         = '';        //점코드        
		this.formModel.ms21Bu          = '';        //부코드        
		this.formModel.ms21Tim         = '';        //팀코드    
		this.formModel.ms21Pc          = '';        //PC코드        
		this.formModel.ms04PcNm        = '';        //PC코드        
		this.formModel.ms21Zone        = '';        //존코드        
		this.formModel.ms21ZoneNm      = '';        //존명
		this.formModel.ms2107         = null;        //         5  0       COLHDG(' 전용면적 ')    
		this.formModel.ms2108         = null;        //         5  0       COLHDG(' 공유면적 ')    
		this.formModel.ms2109         = null;        //         5P         COLHDG(' 직영인원 ')
		this.formModel.ms2110         = null;        //         5  0       COLHDG(' 판촉인원 ')    
		this.formModel.ms2111        = '';        //          8          COLHDG(' 코드부여일 ')  
		this.formModel.ms2112        = '';        //          8          COLHDG(' 코드수정일 ')  
		this.formModel.ms2113        = '';        //          8          COLHDG(' 코드폐기일 ')  
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.zoneManagementService.helpZoneManagement(this.paramModel).subscribe(
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
			this.zoneManagementService.selectBuList(this.comboStoreBuModel).subscribe(
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
			this.zoneManagementService.selectBuList(this.comboStoreBuModel).subscribe( //내장 호출시 콤보 모델을 넘겨야됨
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
		this.paramModel.zone = '';
			console.log(this.comboStoreBuModel);
			console.log(this.paramModel);
		   this.zoneManagementService.selectZoneList(this.paramModel).subscribe( // 파람모델을 넘겨야됨
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				//조직(zone) data set
				this.comboStoreZone = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
	}

	//존 콤보박스 선택 이벤트
	comboStoreZoneEvent = (data) =>{
		//조직(PC) 세부 조회
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu  = this.comboStoreBuModel.bu;
		this.comboStoreBuModel.zone = data.newValue;
		this.paramModel.zone = this.comboStoreBuModel.zone;
		//존 선택했을때 자동조회
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
	// 	this.zoneManagementService.selectClsList(this.comboClsModel).subscribe(
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
	// 	this.zoneManagementService.selectCls2List(this.comboCls2Model).subscribe(
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
	// 	this.zoneManagementService.excelZoneManagement(this.paramModel).subscribe(
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
	// 	this.zoneManagementService.reportZoneManagement(this.paramModel).subscribe(
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
	