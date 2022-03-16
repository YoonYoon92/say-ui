/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { Notice } from './shared/notice.model';
import { NoticeSave } from './shared/notice.saveModel';
import { NoticeService } from './shared/notice.service';
import { EnvService } from '../..//shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-notice',
	templateUrl: './notice.component.html',
	providers: [NoticeService],
})
export class NoticeComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: Notice = <Notice>{};

	//form model
	public formModel: NoticeSave = <NoticeSave>{};

	//grid select model
	public gridModel: Notice = <Notice>{};

   //점
   public comboStoreLv1: any = null;
   public comboStoreLv1Model: Notice = <Notice>{};

   //부
   public comboStoreLv2: any = null;
   public comboStoreLv2Model: Notice = <Notice>{};

   //팀
   public comboStoreLv3: any = null;
   public comboStoreLv3Model: Notice = <Notice>{};

   public startDt: any = null;
   public endtDt: any = null;

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';

	constructor(private noticeService: NoticeService, public envService: EnvService ) { }
	ngOnInit() { 

		this.paramModel.userId = this.envService.account.userId;
		this.paramModel.userName = this.envService.account.userName;

       //점 콤보박스 셋팅
	   this.baseStoreCombo()

	}
		

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

	//그리드 체크박스 선택 이벤트
	onSelectionChange = (grid, records, selecting, selection) => {
		let checkItem = selection._selected.items;
		let users = new Array();
		checkItem.forEach(function(element){
		   users.push(element.data.userId);
		   //console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
		});
		
		this.formModel.ms82rsabuns = users;
 	}

	//달력 포멧 변경
	startDtCmp: any;
	onReadystartDt(event){
		this.startDtCmp = event.cmp;
		this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//달력 포멧 변경
	endDtCmp: any;
	onReadyendDt(event){
		this.endDtCmp = event.cmp;
		this.endDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		this.formModel.ms81fr= this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
		this.formModel.ms81to= this.envService.getDateToString(date.newDate);
	}

	//공지사항 제목 변경 이벤트
	onChangeTitle(date){
		this.formModel.ms81title= date.newValue;
	}

	//공지사항 내용 변경 이벤트
	onChangeMsg(date){
		this.formModel.ms81msg= date.newValue;
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
		this.noticeService.selectNoticeList(this.paramModel).subscribe(
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

    	//수정 버튼 이벤트
	onTapModify(event){
		this.isDisabled = false;
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				console.log(this.formModel);
				this.noticeService.deleteNotice(this.formModel).subscribe(
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

			()=>{
				console.log(this.formModel);
				this.noticeService.saveNotice(this.formModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
						 Ext.Msg.alert('성공','저장되었습니다.');
					},
					(err: HttpErrorResponse) => {
						/**
						 * @error
						 */
						Ext.Msg.alert('Error!!', 'Server communication error.');
					}
				);
			}			
			// function(){
			// 	console.log(this.formModel);
			// 	this.noticeService.saveNotice(this.formModel).subscribe(
			// 		(res: any) => {
			// 			/**
			// 			 * @success
			// 			 */
			// 		},
			// 		(err: HttpErrorResponse) => {
			// 			/**
			// 			 * @error
			// 			 */
			// 			Ext.Msg.alert('Error!!', 'Server communication error.');
			// 		}
			// 	);
			// }
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.noticeService.excelNotice(this.paramModel).subscribe(
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
		this.noticeService.reportNotice(this.paramModel).subscribe(
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
		this.noticeService.helpNotice(this.paramModel).subscribe(
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
				this.jumComboVal 	= this.comboStoreLv1[0].storeLvCd;
				this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;				
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
   }


   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
	    //조직(점) 조회
		this.comboStoreLv2Model.paramLvCd = data.newValue;
		this.paramModel.jum = data.newValue;
	    this.envService.selectStoreComboLv2ListInsa(this.comboStoreLv2Model).subscribe(
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
		this.paramModel.bu = data.newValue;

	    this.envService.selectStoreComboLv3ListInsa(this.comboStoreLv3Model).subscribe(
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
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}