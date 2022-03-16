/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { UserProgList } from './shared/userProgList.model';
import { UserProgListUser } from './shared/userProgListUser.model';
import { UserProgListService } from './shared/userProgList.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../shared/env.service';

@Component({
	selector: 'app-userProgList',
	templateUrl: './userProgList.component.html',
	providers: [UserProgListService],
})
export class UserProgListComponent implements OnInit {
	@Input() public route: any;

	public progStore = new Array();
	public checkedProgList = new Array();

	//user model
	public userModel: UserProgListUser = <UserProgListUser>{};

	//grid select model
	public gridModel: UserProgList = <UserProgList>{};

	//Usergrid select model
	public gridUserModel: UserProgListUser = <UserProgListUser>{};

	//grid store
	gridStore = new Ext.data.Store({});

	public selectGridData : any;
	
	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	treeStore = new Ext.data.TreeStore({
		rootVisible: true,
		root: null
	});

	constructor(private userProgListService: UserProgListService, public envService: EnvService ) { }
	ngOnInit() {
		////조회 모델에 시작일과 종료일 기본값 셋팅
		//this.paramModel.startDt 	= this.envService.getDateToString(this.envSer//vice.getBeforeDate(30));
		//this.paramModel.endDt 		= this.envService.getDateToString(null);
		//점 콤보박스 셋팅
		//this.baseStoreCombo();

		this.initUserListQuery();
	}
	
	//Usertree ready
	UsertreeCmp : any;
	onReadyUserTree(event){
		this.UsertreeCmp = event.cmp;		
	}
	
	//tree ready
	treeCmp : any;
	onReadytree(event){
		this.treeCmp = event.cmp;		
	}

	//체크박스 선택 이벤트
	onSelectionChange = (grid, records, selecting, selection) => {
		let meUserModel = this.userModel;
		// this의 적용 범위를 보정하기 위해 사용.
		let meProgList = this.checkedProgList;		

		let checkItem = selection._selected.items;
		console.log(checkItem);

		checkItem.forEach(function(element){
			let checkedItem = {
				userId: meUserModel.userId,
				id: element.data.id,
				checked: element.data.checked
			};
			console.log(checkedItem);
			meProgList.push(checkedItem);
		});

		//console.log(this.treeCmp.getStore().getData());
		//current.set('checked', parent.get('checked'));
	}
	 
	//초기 사용자 리스트 get
	initUserListQuery() {
		this.userProgListService.selectUserProgListUser().subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				console.log('userList: ' + res)
				this.gridUserModel=res
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);				
				
				//program list clear 
				this.progListClear();
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

	//사용자 재조회 버튼 이벤트 -> 프로그램 리스트 초기화, api 전송용 object clear
	onTapQuery(event){
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});


		this.userProgListService.selectUserProgListUser().subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				console.log('userList: ' + res)

				this.gridUserModel=res
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);				
				
				//program list clear 
				this.progListClear();
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


	//Program List Clear 이벤트
	progListClear(){

		this.progStore = [{
			text: 'Root',			
			id: 'ROOT',
			checked: false
		}];
		this.checkedProgList = new Array();

	}

  	//저장 버튼 이벤트
	onTapSave(event){
		console.log(this.checkedProgList);

		console.log(this.progStore);
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.checkedProgList);
					this.userProgListService.saveAdminProgList(this.checkedProgList).subscribe(
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

	//grid row 선택 이벤트
	onSelectGrid(row){
		this.selectGridData = null;
		//row 데이터 model 바인딩
		if(this.userModel.userId != null) {
			
			this.selectGridData = row.selected[0].data;
			Ext.Msg.confirm("Confirmation", "작업 대상자를 변경하시겠습니까? 저장하지 않은 데이터는 사라집니다.",this.onConfirmResult.bind(this));

		} else {		

				
			this.userListGindCreation(row.selected[0].data);
			
		}	
		
	}

	userListGindCreation(data) {

		this.userModel = data;	

		this.treeCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		console.log(this.userModel);
		//selectAdminProgList - 관리자 ID	
		this.userProgListService.selectAdminProgList(this.userModel).subscribe(
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
				// this.progStore = res;
				this.checkedProgList = new Array();

				this.treeStore.setData(this.progStore);
				this.treeCmp.setMasked(false);
				console.log(this.treeStore);
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

	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	// Confirmation toast 이벤트
	onConfirmResult(buttonId, value, opt) {
		Ext.toast(`User clicked ${buttonId} button.`);
		console.log('opt:' + opt);
		
		if(buttonId=='yes') {
			this.userModel = this.selectGridData;
			this.userListGindCreation(this.selectGridData);
		}
	}
}