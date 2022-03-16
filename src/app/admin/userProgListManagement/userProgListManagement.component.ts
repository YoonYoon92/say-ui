/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { UserProgListManagement } from './shared/userProgListManagement.model';
import { UserProgListManagementSave } from './shared/userProgListManagement.saveModel';
import { UserProgListManagementService } from './shared/userProgListManagement.service';
import { EnvService } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-userProgListManagement',
	templateUrl: './userProgListManagement.component.html',
	providers: [UserProgListManagementService],
})
export class UserProgListManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: UserProgListManagement = <UserProgListManagement>{};

	//form model
	public saveModel: UserProgListManagementSave = <UserProgListManagementSave>{};

	//grid select model
	// public gridModel: UserProgListManagement = <UserProgListManagement>{};


	//메뉴그룹ID
	public comboStoreMenuGroupId: any = null;
	// public comboStoreMenuGroupIdModel: UserProgListManagement = <UserProgListManagement>{};
	//메뉴ID
	public comboStoreMenuId: any = null;
	// public comboStoreMenuIdModel: UserProgListManagement = <UserProgListManagement>{};

	//comboBox Store
	public comboStoreIcon : any = [
		{zd0205: 'x-fa fa-file-alt', zd0205Nm: 'x-fa fa-file-alt'}
	]

	//comboBox Store
	public comboStoreExcelYn : any = [
		{zd0208: '1', zd0208Nm: '1 표  시'},
		{zd0208: '0', zd0208Nm: '0 미표시'}
	]

	//comboBox Store
	public comboStoreInsertSabun : any = [
		{sabun: '201092'},
		{sabun: '209009'},
		{sabun: '212015'},
		{sabun: '219001'}
	]
	//grid store
	gridStore = new Ext.data.Store({});


	constructor(private userProgListManagementService: UserProgListManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		
	this.saveModel.zd0205 	= 'x-fa fa-file-alt';
	this.saveModel.zd0208 = '0';
    //    //점 콤보박스 셋팅
       this.baseStoreCombo()
	   if (this.envService.account.userId=="219001"){
		this.paramModel.dbType='TS'
		}
		else
		{
			this.paramModel.dbType=''
		}
	}

	// //변경 이벤트
	onChangezd0201(date){
		this.saveModel.zd0201= date.newValue;
	}

	onChangezd0202(date){
		this.saveModel.zd0202= date.newValue;
	}

	onChangezd0203(date){
		this.saveModel.zd0203= date.newValue;
	}

	onChangezd0204(date){
		this.saveModel.zd0204= date.newValue;
	}

	onChangezd0205(date){
		this.saveModel.zd0205= date.newValue;
	}

	onChangezd0206(date){
		this.saveModel.zd0206= date.newValue;
	}

	onChangezd0207(date){
		this.saveModel.zd0207= date.newValue;
	}

	onChangezd0208(date){
		this.saveModel.zd0208= date.newValue;
	}


		//신규 버튼 이벤트
		onTapNew(event){
			// this.saveModel.zd0203 = this.paramModel.pgmId;
			this.saveModel.zd02Mod = 'A';
			// this.saveModel.zd0201 = 'A';
			// this.saveModel.zd0202 = 'A';
			this.saveModel.zd0206 = '0';
			this.saveModel.zd0207 = '';
			this.saveModel.zd0209 = '';
			// this.saveModel.zd02Result = '';
			console.log(this.paramModel);
			console.log(this.saveModel);

			if(this.saveModel.zd0201=='' || this.saveModel.zd0201==null)
				{
					Ext.Msg.alert('입력오류','메뉴그룹ID 를 입력하세요');
				}
			else if(this.saveModel.zd0202=='' || this.saveModel.zd0202==null)
				{
					Ext.Msg.alert('입력오류','메뉴ID 를 입력하세요');
				}
			else if(this.saveModel.zd0203=='' || this.saveModel.zd0203==null)
				{
					Ext.Msg.alert('입력오류','프로그램ID를 입력하세요');
				}
			else if(this.saveModel.zd0204=='' || this.saveModel.zd0204==null)
				{
					Ext.Msg.alert('입력오류','프로그램명을 입력하세요');
				}
			else
				{
				//입력체크후 작동
			this.userProgListManagementService.insertUserProgListManagement(this.saveModel).subscribe(
			// this.userProgListManagementService.saveUserProgListManagement(this.saveModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					 Ext.Msg.alert('Success',res.zd02Result + ' 등록완료');
					//  Ext.Msg.alert('Success',this.saveModel.zd02Result);
					// console.log(this.saveModel);
					// console.log(res.zd02Result);
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					 Ext.Msg.alert('Error','등록실패');
					// Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
			// console.log(this.paramModel);
		} // ifelse
}

	//조회 버튼 이벤트
	onTapQuery(event){
		// console.log(this.saveModel);
		// this.gridCmp.setMasked({
		// 	xtype: 'loadmask',
		// 	message: 'Loading...'
		// });

	this.saveModel.zd0203 = this.paramModel.pgmId;
	this.userProgListManagementService.selectUserProgListManagement(this.saveModel).subscribe(
		
			(res: any) => {
				/**
				 * @success
				 */
				
				// this.gridStore.setData(res);
				this.saveModel = res;
				console.log(this.saveModel);
				// this.gridCmp.setMasked(false);

			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				// this.gridCmp.setMasked(false);
			}
		);
	}





	//도움말 버튼 이벤트
	onTapHelp(event){
		this.userProgListManagementService.helpUserProgListManagement(this.paramModel).subscribe(
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

   //프로그램 기본 셋팅
//    public jumComboVal: string;
    //프로그램 기본 셋팅
	 baseStoreCombo = () =>{
		// this.paramModel.pgmId = '01';	
		// this.comboStoreLv1Model.paramLvCd = '01';
		// console.log(this.comboStoreMenuGroupIdModel);
		// console.log(this.paramModel);
	    //this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
			this.userProgListManagementService.selectMenuGroupIdList(this.paramModel).subscribe(
		    (res: any) => {
		    this.comboStoreMenuGroupId = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);

		//프로그램 선택했을때 자동조회
		// this.onTapQuery(this.paramModel);

   }

	//메뉴그룹id 콤보박스 선택 이벤트
	comboStoreMenuGroupIdEvent = (data) =>{
		this.paramModel.zd0101 = data.newValue;
		this.saveModel.zd0201 = data.newValue;
		console.log(this.paramModel);
		   this.userProgListManagementService.selectMenuIdList(this.paramModel).subscribe( // 파람모델을 넘겨야됨
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				//data set
				this.comboStoreMenuId = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
	}

	//메뉴id 콤보박스 선택 이벤트
	comboStoreMenuIdEvent = (data) =>{
		this.paramModel.zd0102 = data.newValue;
		this.saveModel.zd0202 = data.newValue;
	}

	//메뉴id 콤보박스 선택 이벤트
	comboStoreIconEvent = (data) =>{
		this.saveModel.zd0205 = data.newValue;
	}

	//메뉴id 콤보박스 선택 이벤트
	comboStoreExcelYnEvent = (data) =>{
		this.saveModel.zd0208 = data.newValue;
	}

	//메뉴id 콤보박스 선택 이벤트
	comboStoreInsertSabunEvent = (data) =>{
		// this.comboStoreInsertSabun.sabun = data.newValue;
	}

	

      //Title 버튼 이벤트
	  onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}
 }


