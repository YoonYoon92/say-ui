/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ZoneLinkManagement } from './shared/zoneLinkManagement.model';
import { ZoneLinkManagementService } from './shared/zoneLinkManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-zoneLinkManagement',
	templateUrl: './zoneLinkManagement.component.html',
	providers: [ZoneLinkManagementService],
})
export class ZoneLinkManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ZoneLinkManagement = <ZoneLinkManagement>{};
	public checkModel: ZoneLinkManagement = <ZoneLinkManagement>{};
	public conerCheck :ZoneLinkManagement = <ZoneLinkManagement>{};

	//grid select model
	public gridModel: ZoneLinkManagement = <ZoneLinkManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ZoneLinkManagement = <ZoneLinkManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ZoneLinkManagement = <ZoneLinkManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ZoneLinkManagement = <ZoneLinkManagement>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: ZoneLinkManagement = <ZoneLinkManagement>{};
	//코너
	public comboStoreLv5: any = null;
	public comboStoreLv5Model: ZoneLinkManagement = <ZoneLinkManagement>{};


	//점
	public linkStoreJum: any = null;
	public linkStoreJumModel: ZoneLinkManagement = <ZoneLinkManagement>{};
 
	//부
	public linkStoreBu: any = null;
	public linkStoreBuModel: ZoneLinkManagement = <ZoneLinkManagement>{};
 
	//팀
	public linkStoreTim: any = null;
	public linkStoreTimModel: ZoneLinkManagement = <ZoneLinkManagement>{};
 
	//세분류
	public linkStorePc: any = null;
	public linkStorePcModel: ZoneLinkManagement = <ZoneLinkManagement>{};

	public linkStoreConer: any = null;
	public linkStoreConerModel: ZoneLinkManagement = <ZoneLinkManagement>{};

	public ZoneStore: any = null;
	public ZoneStoreModel: ZoneLinkManagement = <ZoneLinkManagement>{};
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	//추가,삭제결과처리
	public linkresult :any =null;
	constructor(private zoneLinkManagementService: ZoneLinkManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.startDt);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	   this.ZoneStore  = [
		{}
		]
		this.linkStoreConer  = [
			{}
		]
	
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

	//조회 버튼 이벤트
	onTapQuery(event){
		
		console.log(this.paramModel);
		if(this.paramModel.zone==''){Ext.Msg.alert('Error!!', '존을 선택하세요.');}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.zoneLinkManagementService.selectZoneLinkManagementList(this.paramModel).subscribe(
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

    
 

	

   //조직(점) 기본 셋팅
   public jumComboVal: string;
   baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
			this.linkStoreJum = res;
           this.jumComboVal = this.comboStoreLv1[0].storeLvCd;
           this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
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
		this.ZoneStoreModel.bu = data.newValue;
		console.log(this.ZoneStoreModel);
		this.zoneLinkManagementService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
		   (res: any) => {
			   //조직(팀) data set
			   this.ZoneStore = res;
			   console.log(this.ZoneStore);
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
	this.ZoneStoreModel.tim = data.newValue;
			console.log(this.ZoneStoreModel);
			this.zoneLinkManagementService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
			(res: any) => {
				//조직(팀) data set
				this.ZoneStore = res;
				console.log(this.ZoneStore);
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
			
			this.ZoneStoreModel.pc = data.newValue;
			console.log(this.ZoneStoreModel);
			this.zoneLinkManagementService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
			(res: any) => {
				//조직(팀) data set
				this.ZoneStore = res;
				console.log(this.ZoneStore);
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
	}

	// 존콤보박스 선택 이벤트
	zoneStoreEvent = (data) =>{
		this.paramModel.zone = data.newValue;	
		
	}

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
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

	onInsertLink(event){
			if(this.paramModel.zone=='' ||this.paramModel.zone.length!=3 ){
				console.log(this.paramModel.zone.length)
				Ext.Msg.alert('Error!!', '존를 확인을 해주세요.');  
			}
			else
			{
				if(this.paramModel.linkConer=='' || this.paramModel.linkConer.length!=5){
					Ext.Msg.alert('Error!!', '연계코너를 확인을 해주세요.');  
				}
				else{
					this.checkModel.jum=this.paramModel.jum;
					this.checkModel.coner=this.paramModel.linkConer;
					this.zoneLinkManagementService.selectConerchk(this.checkModel).subscribe(
						(res: any) => {
										this.conerCheck=res;
										console.log('*********************');
										console.log(this.conerCheck);
					
						//코너없으면 경고창
						console.log('*********************2');
						console.log(this.conerCheck)
							}
						);
						if(this.conerCheck==null){
							Ext.Msg.alert('Error!!', '등록되어있지않은 코너입니다.(연계코너)'); 
						}
						else {
							console.log('----console값')
							console.log(this.paramModel);
							this.zoneLinkManagementService.insertZoneLinkManagement(this.paramModel).subscribe(
								(res: any) => {
									//조직(팀) data set
												this.linkresult=res;
												if(this.linkresult==1){
													Ext.Msg.alert('저장완료!!','저장되었습니다.');  
												}
												else{
													Ext.Msg.alert('저장실패!!','이미 등록되어있는 코너입니다.');  
												}
												this.zoneLinkManagementService.selectZoneLinkManagementList(this.paramModel).subscribe(
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
			}
	}

	onDeleteLink(event){
		if(this.paramModel.zone=='' ||this.paramModel.zone.length!=3 ){
			console.log(this.paramModel.zone.length)
			Ext.Msg.alert('Error!!', '존를 확인을 해주세요.');  
		}
		else
		{
			if(this.paramModel.linkConer=='' || this.paramModel.linkConer.length!=5){
				Ext.Msg.alert('Error!!', '연계코너를 확인을 해주세요.');  
			}
			else{
				this.checkModel.jum=this.paramModel.jum;
				this.checkModel.coner=this.paramModel.linkConer;
				this.zoneLinkManagementService.selectConerchk(this.checkModel).subscribe(
					(res: any) => {
									this.conerCheck=res;
									console.log('*********************');
									console.log(this.conerCheck);
				
					//코너없으면 경고창
					console.log('*********************2');
					console.log(this.conerCheck)
						}
					);
					if(this.conerCheck==null){
						Ext.Msg.alert('Error!!', '등록되어있지않은 코너입니다.(연계코너)'); 
					}
					else {
						console.log('----console값')
						console.log(this.paramModel);
						this.paramModel.bu=this.conerCheck.bu;
						this.paramModel.tim=this.conerCheck.tim;
						this.paramModel.pc=this.conerCheck.pc;
						this.zoneLinkManagementService.deleteZoneLinkManagement(this.paramModel).subscribe(
							(res: any) => {
								//조직(팀) data set
									this.linkresult=res;
									console.log(this.linkresult);
									
								//조직(팀) data set
								if(this.linkresult==1){
									Ext.Msg.alert('삭제완료!!','삭제되었습니다.');  
								}
								else{
									Ext.Msg.alert('삭제오류!!','선택하신 연계코너가 등록되지않아 삭제하지못했습니다.');  
								}
								
								this.zoneLinkManagementService.selectZoneLinkManagementList(this.paramModel).subscribe(
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
		}
	
	}
}