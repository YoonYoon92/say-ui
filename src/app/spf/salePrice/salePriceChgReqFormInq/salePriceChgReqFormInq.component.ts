/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { SalePriceChgReqFormInq } from './shared/salePriceChgReqFormInq.model';
import { SalePriceChgReqFormInqService } from './shared/salePriceChgReqFormInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-salePriceChgReqFormInq',
	templateUrl: './salePriceChgReqFormInq.component.html',
	providers: [SalePriceChgReqFormInqService],
})
export class SalePriceChgReqFormInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: SalePriceChgReqFormInq = <SalePriceChgReqFormInq>{};

	//grid select model
	public gridModel: SalePriceChgReqFormInq = <SalePriceChgReqFormInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: SalePriceChgReqFormInq = <SalePriceChgReqFormInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: SalePriceChgReqFormInq = <SalePriceChgReqFormInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: SalePriceChgReqFormInq = <SalePriceChgReqFormInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	//grid store
	detailStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	isDialogShowing:boolean = false;


	constructor(private salePriceChgReqFormInqService: SalePriceChgReqFormInqService, public envService: EnvService,private cd: ChangeDetectorRef ) { }
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

	//종료일 변경 이벤트
	onChangeEndDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
		{
			this.searchToDayCmp.setValue(date.oldDate);			
			Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
		}
		else
		{
			this.paramModel.endDt = this.envService.getDateToString(date.newDate);
		}
	}
	

	//달력 포멧 변경
	searchToDayCmp: any;
	onReadyEndDt(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//달력 포멧 변경
	startDtCmp: any;
	onReadystartDt(event){
		this.startDtCmp = event.cmp;
		this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}	

	onSearch = (grid, info) => {
	Ext.Msg.alert('전표번호:{this.paramModel.chit}', '이쪽이야');
	}
		
	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
	
		this.gridModel = row.selected[0].data;
		console.log(this.gridModel)
		this.salePriceChgReqFormInqService.selectDetailList(this.gridModel).subscribe(
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
		this.salePriceChgReqFormInqService.selectSalePriceChgReqFormInqList(this.paramModel).subscribe(
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

    
 


	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.salePriceChgReqFormInqService.excelSalePriceChgReqFormInq(this.paramModel).subscribe(
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
		this.salePriceChgReqFormInqService.reportSalePriceChgReqFormInq(this.paramModel).subscribe(
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
		this.salePriceChgReqFormInqService.helpSalePriceChgReqFormInq(this.paramModel).subscribe(
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