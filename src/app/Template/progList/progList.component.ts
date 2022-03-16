/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ProgList } from './shared/progList.model';
import { ProgListService } from './shared/progList.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../shared/env.service';

@Component({
	selector: 'app-progList',
	templateUrl: './progList.component.html',
	providers: [ProgListService],
})
export class ProgListComponent implements OnInit {
	@Input() public route: any;

	public progStore = new Array();
	public checkedProgList = new Array();

	//param model
	public paramModel: ProgList = <ProgList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ProgList = <ProgList>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ProgList = <ProgList>{};

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: ProgList = <ProgList>{};
	
	treeStore = new Ext.data.TreeStore({
		rootVisible: true,
		root: null
	});

	constructor(private progListService: ProgListService, public envService: EnvService ) { }
	ngOnInit() {
		////조회 모델에 시작일과 종료일 기본값 셋팅
		//this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		//this.paramModel.endDt 		= this.envService.getDateToString(null);
		//점 콤보박스 셋팅
		//this.baseStoreCombo();
	}

	//tree ready
	treeCmp : any;
	onReadytree(event){
		this.treeCmp = event.cmp;		
	}

	//체크박스 선택 이벤트
	onSelectionChange = (grid, records, selecting, selection) => {
		// this의 적용 범위를 보정하기 위해 사용.
		let meProgList = this.checkedProgList;

		let checkItem = selection._selected.items;
		checkItem.forEach(function(element){
			let checkedItem = {
				userId: 'userId',
				id: element.data.id,
				checked: element.data.checked
			};
			console.log(checkedItem);
			meProgList.push(checkedItem);
		});

		//console.log(this.treeCmp.getStore().getData());
		//current.set('checked', parent.get('checked'));
 	}

	//조회 버튼 이벤트
	onTapQuery(event){
		let userModel = {
			userId      : 'userId', 
			userName    : ''
		};
		this.treeCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});


		//selectAdminProgList - 관리자 ID
		if(userModel.userId == 'userId' || userModel.userId == 'say' || userModel.userId == 'SAY') 
		{
			this.progListService.selectAdminProgList(userModel).subscribe(
				(res: any) => {
					console.log(res);
					/**
					 * @success
					 */
					this.progStore = [{
						text: 'Root',
						id: 'ROOT',
						expanded: true,
						checked: true,
						children: res
					}];
	
					this.checkedProgList = new Array();
	
					this.treeStore.setData(this.progStore);
					this.treeCmp.setMasked(false);
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					console.log(err);
					Ext.Msg.alert('Error!!', 'Server communication error.');
	
					this.progStore = [{
						text: 'Root',
						id: 'ROOT',
						checked: false
					}];
	
					this.checkedProgList = new Array();
					//this.checkedProgList = [];
	
					this.treeStore.setData(this.progStore);
					this.treeCmp.setMasked(false);
				}
			);
		}
		//selectUserProgList -- 일반사용자 ID
		else
		{
			this.progListService.selectUserProgList(userModel).subscribe(
				(res: any) => {
					console.log(res);
					/**
					 * @success
					 */
					this.progStore = [{
						text: 'Root',
						id: 'ROOT',
						expanded: true,
						checked: true,
						children: res
					}];
	
					this.checkedProgList = new Array();
	
					this.treeStore.setData(this.progStore);
					this.treeCmp.setMasked(false);
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					console.log(err);
					Ext.Msg.alert('Error!!', 'Server communication error.');
	
					this.progStore = [{
						text: 'Root',
						id: 'ROOT',
						checked: false
					}];
	
					this.checkedProgList = new Array();
					//this.checkedProgList = [];
	
					this.treeStore.setData(this.progStore);
					this.treeCmp.setMasked(false);
				}
			);
		}

	}

    //삭제 버튼 이벤트
	onTapDelete(event){
		console.log(this.treeCmp.getStore());
		// Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
		// 	(e)=>{
		// 		if( e == 'yes' ){
		// 			console.log(this.formModel);
		// 			this.progListService.deleteProgList(this.formModel).subscribe(
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
		// this.formModel = <ProgList>{};
		// this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
		// this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		console.log(this.checkedProgList);

		console.log(this.progStore);
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.checkedProgList);
					this.progListService.saveAdminProgList(this.checkedProgList).subscribe(
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