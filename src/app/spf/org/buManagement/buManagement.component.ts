/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { BuManagement } from './shared/buManagement.model';
import { BuManagementSave } from './shared/buManagement.saveModel';
import { BuManagementService } from './shared/buManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-buManagement',
	templateUrl: './buManagement.component.html',
	providers: [BuManagementService],
})
export class BuManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: BuManagement = <BuManagement>{};

	//form model
	public formModel: BuManagementSave = <BuManagementSave>{};

	//grid select model
	public gridModel: BuManagement = <BuManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: BuManagement = <BuManagement>{};


    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: BuManagement = <BuManagement>{};

	//부2
	public comboStoreBu: any = null;
	public comboStoreBuModel: BuManagement = <BuManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: BuManagement = <BuManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: BuManagement = <BuManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: BuManagement = <BuManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: BuManagement = <BuManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});
	public ms0205Store : any = [
		{ms0205: '1', ms0205Nm: '1.관리'},
		{ms0205: '2', ms0205Nm: '2.영업'}
	 ]


	constructor(private buManagementService: BuManagementService, public envService: EnvService ) { }
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
		this.formModel.ms02Jum= date.newValue;
	}

	//점명 변경 이벤트
	onChangeJumNm(date){
		this.formModel.ms02JumNm= date.newValue;
	}

	//부코드 변경 이벤트
	onChangeBu(date){
		this.formModel.ms02Bu= date.newValue;
	}

	//부명 변경 이벤트
	onChangeBuNm(date){
		this.formModel.ms02BuNm= date.newValue;
	}

	//부서구분 변경 이벤트
	onChange0205(date){
		this.formModel.ms0205= date.newValue;
	}

	//직영인원 변경 이벤트
	onChange0206(date){
		this.formModel.ms0206= date.newValue;
	}

	//총평수 변경 이벤트
	onChange0207(date){
		this.formModel.ms0207= date.newValue;
	}

	//판촉인원 변경 이벤트
	onChange0208(date){
		this.formModel.ms0208= date.newValue;
	}

	//전용면적 변경 이벤트
	onChange0209(date){
		this.formModel.ms0209= date.newValue;
	}

	//공유면적 변경 이벤트
	onChange0210(date){
		this.formModel.ms0210= date.newValue;
	}

	//부서장명 이벤트
	onChange0211(date){
		this.formModel.ms0211= date.newValue;
	}

	//코드폐기일 변경 이벤트
	onChange0214(date){
		this.formModel.ms0214= date.newValue;
	}

	//코드부여일 변경 이벤트
	onChange0215(date){
		this.formModel.ms0215= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChange0216(date){
		this.formModel.ms0216= date.newValue;
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

		this.formModel.ms02Jum = this.paramModel.jum;
		this.formModel.ms02Bu  = this.paramModel.bu;
	this.buManagementService.selectBuManagement(this.formModel).subscribe(
		
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
				this.formModel.ms02Jum = this.paramModel.jum;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.buManagementService.saveBuManagement(this.formModel).subscribe(
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
				this.formModel.ms02Jum = this.paramModel.jum;
				this.formModel.ms02Bu = this.paramModel.bu;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.buManagementService.insertBuManagement(this.formModel).subscribe(
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
		this.formModel.ms02JumNm        = '';       //점명
		this.formModel.ms02BuNm         = '';       //부명
		this.formModel.ms0205          = '';       //1          COLHDG(' 부서구분 ')   
		this.formModel.ms0206          = null;       //5P         COLHDG(' 직영인원 ')   
		this.formModel.ms0207          = null;       //5P         COLHDG(' 총　평수 ')   
		this.formModel.ms0208          = null;       //5P         COLHDG(' 판촉인원 ')   
		this.formModel.ms0209          = null;       //5P         COLHDG(' 전용면적 ')   
		this.formModel.ms0210          = null;      //5P         COLHDG(' 공유면적 ')   
		this.formModel.ms0211          = '';       //16J         COLHDG(' 부서장명 ')   
		this.formModel.ms0212          = '';       //8          COLHDG(' 등록 USER-ID')
		this.formModel.ms0213          = '';       //8          COLHDG(' 변경 USER-ID')
		this.formModel.ms0214          = '';       //8          COLHDG(' 코드폐기일 ') 
		this.formModel.ms0215          = '';       //8          COLHDG(' 코드부여일 ') 
		this.formModel.ms0216          = '';       //8          COLHDG(' 코드수정일 ') 
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.buManagementService.helpBuManagement(this.paramModel).subscribe(
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
			this.buManagementService.selectBuList(this.comboStoreBuModel).subscribe(
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
			this.buManagementService.selectBuList(this.comboStoreBuModel).subscribe(
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
		// this.comboStoreBuModel.bu = data.newValue;
		this.paramModel.jum = this.comboStoreBuModel.jum;
		this.paramModel.bu = data.newValue;
		// this.paramModel.serchLevel = 'bu';
		//부 선택했을때 자동조회
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
	// 	this.buManagementService.selectClsList(this.comboClsModel).subscribe(
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
	// 	this.buManagementService.selectCls2List(this.comboCls2Model).subscribe(
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
	// 	this.buManagementService.excelBuManagement(this.paramModel).subscribe(
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
	// 	this.buManagementService.reportBuManagement(this.paramModel).subscribe(
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
	