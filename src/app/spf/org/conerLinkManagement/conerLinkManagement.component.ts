/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ConerLinkManagement } from './shared/conerLinkManagement.model';
import { ConerLinkManagementService } from './shared/conerLinkManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
	selector: 'app-conerLinkManagement',
	templateUrl: './conerLinkManagement.component.html',
	providers: [ConerLinkManagementService],
})
export class ConerLinkManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ConerLinkManagement = <ConerLinkManagement>{};
	public checkModel: ConerLinkManagement = <ConerLinkManagement>{};


	//form model
	public formModel: ConerLinkManagement = <ConerLinkManagement>{};

	//grid select model
	public gridModel: ConerLinkManagement = <ConerLinkManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ConerLinkManagement = <ConerLinkManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ConerLinkManagement = <ConerLinkManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ConerLinkManagement = <ConerLinkManagement>{};

	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: ConerLinkManagement = <ConerLinkManagement>{};
	//코너
	public comboStoreLv5: any = null;
	public comboStoreLv5Model: ConerLinkManagement = <ConerLinkManagement>{};

	 //점
	 public linkStoreJum: any = null;
	 public linkStoreJumModel: ConerLinkManagement = <ConerLinkManagement>{};
 
	 //부
	 public linkStoreBu: any = null;
	 public linkStoreBuModel: ConerLinkManagement = <ConerLinkManagement>{};
 
	 //팀
	 public linkStoreTim: any = null;
	 public linkStoreTimModel: ConerLinkManagement = <ConerLinkManagement>{};
 
	 //세분류
	 public linkStorePc: any = null;
	 public linkStorePcModel: ConerLinkManagement = <ConerLinkManagement>{};
	 //코너
	 public linkStoreConer: any = null;
	 public linkStoreConerModel: ConerLinkManagement = <ConerLinkManagement>{};
  
	//grid store
	gridStore = new Ext.data.Store({});
	public conerCheck :ConerLinkManagement = <ConerLinkManagement>{};
	//추가,삭제결과처리
	public linkresult :any =null;

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';

	constructor(private conerLinkManagementService: ConerLinkManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	   this.comboStoreLv5  = [
		{}
		]
		this.linkStoreConer  = [
			{}
		]
		this.paramModel.linkConer='';
		this.paramModel.coner='';
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

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

		 //코너 콤보박스 선택 이벤트
		 comboConerEvent = (data) =>{
			this.paramModel.coner = data.newValue;	
			this.paramModel.conerNm = data.newValue;	
			console.log(this.paramModel);
			
		}
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		if(this.paramModel.coner==''||this.paramModel.coner==null){Ext.Msg.alert('Error!!', '코너를 선택하세요.');}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.conerLinkManagementService.selectConerLinkManagementList(this.paramModel).subscribe(
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
	}}

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		this.paramModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.paramModel.comboVal = data.newValue;
	}
    
   //삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.conerLinkManagementService.deleteConerLinkManagement(this.formModel).subscribe(
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
	}

	//신규 버튼 이벤트
	onTapNew(event){
		this.formModel = <ConerLinkManagement>{};
		this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
		this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.conerLinkManagementService.saveConerLinkManagement(this.formModel).subscribe(
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
	}


	

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.conerLinkManagementService.helpConerLinkManagement(this.paramModel).subscribe(
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
		this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.linkStoreJum = res;
           
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
		this.comboStoreLv5Model.paramLvCd = data.newValue;
		console.log(this.comboStoreLv5Model)
		this.envService.selectStoreComboLv5List(this.comboStoreLv5Model).subscribe(
			(res: any) => {
				//조직(팀) data set
				this.comboStoreLv5 = res;
				
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
	}
	comboStoreLv5Event = (data) =>{
		this.paramModel.coner = data.newValue;	
		console.log(this.paramModel);
	}





	 //점 콤보박스 선택 이벤트
	 Link1Event = (data) =>{
		
		 //조직(부) 조회
		 this.linkStoreBuModel.paramLvCd = data.newValue;
		 this.envService.selectStoreComboLv2List(this.linkStoreBuModel).subscribe(
			 (res: any) => {
				 //하위 콤보박스를 전부 초기화 한다
				 this.linkStoreTim = null;	
				 //조직(부) data set
				 this.linkStoreBu = res;
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
	}
 
	//부 콤보박스 선택 이벤트
	Link2Event = (data) =>{
		
		 //조직(팀) 조회
		 this.linkStoreTimModel.paramLvCd = data.newValue;
		 this.envService.selectStoreComboLv3List(this.linkStoreTimModel).subscribe(
			 (res: any) => {
				 //조직(팀) data set
				 this.linkStoreTim = res;
				 this.linkStorePc = null;
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
	}
 
	//팀 콤보박스 선택 이벤트
	Link3Event = (data) =>{
		
		console.log(data.newValue)
		this.linkStorePcModel.paramLvCd = data.newValue;
		this.envService.selectStoreComboLv4List(this.linkStorePcModel).subscribe(
		 (res: any) => {
			 //조직(팀) data set
			 this.linkStorePc = res;
			 this.linkStoreConer = null;
		 },
		 (err: HttpErrorResponse) => {
			 Ext.Msg.alert('Error!!', 'Server communication error.');
		 }
	 );
	}
	//세분류 콤보박스 선택 이벤트
	Link4Event = (data) =>{
		 
		 this.linkStoreConerModel.paramLvCd = data.newValue;
		 console.log(this.linkStoreConerModel)
		 this.envService.selectStoreComboLv5List(this.linkStoreConerModel).subscribe(
			 (res: any) => {
				 //조직(팀) data set
				 this.linkStoreConer = res;
				 
			 },
			 (err: HttpErrorResponse) => {
				 Ext.Msg.alert('Error!!', 'Server communication error.');
			 }
		 );
		 
	 }
	 Link5Event = (data) =>{
		this.paramModel.linkConer = data.newValue;	
		 console.log(this.paramModel);
	 }
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
   //등록 이벤트
   onInsertLink(event){
	   if(this.paramModel.coner=='' ||this.paramModel.coner.length!=5 ){
		console.log(this.paramModel.coner.length)
		Ext.Msg.alert('Error!!', '코너를 확인을 해주세요.');  
		}
		else
		{
			if(this.paramModel.linkConer=='' || this.paramModel.linkConer.length!=5){
				Ext.Msg.alert('Error!!', '연계코너를 확인을 해주세요.');  
				}
			else{
				this.checkModel.jum=this.paramModel.jum;
				this.checkModel.coner=this.paramModel.linkConer;
				this.conerLinkManagementService.selectConerLinkManagement(this.checkModel).subscribe(
					(res: any) => {
									this.conerCheck=res;
									console.log('*********************');
									console.log(this.conerCheck);
				
					//코너없으면 경고창
					console.log('*********************2');
					console.log(this.conerCheck)
					if(this.conerCheck==null){
						Ext.Msg.alert('Error!!', '등록되어있지않은 코너입니다.(연계코너)'); 
						}
					else{
						this.conerLinkManagementService.insertConerLinkManagement(this.paramModel).subscribe(
							(res: any) => {
								//조직(팀) data set
									Ext.Msg.alert('저장완료!!','저장되었습니다.');  
									this.conerLinkManagementService.selectConerLinkManagementList(this.paramModel).subscribe(
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
										},
							(err: HttpErrorResponse) => {
								Ext.Msg.alert('Error!!', 'Server communication error.');
											}
										);
									}
								}
							)
						}
			}
		}
	//삭제
   onDeleteLink(event){
		if(this.paramModel.coner=='' ||this.paramModel.coner.length!=5 ){	
		Ext.Msg.alert('Error!!', '코너를 확인을 해주세요.');  
	   		}
		else
		{
				if(this.paramModel.linkConer=='' || this.paramModel.linkConer.length!=5){
					Ext.Msg.alert('Error!!', '연계코너를 확인을 해주세요.');  
				}
				else{
					this.checkModel.jum=this.paramModel.jum;
					this.checkModel.coner=this.paramModel.linkConer;
					this.conerLinkManagementService.selectConerLinkManagement(this.checkModel).subscribe(
						(res: any) => {
										this.conerCheck=res;
										console.log('*********************');
										console.log(this.conerCheck);
					
					//코너없으면 경고창
					console.log('*********************2');
					console.log(this.conerCheck)
						if(this.conerCheck==null){
							Ext.Msg.alert('Error!!', '등록되어있지않은 코너입니다.(연계코너)'); 
						}
						else {
							this.conerLinkManagementService.deleteConerLinkManagement(this.paramModel).subscribe(
								(res: any) => {
										this.linkresult=res;
										console.log(this.linkresult);
										
									//조직(팀) data set
									if(this.linkresult==1){
										Ext.Msg.alert('삭제완료!!','삭제되었습니다.');  
									}
									else{
										Ext.Msg.alert('삭제오류!!','선택하신 연계코너가 등록되지않아 삭제하지못했습니다.');  
									}
									this.conerLinkManagementService.selectConerLinkManagementList(this.paramModel).subscribe(
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
										},
									(err: HttpErrorResponse) => {
										Ext.Msg.alert('Error!!', 'Server communication error.');
										}
									);
								}
							}			
						);
					}
	   			}
			}
}