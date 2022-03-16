/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { BuyReqFormInq } from './shared/buyReqFormInq.model';
import { BuyReqFormInqService } from './shared/buyReqFormInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-buyReqFormInq',
	templateUrl: './buyReqFormInq.component.html',
	providers: [BuyReqFormInqService],
})
export class BuyReqFormInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: BuyReqFormInq = <BuyReqFormInq>{};

	//grid select model
	public gridModel: BuyReqFormInq = <BuyReqFormInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: BuyReqFormInq = <BuyReqFormInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: BuyReqFormInq = <BuyReqFormInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: BuyReqFormInq = <BuyReqFormInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	//상세조회 store
	detailStore = new Ext.data.Store({});

	isDialogShowing:boolean = false;
	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private buyReqFormInqService: BuyReqFormInqService, public envService: EnvService,private cd: ChangeDetectorRef  ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}
		//달력 포멧 변경
		startDtCmp: any;
		onReadystartDt(event){
			this.startDtCmp = event.cmp;
			this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
		}	

	//달력 포멧 변경
	searchToDayCmp: any;
	onReadyEndDt(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
		console.log(this.gridModel)
		this.buyReqFormInqService.selectDetailList(this.gridModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.detailStore.setData(res);
				console.log(this.detailStore);
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
				}
			);
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		if (this.paramModel.tim==''||this.paramModel.tim==null){
			Ext.Msg.alert('Error!!', '팀을 선택하셔야됩니다.');  
		}
		else{
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.buyReqFormInqService.selectBuyReqFormInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);
				console.log(this.gridStore);
				console.log(this.gridStore.length);
				
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
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }

   showDialog = () => {
	this.isDialogShowing = true;
	this.cd.detectChanges();
	}

	onOk = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}

	onCancel = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}

	onHide = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}


	onClick = (event) => {
		console.log("on Click event : " + event.newValue);
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}
}