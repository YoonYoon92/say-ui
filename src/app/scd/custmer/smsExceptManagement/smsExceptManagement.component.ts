/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { SmsExceptManagement } from './shared/smsExceptManagement.model';
import { SmsExceptManagementService } from './shared/smsExceptManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-smsExceptManagement',
	templateUrl: './smsExceptManagement.component.html',
	providers: [SmsExceptManagementService],
})
export class SmsExceptManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: SmsExceptManagement = <SmsExceptManagement>{};

	//grid select model
	public gridModel: SmsExceptManagement = <SmsExceptManagement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: SmsExceptManagement = <SmsExceptManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: SmsExceptManagement = <SmsExceptManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: SmsExceptManagement = <SmsExceptManagement>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private smsExceptManagementService: SmsExceptManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}
	//휴대폰번호
	onChangeTelNum = (data) =>{
		this.paramModel.telNum = data.newValue;
		console.log(this.paramModel.telNum);
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
	deleteHandler = (button) => {
		let gridrow = button.up('gridrow'),
		  record = gridrow.getRecord();
		console.log(record);
	  }
	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}
	actionsCell = {
		xtype: 'widgetcell',
		widget: {
		  xtype: 'segmentedbutton',
	   allowDepress: "true",
	   items: [
				{
				text: 'del',
				handler : this.deleteHandler
				}
			]
		}
	}
	renderActionsCell = (value, record) => {
		return `
			<action-cell
				[buyHandler]=this.buyHandler.bind(this, record)"
				[sellHandler]="this.sellHandler.bind(this, record)"
				[watchHandler]="this.watchHandler.bind(this, record)"
			></action-cell>
		`
	}
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.smsExceptManagementService.selectSmsExceptManagementList(this.paramModel).subscribe(
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

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			(e)=>{
				if( e == 'yes' ){
				
				}
			}
		);
	}

	//신규 버튼 이벤트
	onTapNew(event){
	
	}

	//수정 버튼 이벤트
	onTapModify(event){
	
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					
				}
			}
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.smsExceptManagementService.excelSmsExceptManagement(this.paramModel).subscribe(
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
}