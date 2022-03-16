declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { LeftGridRightForm } from './shared/LeftGridRightForm.model';
import { LeftGridRightFormService } from './shared/LeftGridRightForm.service';
import { EnvService } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
	selector: 'app-LeftGridRightForm',
	templateUrl: './LeftGridRightForm.component.html',
	providers: [LeftGridRightFormService],
})
export class LeftGridRightFormComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: LeftGridRightForm = <LeftGridRightForm>{};

	//form model
	public formModel: LeftGridRightForm = <LeftGridRightForm>{};

	//grid select model
	public gridModel: LeftGridRightForm = <LeftGridRightForm>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//현재 페이지
	public index : number = 1;

	//마지막 페이지
	public maxIndex: number = 100;

	//페이지 정보
	public pageInfo: string;

	//text edit content
	public htmlContent: string = 'test!!!';

	//https://www.npmjs.com/package/@kolkov/angular-editor 참조
	config: AngularEditorConfig = {
		editable: true,						//편집여부
		spellcheck: false,					//맞춤법 검사
		height: '15rem',					//높이
		minHeight: '5rem',					//최소높이
		placeholder: 'Enter text here...',
		translate: 'no',					//번역사용
		defaultParagraphSeparator: 'p',		//단락 구분기호
		defaultFontName: 'Arial',
		toolbarHiddenButtons: [				//숨길 툴바버튼(배열)
			['insertImage']
		],
		toolbarPosition: 'top',				//툴바위치(top, bottom)
		showToolbar: false,					//툴바표시
		uploadUrl: '/api/blahblah',			//이미지 업로드시 처리할 서버 api 주소
	};

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

	constructor(private LeftGridRightFormService: LeftGridRightFormService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getCalDate(-30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getCalDate(-30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);

	}
		
	//시작일 변경 이벤트
	onChangeStartDt(date){
		console.log(date);
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
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.LeftGridRightFormService.selectLeftGridRightFormList(this.paramModel).subscribe(
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
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
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
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.LeftGridRightFormService.deleteLeftGridRightForm(this.formModel).subscribe(
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
		this.formModel = <LeftGridRightForm>{};
		this.isDisabled = false;
		console.log(this.config);
		this.config.showToolbar = true;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.LeftGridRightFormService.saveLeftGridRightForm(this.formModel).subscribe(
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

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.LeftGridRightFormService.excelLeftGridRightForm(this.paramModel).subscribe(
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
		this.LeftGridRightFormService.helpLeftGridRightForm(this.paramModel).subscribe(
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


	//이전 페이지
	beforePage(event){
		if( this.index > 1 ){
			this.index--;
			this.pageInfo= `${this.index} / ${this.maxIndex}`;
		}
	}

	//다음 페이지
	afterPage(event){
		if( this.index < this.maxIndex ){
			this.index++;
			this.pageInfo= `${this.index} / ${this.maxIndex}`;
		}
	}

	gridPageEvent(index){
		console.log(index);
	}
}
