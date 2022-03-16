/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { JumManagement } from './shared/jumManagement.model';
import { JumManagementSave } from './shared/jumManagement.saveModel';
import { JumManagementService } from './shared/jumManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-jumManagement',
	templateUrl: './jumManagement.component.html',
	providers: [JumManagementService],
})
export class JumManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: JumManagement = <JumManagement>{};

	//form model
	public formModel: JumManagementSave = <JumManagementSave>{};

	//grid select model
	public gridModel: JumManagement = <JumManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: JumManagement = <JumManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: JumManagement = <JumManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: JumManagement = <JumManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: JumManagement = <JumManagement>{};
	//코너
	public comboCls: any = null;
	public comboClsModel: JumManagement = <JumManagement>{};
	//클래스키
	public comboCls2: any = null;
	public comboCls2Model: JumManagement = <JumManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});


	constructor(private jumManagementService: JumManagementService, public envService: EnvService ) { }
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
		this.formModel.ms01Jum= date.newValue;
	}

	//점명 변경 이벤트
	onChangeJumNm(date){
		this.formModel.ms01JumNm= date.newValue;
	}

	//사업자 변경 이벤트
	onChangeSano(date){
		this.formModel.ms01Sano= date.newValue;

	}

	//대표자 변경 이벤트
	onChangeDname(date){
		this.formModel.ms01Dname= date.newValue;
	}

	//주민1 변경 이벤트
	onChangeJuno1(date){
		this.formModel.ms01Juno1= date.newValue;
	}

	//주민2 변경 이벤트
	// onChangeJuno2(date){
	// 	this.formModel.ms01Juno2= date.newValue;
	// }

	//우편1 변경 이벤트
	onChangePost1(date){
		this.formModel.ms01Post1= date.newValue;
	}

	//우편2 변경 이벤트
	// onChangePost2(date){
	// 	this.formModel.ms01Post2= date.newValue;
	// }

	//주소 변경 이벤트
	onChangeAddress(date){
		this.formModel.ms01Address= date.newValue;
	}

	//전화1 변경 이벤트
	onChangePhone1(date){
		this.formModel.ms01Phone1= date.newValue;
	}

	//전화2 변경 이벤트
	// onChangePhone2(date){
	// 	this.formModel.ms01Phone2= date.newValue;
	// }

	//전화3 변경 이벤트
	// onChangePhone3(date){
	// 	this.formModel.ms01Phone3= date.newValue;
	// }

	//창립일 변경 이벤트
	onChangeCrdate(date){
		this.formModel.ms01Crdate= date.newValue;
	}

	//결산월 변경 이벤트
	onChangeCamonth(date){
		this.formModel.ms01Camonth= date.newValue;
	}

	//코드폐기일 변경 이벤트
	onChangeDeldate(date){
		this.formModel.ms01Deldate= date.newValue;
	}

	//코드부여일 변경 이벤트
	onChangeAdddate(date){
		this.formModel.ms01Adddate= date.newValue;
	}

	//코드수정일 변경 이벤트
	onChangeUptdate(date){
		this.formModel.ms01Uptdate= date.newValue;
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

	this.formModel.ms01Jum = this.paramModel.jum;
	this.jumManagementService.selectJumManagement(this.formModel).subscribe(
		
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
	// onTapSave(event){
	// 	Ext.Msg.confirm("확인", "데이터를 저장합니다",function(button) { 
	// 		console.log(button);
	// 		if (button == 'yes') { 
				
	// 			this.formModel.ms01Jum = this.paramModel.jum;
	// 			console.log(this.paramModel);
	// 			console.log(this.formModel);
	// 			this.jumManagementService.saveJumManagement(this.formModel).subscribe(
	// 				(res: any) => {
	// 					/**
	// 					 * @success
	// 					 */
	// 				},
	// 				(err: HttpErrorResponse) => {
	// 					/**
	// 					 * @error
	// 					 */
	// 					Ext.Msg.alert('Error!!', 'Server communication error.');
	// 				}
	// 			);
	// 		}
	// 		if (button == 'no') { 
	// 			Ext.Msg.alert('Cancel!!', '취소했습니다.');
	// 		}
	// 	}			
	// 	);
	// }

	// //저장 버튼 이벤트
	// onTapSave(event){
	// 	Ext.Msg.confirm("저장", "변경 사항을 저장합니다", 
	// 		()=>{
	// 			this.formModel.ms01Jum = this.paramModel.jum;
	// 			this.formModel.ms01Mod = 'U';
	// 			console.log(this.paramModel);
	// 			console.log(this.formModel);
	// 			this.jumManagementService.saveJumManagement(this.formModel).subscribe(
	// 				(res: any) => {
	// 					/**
	// 					 * @success
	// 					 */
	// 					Ext.Msg.alert('Success','저장했습니다.');
	// 				},
	// 				(err: HttpErrorResponse) => {
	// 					/**
	// 					 * @error
	// 					 */
	// 					Ext.Msg.alert('Error','저장실패');
	// 					Ext.Msg.alert('Error!!', 'Server communication error.');
	// 				}
	// 			);
	// 		}			
	// 	);
	// }

		//저장 버튼 이벤트
	onTapSave(event){
		this.formModel.ms01Jum = this.paramModel.jum;
		this.formModel.ms01Mod = 'U';
		console.log(this.paramModel);
		console.log(this.formModel);
		this.jumManagementService.saveJumManagement(this.formModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				 Ext.Msg.alert('Success','저장했습니다.');
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				 Ext.Msg.alert('Error','저장실패');
			}
		);
	}

	// //신규 버튼 이벤트
	// onTapNew(event){
	// 	Ext.Msg.confirm("신규", "새 데이터를 저장합니다", 
	// 		()=>{
	// 			this.formModel.ms01Jum = this.paramModel.jum;
	// 			this.formModel.ms01Mod = 'A';
	// 			console.log(this.paramModel);
	// 			console.log(this.formModel);
	// 			// this.jumManagementService.insertJumManagement(this.formModel).subscribe(
	// 			this.jumManagementService.saveJumManagement(this.formModel).subscribe(
	// 				(res: any) => {
	// 					/**
	// 					 * @success
	// 					 */
	// 					 Ext.Msg.alert('Success','저장했습니다.');
	// 				},
	// 				(err: HttpErrorResponse) => {
	// 					/**
	// 					 * @error
	// 					 */
	// 					 Ext.Msg.alert('Error','저장실패');
	// 					// Ext.Msg.alert('Error!!', 'Server communication error.');
	// 				}
	// 			);
	// 		}			
	// 	);
	// }

		//신규 버튼 이벤트
		onTapNew(event){
					this.formModel.ms01Jum = this.paramModel.jum;
					this.formModel.ms01Mod = 'A';
					console.log(this.paramModel);
					console.log(this.formModel);
					this.jumManagementService.insertJumManagement(this.formModel).subscribe(
					// this.jumManagementService.saveJumManagement(this.formModel).subscribe(
						(res: any) => {
							/**
							 * @success
							 */
							 Ext.Msg.alert('Success','저장했습니다.');
						},
						(err: HttpErrorResponse) => {
							/**
							 * @error
							 */
							 Ext.Msg.alert('Error','저장실패');
							// Ext.Msg.alert('Error!!', 'Server communication error.');
						}
					);
		}

	//초기화 버튼 이벤트
	onTapClear(event){
		this.formModel.ms01JumNm = '';
		this.formModel.ms01Sano = '';
		this.formModel.ms01JumNm = '';
		this.formModel.ms01Sano  = '';     
		this.formModel.ms01Dname = '';     
		this.formModel.ms01Juno1 = '';    
		this.formModel.ms01Post1 = '';    
		this.formModel.ms01Phone1 = '';   
		this.formModel.ms01Address  = '';  
		this.formModel.ms01Crdate   = '';   
		this.formModel.ms01Camonth  = '';   
		this.formModel.ms01Deldate     = '';       //코드폐기일
		this.formModel.ms01Adddate     = '';       //코드부여일
		this.formModel.ms01Uptdate     = '';       //코드수정일
		// this.formModel.ms01Adduser     = '';       //입력user
		// this.formModel.ms01Uptuser     = '';       //변경user 
	}


	//도움말 버튼 이벤트
	onTapHelp(event){
		this.jumManagementService.helpJumManagement(this.paramModel).subscribe(
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
		
	    //this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
			this.jumManagementService.selectJumList(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);

		//점 선택했을때 자동조회
		this.onTapQuery(this.paramModel);

   }

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
	   this.paramModel.jum = data.newValue;
	   this.formModel.ms01Jum =  this.paramModel.jum
	   console.log(this.formModel);

	//점 선택했을때 자동조회
	this.onTapQuery(this.paramModel);

   }


      //Title 버튼 이벤트
	  onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}
 }


 



	//엑셀 버튼 이벤트
	// onTapExcel(event){
	// 	this.jumManagementService.excelJumManagement(this.paramModel).subscribe(
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
	// 	this.jumManagementService.reportJumManagement(this.paramModel).subscribe(
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
	