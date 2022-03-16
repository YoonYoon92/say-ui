/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CornerManagement } from './shared/cornerManagement.model';
import { CornerManagementSave } from './shared/cornerManagement.saveModel';
import { CornerManagementService } from './shared/cornerManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-cornerManagement',
	templateUrl: './cornerManagement.component.html',
	providers: [CornerManagementService],
})
export class CornerManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: CornerManagement = <CornerManagement>{};

	//form model
	public formModel: CornerManagementSave = <CornerManagementSave>{};

	//grid select model
	public gridModel: CornerManagement = <CornerManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: CornerManagement = <CornerManagement>{};


    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: CornerManagement = <CornerManagement>{};

	//부2
	public comboStoreCorner: any = null;
	public comboStoreCornerModel: CornerManagement = <CornerManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: CornerManagement = <CornerManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: CornerManagement = <CornerManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: CornerManagement = <CornerManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: CornerManagement = <CornerManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});

	public ms0511Store : any = [
		{ms0511: 'A', ms0511Nm: 'A등급'},
		{ms0511: 'B', ms0511Nm: 'B등급'},
		{ms0511: 'C', ms0511Nm: 'C등급'},
		{ms0511: 'D', ms0511Nm: 'D등급'},
		
	 ]
	 
	 public ms05703Store : any = [
		{ms05703: '1', ms05703Nm: '대형'},
		{ms05703: '2', ms05703Nm: '전략'},
		{ms05703: ' ', ms05703Nm: '일반'},
		
		
	 ]

	constructor(private cornerManagementService: CornerManagementService, public envService: EnvService ) { }
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
		this.formModel.ms05Jum= date.newValue;
	}

	//점명 변경 이벤트
	// onChangeJumNm(date){
	// 	this.formModel.ms05JumNm= date.newValue;
	// }

	//부코드 변경 이벤트
	onChangeBu(date){
		this.formModel.ms05Bu= date.newValue;
	}

	//부명 변경 이벤트
	// onChangeBuNm(date){
	// 	this.formModel.ms05BuNm= date.newValue;
	// }

	//팀코드 변경 이벤트
	onChangeTim(date){
		this.formModel.ms05Tim= date.newValue;
	}

	//팀명 변경 이벤트
	// onChangeTimNm(date){
	// 	this.formModel.ms05TimNm= date.newValue;
	// }

	//PC코드 변경 이벤트
	onChangePc(date){
		this.formModel.ms05Pc= date.newValue;
	}

	//PC명 변경 이벤트
	onChangePcNm(date){
		this.formModel.ms05PcNm= date.newValue;
	}

	onChange05Tim(date){
		this.formModel.ms05TimNm= date.newValue;
	}

	//코너코드 변경 이벤트
	onChangeCorner(date){
		this.formModel.ms05Corner= date.newValue;
	}

	//코너명 변경 이벤트
	onChangeCornerNm(date){
		this.formModel.ms05CornerNm= date.newValue;
	}

	onChange0511(date){
		this.formModel.ms0511= date.newValue;
	}

	onChange0512(date){
		this.formModel.ms0512= date.newValue;
	}
	
	onChange0513(date){
		this.formModel.ms0513= date.newValue;
	}
	
	onChange0514(date){
		this.formModel.ms0514= date.newValue;
	}
	
	onChange05703(date){
		this.formModel.ms05703= date.newValue;
	}
	
	onChange05704(date){
		this.formModel.ms05704= date.newValue;
	}
	
	onChange05705(date){
		this.formModel.ms05705= date.newValue;
	}


	//코드폐기일 변경 이벤트
	onChange0515(date){
		this.formModel.ms0515= date.newValue;
	}

	//코드부여일 변경 이벤트
	onChange0516(date){
		this.formModel.ms0516= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChange0517(date){
		this.formModel.ms0517= date.newValue;
	}

	//존 변경 이벤트
	onChange0518(date){
		this.formModel.ms0518= date.newValue;
	}

	//존 변경 이벤트
	onChange05212(date){
		this.formModel.ms05212= date.newValue;
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
		this.formModel.ms05Jum     = this.paramModel.jum;
		this.formModel.ms05Corner  = this.paramModel.corner;
		// console.log(this.paramModel);
		console.log(this.formModel);
		// console.log(this.comboStoreCornerModel);
		if(this.formModel.ms05Corner == null || this.formModel.ms05Corner == '' || this.formModel.ms05Corner == "")
		{
		Ext.Msg.alert('Error!!', '코너번호를 입력하세요');
		}
		else
		{
		this.cornerManagementService.selectCornerManagement(this.formModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.formModel = res;
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
	};

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			()=>{
				this.formModel.ms05Jum = this.paramModel.jum;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.cornerManagementService.saveCornerManagement(this.formModel).subscribe(
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
				this.formModel.ms05Jum = this.paramModel.jum;
				// this.formModel.ms05Bu = this.paramModel.bu;
				console.log(this.paramModel);
				console.log(this.formModel);
				this.cornerManagementService.insertCornerManagement(this.formModel).subscribe(
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
		this.formModel.ms05JumNm       = '';       //점명
		this.formModel.ms05BuNm        = '';       //부명
		this.formModel.ms05Bu          = '';       //부코드        
		this.formModel.ms05Tim         = '';       //팀코드        
		this.formModel.ms05Pc          = '';       //PC코드        
		this.formModel.ms05Corner      = '';       //코너코드        
		this.formModel.ms05JumNm       = '';       //점명
		this.formModel.ms05BuNm        = '';       //부명
		this.formModel.ms05TimNm       = '';       //팀명
		this.formModel.ms05PcNm        = '';       //PC명
		this.formModel.ms05CornerNm    = '';       //코너명

		this.formModel.ms0511          = '';       //16J         COLHDG(' 부서장명 ')   
		this.formModel.ms0512          = null;     //5P         COLHDG(' 직영인원 ')   
		this.formModel.ms0513          = null;     //5P         COLHDG(' 총　평수 ')   
		this.formModel.ms0514          = null;     //5P         COLHDG(' 판촉인원 ')   
		this.formModel.ms0515          = '';       //8          COLHDG(' 코드부여일 ') 
		this.formModel.ms0516          = '';       //8          COLHDG(' 코드수정일 ') 
		this.formModel.ms0517          = '';
		this.formModel.ms0518          = '';
		this.formModel.ms0519          = '';
		this.formModel.ms0520          = '';
		this.formModel.ms0521          = '';
		this.formModel.ms05211          = '';
		this.formModel.ms05212          = '';
		this.formModel.ms05213          = '';

		this.formModel.ms05703          = '';
		this.formModel.ms05704          = '';
		this.formModel.ms05705          = '';

		this.formModel.ms05103          = '';
		this.formModel.ms05104          = '';
		this.formModel.ms05107          = '';
		this.formModel.dgs0204          = '';
		this.formModel.egs0204          = '';

		
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.cornerManagementService.helpCornerManagement(this.paramModel).subscribe(
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
				// //점부코드 기본세팅
				// this.comboStoreCorner = {
				// 	storeLvCd: '71',
				// 	storeLvNm: '제1사업부'
				// }  
				// this.paramModel.bu = '71';	
				//this.comboStoreBuModel.paramLvCd = '71';
		this.comboStoreCornerModel.jum = this.comboStoreLv1Model.paramLvCd;
		//this.envService.selectStoreComboLv2List(this.comboStoreBuModel).subscribe(
			console.log(this.comboStoreCornerModel);
			// console.log(this.paramModel);
			// console.log(this.formModel);
			this.cornerManagementService.selectCornerList(this.comboStoreCornerModel).subscribe(
		    (res: any) => {
			this.comboStoreCorner = res;
		},
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );

   }

   //점 콤보박스 선택 이벤트
	   comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
		// this.paramModel.serchLevel = 'jum';
		 //조직(코너) 조회
		 this.comboStoreCornerModel.jum = data.newValue;
		 this.paramModel.corner =null;
		 	this.cornerManagementService.selectCornerList(this.comboStoreCornerModel).subscribe(
			 (res: any) => {
				 //하위 콤보박스를 전부 초기화 한다
				 //조직(부) data set
				 this.comboStoreCorner = res;
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
	}

	//코너 콤보박스 선택 이벤트
	comboStoreCornerEvent = (data) =>{
		// this.comboStoreBuModel.bu = data.newValue;
		this.paramModel.jum = this.comboStoreCornerModel.jum;
		this.paramModel.corner = data.newValue;
		console.log(this.paramModel);
		// this.paramModel.serchLevel = 'bu';
		// 코너 선택했을때 자동조회
		// this.onTapQuery(this.paramModel);
		
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
	// 	this.cornerManagementService.selectClsList(this.comboClsModel).subscribe(
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
	// 	this.cornerManagementService.selectCls2List(this.comboCls2Model).subscribe(
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
	// 	this.cornerManagementService.excelCornerManagement(this.paramModel).subscribe(
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
	// 	this.cornerManagementService.reportCornerManagement(this.paramModel).subscribe(
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
	