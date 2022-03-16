/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { MarginExchangeInq } from './shared/marginExchangeInq.model';
import { MarginExchangeInqService } from './shared/marginExchangeInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-marginExchangeInq',
	templateUrl: './marginExchangeInq.component.html',
	providers: [MarginExchangeInqService],
})
export class MarginExchangeInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: MarginExchangeInq = <MarginExchangeInq>{};

	//grid select model
	public gridModel: MarginExchangeInq = <MarginExchangeInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: MarginExchangeInq = <MarginExchangeInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: MarginExchangeInq = <MarginExchangeInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: MarginExchangeInq = <MarginExchangeInq>{};
	//세분류
	public comboStoreLv4: any = null;
	public comboStoreLv4Model: MarginExchangeInq = <MarginExchangeInq>{};
	//코너
	public comboConer: any = null;
	public comboConerModel: MarginExchangeInq = <MarginExchangeInq>{};
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private marginExchangeInqService: MarginExchangeInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();
		this.paramModel.coner==''
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
		if(this.paramModel.coner==''){Ext.Msg.alert('Error!!', '코너를 선택하세요.'); }
		else{
		 console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.marginExchangeInqService.selectMarginExchangeInqList(this.paramModel).subscribe(
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
		// Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
		// 	(e)=>{
		// 		if( e == 'yes' ){
		// 			console.log(this.formModel);
		// 			this.marginExchangeInqService.deleteMarginExchangeInq(this.formModel).subscribe(
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
		// this.formModel = <MarginExchangeInq>{};
		// this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
		//this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		// Ext.Msg.confirm("저장", "데이터를 저장합니다", 
		// 	(e)=>{
		// 		if( e == 'yes' ){
		// 			console.log(this.formModel);
		// 			this.marginExchangeInqService.saveMarginExchangeInq(this.formModel).subscribe(
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
		this.marginExchangeInqService.excelMarginExchangeInq(this.paramModel).subscribe(
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
		this.marginExchangeInqService.reportMarginExchangeInq(this.paramModel).subscribe(
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
		this.marginExchangeInqService.helpMarginExchangeInq(this.paramModel).subscribe(
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
		this.comboConerModel=this.paramModel
		console.log(this.comboConerModel)
		this.marginExchangeInqService.selectConerList(this.comboConerModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.comboConer = res;
				console.log("클래스선택")
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		
		
	}
	comboConerEvent = (data) =>{
		this.paramModel.coner = data.newValue;	
		this.paramModel.conerNm = data.newValue;	
		console.log(this.paramModel);
		
	}
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}