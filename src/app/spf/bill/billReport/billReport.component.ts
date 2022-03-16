/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input} from '@angular/core';
import { BillReport } from './shared/billReport.model';
import { BillReportService } from './shared/billReport.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-billReport',
    templateUrl: './billReport.component.html',
    providers: [BillReportService],
})
export class BillReportComponent implements OnInit {

	@Input() public route: any;
	
	public pdfUrl: string;

    //param model
	public paramModel: BillReport = <BillReport>{};

	//form model
	public formModel: BillReport = <BillReport>{};

    //grid select model
    public gridModel: BillReport = <BillReport>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: BillReport = <BillReport>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: BillReport = <BillReport>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: BillReport = <BillReport>{};

    //grid store
    gridStore = new Ext.data.Store({});

    //시작일
    public startDt: any = null;

    //종료일
    public endDt: any = null;

    //fild disabled
    public isDisabled : boolean = true;

    //Fieldset padding
    public padding : string = '15px';

    constructor(private billReportService: BillReportService, public envService: EnvService ) { }
    ngOnInit() {
		this.startDt = new Date(this.envService.getCalDate(-30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getCalDate(-30));
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

    //grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

    //grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

    //조회 버튼 이벤트
	onTapQuery(event){
		this.pdfUrl = `http://localhost:8000/api/report/selectReport?param=${JSON.stringify(this.paramModel)}`;
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
		console.log(this.pdfUrl);

	}

	//수정 버튼 이벤트
	onTapModify(event){
		this.isDisabled = false;
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				console.log(this.formModel);
				this.billReportService.deleteBillReport(this.formModel).subscribe(
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
		this.formModel = null;
		this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				console.log(this.formModel);
				this.billReportService.saveBillReport(this.formModel).subscribe(
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

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.billReportService.excelBillReport(this.paramModel).subscribe(
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
		this.billReportService.reportBillReport(this.paramModel).subscribe(
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
		this.billReportService.helpBillReport(this.paramModel).subscribe(
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

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

   //조직(점) 기본 셋팅
   baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
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
       console.log(data.newValue)
   }
}