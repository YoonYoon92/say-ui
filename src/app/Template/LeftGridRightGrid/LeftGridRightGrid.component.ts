declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { LeftGridRightGrid } from './shared/LeftGridRightGrid.model';
import { LeftGridRightGridService } from './shared/LeftGridRightGrid.service';
import { EnvService } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-LeftGridRightGrid',
	templateUrl: './LeftGridRightGrid.component.html',
	providers: [LeftGridRightGridService],
})
export class LeftGridRightGridComponent implements OnInit {

	@Input() public route: any;

	//검색 model
	public paramModel: LeftGridRightGrid = <LeftGridRightGrid>{};

	//grid select model
	public gridModel: LeftGridRightGrid = <LeftGridRightGrid>{};

	//left grid store
	leftGridStore = new Ext.data.Store({});

	//center grid store
	centerGridStore = new Ext.data.Store({});

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private leftGridRightGridService: LeftGridRightGridService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getCalDate(-30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getCalDate(-30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
	
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//left grid ready
	leftGridCmp : any;
	onReadyleftGrid(event){
		this.leftGridCmp = event.cmp;
	}

	//left grid row select event
	onSelectLeftGrid(row){
		let leftGridRow = row.selected[0].data;
		this.centerGridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.leftGridRightGridService.selectLeftGridRightGridList(leftGridRow).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.centerGridStore.setData(res);
				this.centerGridCmp.setMasked(false);
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.centerGridCmp.setMasked(false);
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}

	//right grid ready
	centerGridCmp : any;
	onReadyCenterGrid(event){
		this.centerGridCmp = event.cmp;
	}

	//right grid row select event
	onSelectCenterGrid(row){
		this.gridModel = row.selected[0].data;
	}
	
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.leftGridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.leftGridRightGridService.selectLeftGridRightGridList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.leftGridStore.setData(res);
				this.leftGridCmp.setMasked(false);
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.leftGridCmp.setMasked(false);
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
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				console.log(this.formModel);
				this.leftGridRightGridService.deleteLeftGridRightGrid(this.formModel).subscribe(
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
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				console.log(this.formModel);
				this.leftGridRightGridService.saveLeftGridRightGrid(this.formModel).subscribe(
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
		this.leftGridRightGridService.exceleLeftGridRightGrid(this.paramModel).subscribe(
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
		this.leftGridRightGridService.helpLeftGridRightGrid(this.paramModel).subscribe(
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
