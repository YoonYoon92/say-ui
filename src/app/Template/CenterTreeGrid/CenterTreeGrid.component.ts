declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CenterTreeGrid } from './shared/CenterTreeGrid.model';
import { CenterTreeGridService } from './shared/CenterTreeGrid.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../shared/env.service';

@Component({
	selector: 'app-CenterTreeGrid',
	templateUrl: './CenterTreeGrid.component.html',
	providers: [CenterTreeGridService],
})
export class CenterTreeGridComponent implements OnInit {

	@Input() public route: any;

	//시작일
	public startDt: any = null;

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//param model
	public paramModel: CenterTreeGrid = <CenterTreeGrid>{};

	//종료일
	public endDt: any = null;

	treeStore = new Ext.data.TreeStore({
		rootVisible: true,
		root: null
	});

	constructor(private centerTreeGridService: CenterTreeGridService, public envService: EnvService ) { }
	ngOnInit() {

		this.treeStore = new Ext.data.TreeStore({
			rootVisible: true,
			root: { 
				expanded: true,
				text: 'All',
				iconCls: 'x-fa fa-sitemap',
				children: [{
					text: 'Home',
					iconCls: 'x-fa fa-home',
					checked: false,
					children: [{
						text: 'Messages',
						numItems: 231,
						iconCls: 'x-fa fa-inbox',
						checked: false,
						leaf: true
					}, {
						text: 'Archive',
						iconCls: 'x-fa fa-database',
						children: [{
							text: 'First',
							numItems: 7,
							iconCls: 'x-fa fa-sliders',
							leaf: true
						}, {
							text: 'No Icon',
							numItems: 0,
							iconCls: null,
							leaf: true
						}]
					}, {
						text: 'Music',
						numItems: 3000,
						iconCls: 'x-fa fa-music',
						leaf: true
					}, {
						text: 'Video',
						numItems: 1000,
						iconCls: 'x-fa fa-film',
						leaf: true
					}]
				}, {
					text: 'Users',
					iconCls: 'x-fa fa-user',
					children: [{
						text: 'Tagged',
						numItems: 53,
						iconCls: 'x-fa fa-tag',
						leaf: true
					}, {
						text: 'Inactive',
						numItems: 9,
						iconCls: 'x-fa fa-trash',
						leaf: true
					}]
				}, {
					text: 'Groups',
					numItems: 3,
					iconCls: 'x-fa fa-group',
					leaf: true
				}, {
					text: 'Settings',
					iconCls: 'x-fa fa-wrench',
					children: [{
						text: 'Sharing',
						numItems: 4,
						iconCls: 'x-fa fa-share-alt',
						leaf: true
					}, {
						text: 'Notifications',
						numItems: 16,
						iconCls: 'x-fa fa-flag',
						leaf: true
					}, {
						text: 'Network',
						numItems: 4,
						iconCls: 'x-fa fa-signal',
						leaf: true
					}]
				}]
			}
		});
		
		
		//날짜 기본값 셋팅
		this.startDt = new Date(this.envService.getCalDate(-30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getCalDate(-30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);

	}

	//tree ready
	treeCmp : any;
	onReadytree(event){
		this.treeCmp = event.cmp;
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
		this.centerTreeGridService.selectCenterTreeGridList(null).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				console.log(res);
				let resultStore = [{
					expanded: true,
					text: '조직',
					children: res
				}];

				this.treeStore.setData(resultStore);
				this.treeCmp.setMasked(false);
			  },
			  (err: HttpErrorResponse) => {
				  /**
				   * @error
				   */
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
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				this.centerTreeGridService.deleteCenterTreeGrid(null).subscribe(
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
				this.centerTreeGridService.saveCenterTreeGrid(this.formModel).subscribe(
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
		this.centerTreeGridService.excelCenterTreeGrid(this.paramModel).subscribe(
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
		this.centerTreeGridService.helpCenterTreeGrid(this.paramModel).subscribe(
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

	//라디오 버튼 선택 이벤트
	onChangeRadio(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.radioVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.comboVal = data.newValue;
	}
}
