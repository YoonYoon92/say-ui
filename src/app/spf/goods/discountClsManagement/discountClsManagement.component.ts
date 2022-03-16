/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { DiscountClsManagement } from './shared/discountClsManagement.model';
import { DiscountClsManagementService } from './shared/discountClsManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { timeHours } from 'd3-time';

@Component({
	selector: 'app-discountClsManagement',
	templateUrl: './discountClsManagement.component.html',
	providers: [DiscountClsManagementService],
})
export class DiscountClsManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: DiscountClsManagement = <DiscountClsManagement>{};

	//grid select model
	public gridModel: DiscountClsManagement = <DiscountClsManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: DiscountClsManagement = <DiscountClsManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: DiscountClsManagement = <DiscountClsManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: DiscountClsManagement = <DiscountClsManagement>{};
	//할인추가클래스
	//점
	 public linkStoreJum: any = null;
	 public linkStoreJumModel: DiscountClsManagement = <DiscountClsManagement>{};
 
	 //부
	 public linkStoreBu: any = null;
	 public linkStoreBuModel: DiscountClsManagement = <DiscountClsManagement>{};
 
	 //팀
	 public linkStoreTim: any = null;
	 public linkStoreTimModel: DiscountClsManagement = <DiscountClsManagement>{};
 
	 //세분류
	 public linkStorePc: any = null;
	 public linkStorePcModel: DiscountClsManagement = <DiscountClsManagement>{};
	 //코너
	 public linkStoreConer: any = null;
	 public linkStoreConerModel: DiscountClsManagement = <DiscountClsManagement>{};

	 public linkStoreKey: any = null;
	 public linkStoreKeyModel: DiscountClsManagement = <DiscountClsManagement>{};

	 public conerResult : number;
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public discountStore : any = [
		{discountCd: '1', discountNm:'1.에누리 미적용'},
		{discountCd: '3', discountNm:'2.에누리 적용'},
		{discountCd: '2', discountNm:'3.전자쿠폰 미적용'},
		{discountCd: '4', discountNm:'4.전자쿠폰 적용'},
		{discountCd: '5', discountNm:'5.포인트 미적용'},
		{discountCd: '6', discountNm:'6.포인트 적용'},
		
	 ]

	constructor(private discountClsManagementService: DiscountClsManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();
		this.paramModel.userId = this.envService.account.userId;
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
		

	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}
	//할인구분선택
	onChangeDiscount(date){
		this.paramModel.discountCd = date.newValue;
		console.log(this.paramModel.discountCd);
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
		if(this.paramModel.discountCd==''||this.paramModel.discountCd==null)Ext.Msg.alert('Error!!', '할인구분을 선택하세요.');
		else{
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});
			this.discountClsManagementService.selectDiscountClsManagementList(this.paramModel).subscribe(
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
	}

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		//Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
		// 	(e)=>{
		// 		if( e == 'yes' ){
		// 			console.log(this.formModel);
		// 			this.discountClsManagementService.deleteDiscountClsManagement(this.formModel).subscribe(
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
		// 	}
		// );
	}

	//신규 버튼 이벤트
	onTapNew(event){
		// this.formModel = <DiscountClsManagement>{};
		// this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
	//	this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		// Ext.Msg.confirm("저장", "데이터를 저장합니다", 
		// 	(e)=>{
		// 		if( e == 'yes' ){
		// 			console.log(this.formModel);
		// 			this.discountClsManagementService.saveDiscountClsManagement(this.formModel).subscribe(
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
		// 	}
		// );
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.discountClsManagementService.excelDiscountClsManagement(this.paramModel).subscribe(
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
		this.discountClsManagementService.reportDiscountClsManagement(this.paramModel).subscribe(
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
		this.discountClsManagementService.helpDiscountClsManagement(this.paramModel).subscribe(
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
	   this.linkStoreBuModel.jum=data.newValue;
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
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
    //점 콤보박스 선택 이벤트
	 Link1Event = (data) =>{
		//조직(부) 조회
		this.linkStoreBuModel.paramLvCd = data.newValue;
		this.linkStoreKeyModel.jum = data.newValue;	
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
	   this.paramModel.cls1 = data.newValue;
	   this.linkStoreKeyModel.paramLvCd = this.linkStoreKeyModel.jum +data.newValue;	
	   this.envService.selectStoreComboLv6List(this.linkStoreKeyModel).subscribe(
		(res: any) => {
			//조직(팀) data set
			this.linkStoreKey = res;
			
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
		console.log(this.linkStoreKeyModel);
	}
	Link6Event = (data) =>{
		this.paramModel.cls2 = data.newValue;
		
	 }

	onInsertLink(event){
		if(this.paramModel.discountCd==''||this.paramModel.discountCd==null){Ext.Msg.alert('Error!!', '할인구분을 선택하세요');}
		else{
			if(this.paramModel.cls2==''||this.paramModel.cls2==null){Ext.Msg.alert('Error!!', '클래스를 선택하세요');}
			else{
				console.log(this.paramModel);
				this.discountClsManagementService.insertDiscountClsManagement(this.paramModel).subscribe(
					(res: any) => {this.conerResult=res;
						if(this.conerResult==0){
							{Ext.Msg.alert('Error!!', '이미저장된 클래스입니다');}
						}
						else{
							{Ext.Msg.alert('저장!!', '저장완료!');}
						}
						this.gridCmp.setMasked({
							xtype: 'loadmask',
							message: 'Loading...'
						});
						this.discountClsManagementService.selectDiscountClsManagementList(this.paramModel).subscribe(
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
					(err: HttpErrorResponse) => {Ext.Msg.alert('Error!!', 'Server communication error.');}
				);
				
				}	
				
			}
	}
	 //삭제
	onDeleteLink(event){
		if(this.paramModel.discountCd==''||this.paramModel.discountCd==null){Ext.Msg.alert('Error!!', '할인구분을 선택하세요');}
		else{
			if(this.paramModel.cls2==''||this.paramModel.cls2==null){Ext.Msg.alert('Error!!', '클래스를 선택하세요');}
			else{
				console.log(this.paramModel);
				this.discountClsManagementService.deleteDiscountClsManagement(this.paramModel).subscribe(
					(res: any) => {this.conerResult=res;
						if(this.conerResult==0){
							{Ext.Msg.alert('Error!!', '없는 클래스입니다');}
						}
						else{
							{Ext.Msg.alert('삭제!!', '삭제완료!');}
						}
						this.gridCmp.setMasked({
							xtype: 'loadmask',
							message: 'Loading...'
						});
						this.discountClsManagementService.selectDiscountClsManagementList(this.paramModel).subscribe(
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
					(err: HttpErrorResponse) => {Ext.Msg.alert('Error!!', 'Server communication error.');}
				);
				
				}	
				
			}
	}
}