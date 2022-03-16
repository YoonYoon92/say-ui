declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { LeftTreeRightForm } from './shared/LeftTreeRightForm.model';
import { LeftTreeRightFormService } from './shared/LeftTreeRightForm.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../shared/env.service';

@Component({
	selector: 'app-LeftTreeRightForm',
	templateUrl: './LeftTreeRightForm.component.html',
	providers: [LeftTreeRightFormService],
})
export class LeftTreeRightFormComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: LeftTreeRightForm = <LeftTreeRightForm>{};

	//form model
	public formModel: LeftTreeRightForm = <LeftTreeRightForm>{};

	//tree Model
	public treeModel: LeftTreeRightForm = <LeftTreeRightForm>{};

	treeStore = new Ext.data.TreeStore({
		rootVisible: true,
	}); 

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';

	constructor(private leftTreeRightFormService: LeftTreeRightFormService, public envService: EnvService ) { }
	ngOnInit() {
		this.startDt = new Date(this.envService.getCalDate(-30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getCalDate(-30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
	}

	//tree ready
	treeCmp : any;
	onReadyTree(event){
		this.treeCmp = event.cmp;
	}

	//tree select event
	onSelectTree(row){
		this.treeModel = row.selected[0].data;
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		this.treeCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.leftTreeRightFormService.selectLeftTreeRightFormList(null).subscribe(
			(res: any) => {
				let resultStore = [{
					text: '조직도',
					children: res
				}];

				this.treeStore.setData(resultStore);
				this.treeCmp.setMasked(false);
			  },
			  (err: HttpErrorResponse) => {
				  console.log(err);
				  if (err.error instanceof Error) {
					  console.log('An error occurred:', err.error.message);
				  } else {
					  console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				  }
				  this.treeCmp.setMasked(false);
			  }
		  );
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
				this.leftTreeRightFormService.deleteLeftTreeRightForm(this.formModel).subscribe(
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
						if (err.error instanceof Error) {
							console.log('An error occurred:', err.error.message);
						} else {
							console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
						}
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
				this.leftTreeRightFormService.saveLeftTreeRightForm(this.formModel).subscribe(
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
						if (err.error instanceof Error) {
							console.log('An error occurred:', err.error.message);
						} else {
							console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
						}
					}
				);
			}
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.leftTreeRightFormService.excelLeftTreeRightForm(this.paramModel).subscribe(
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
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}

	//레포트 버튼 이벤트
	onTapReport(event){

	}
	
	//도움말 버튼 이벤트
	onTapHelp(event){
		this.leftTreeRightFormService.helpLeftTreeRightForm(this.paramModel).subscribe(
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
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}

	//체크박스 선택 이벤트
	onChangeCheck(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.comboVal = data.newValue;
	}
}
