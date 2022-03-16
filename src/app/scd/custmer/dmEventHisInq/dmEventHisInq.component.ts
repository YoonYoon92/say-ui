/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { DmEventHisInq } from './shared/dmEventHisInq.model';
import { DmEventHisInqList } from './shared/dmEventHisInqList.model';
import { DmEventHisInqDetail } from './shared/dmEventHisInqDetail.model';
import { DmEventHisInqDetailT04 } from './shared/dmEventHisInqDetailT04.model ';
import { DmEventHisInqService } from './shared/dmEventHisInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-dmEventHisInq',
	templateUrl: './dmEventHisInq.component.html',
	providers: [DmEventHisInqService],
	styleUrls: ['./dmEventHisInq.component.css']
})
export class DmEventHisInqComponent implements OnInit {

	@Input() public route: any;

	storeCd : string;
	manaCd : string;

	isCollapse: boolean = true;
	isComboHidden: boolean = true;

	displayAdmin: boolean = false;


	//param model
	public paramModel: DmEventHisInq = <DmEventHisInq>{};

	//grid select model
	public gridModel: DmEventHisInqList = <DmEventHisInqList>{};
	public gridDetailModel: DmEventHisInqDetail = <DmEventHisInqDetail>{};
	public gridDetailT04Model: DmEventHisInqDetailT04 = <DmEventHisInqDetailT04>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: DmEventHisInq = <DmEventHisInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: DmEventHisInq = <DmEventHisInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: DmEventHisInq = <DmEventHisInq>{};

	//PC(세분류)
    public comboStoreLv4: any = null;
    public comboStoreLv4Model: DmEventHisInq = <DmEventHisInq>{};

	//클래스 key
    public comboStoreLv6: any = null;
    public comboStoreLv6Model: DmEventHisInq = <DmEventHisInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	gridDetailStore = new Ext.data.Store({});	
	gridDetailT04Store = new Ext.data.Store({});
	
	manageStore = new Ext.data.Store({
		//data 속성의 json object에 정의된 key 값들과 매칭시켜줍니다.
		fields : ['manageCd','manageNm'],
		//저장공간에 fix값으로 data 속성에 json array type으로 담아줍니다.
		data : [{
					manageCd : 'A',
					manageNm : '완료->작업중(A)'
				},{
					manageCd : 'R',
					manageNm : '작업중->작업대기(R)'
				},{
					manageCd : 'M',
					manageNm : '실적분석UPDATE(M)'
				},{
					manageCd : 'X',
					manageNm : '전산작업용(X)'
				},{
					manageCd : 'Z',
					manageNm : '강제완료(현재상태무관)(Z)'
				},{
					manageCd : 'E',
					manageNm : '작업중->완료(E)'
				},{
					manageCd : 'U',
					manageNm : '발송수 강제Update(U)'
				},{
					manageCd : 'N',
					manageNm : 'FILLER Update-수작업용(N)'
				},{
					manageCd : 'J',
					manageNm : '일련번호Update-수작업용(J)'
				},{
					manageCd : 'X',
					manageNm : '전산작업용(X)'
				},{
					manageCd : '1',
					manageNm : 'DM구분-DM으로변경(1)'
				},{
					manageCd : '2',
					manageNm : 'DM구분-SMS으로변경(2)'
				},{
					manageCd : '3',
					manageNm : 'DM구분-LIST으로변경(3)'
				},{
					manageCd : '4',
					manageNm : 'DM구분-EMAIL로변경(4)'
				},{
					manageCd : 'O',
					manageNm : 'DM대상자생성작업CALL(O)'
				},{
					manageCd : 'P',
					manageNm : '스풀생성-우편번호순(P)'
				},{
					manageCd : 'I',
					manageNm : '썬디엠용(I)'
				},{
					manageCd : 'H',
					manageNm : '썬디엠용(H)'
				}]}
	);	

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public dispositType = [];
	public salesType = [];
	public sum = [];

	public eventNmFilter = ''; 


	constructor(private dmEventHisInqService: DmEventHisInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();
		this.storeCd = '01';

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.eventManageCd = null;
       	//점 콤보박스 셋팅
	   	this.baseStoreCombo()
	   	//시작점 
		this.storeCd = "01";
		this.manaCd='';

		//행사관리 로그인 유저의 권한에 따라 disabled 속성  true/false
		// if () {
		
		// } else {
			this.displayAdmin=true;
		// }
		
		
	}

	renderSign = (value, record) => {
		var formattedValue = null;
		var col = '';
		var backCol = '';

		if (record.get('orgName') == "구성비" || record.get('sortation') == "구성비") {
			formattedValue = Ext.util.Format.number(value, '000.00 %');
		} else if (record.get('orgName') == "고객수" || record.get('sortation') == "고객수") {
			formattedValue = Ext.util.Format.number(value, '0,000');
		} else {
			formattedValue = Ext.util.Format.number(value/1000, '0,000');
		};
		
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}


	renderColor = (value, record) => {
		var sValue = null;
		var col = '';
		var backCol = '';
		var findChar = 0;

		findChar = value.indexOf("|");
		sValue = value.substring(0,findChar);
		col = value.substring(findChar+1,30);
		console.log("findChar: " + findChar + "| sValue: " + sValue + "| col: " + col);

		const result = `<span style='color:${col}'>${sValue}</span>`;
		return result;
	}


	renderSignRate = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '000.00 %');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignNormal = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	condChg = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '0,000');
	
		var col = '';
		var backCol = '';
		var result = value;		

		// switch (record.get('cond')) {
		// 	case '01':   //매출기간
		// 		result = value.substring(0,4) + '년' + value.substring(4,6) + '월' + value.substring(6,8) + '일 ~ '   +  value.substring(8,12) + '년' + value.substring(12,14) + '월' + value.substring(14,16) + '일';
		// 		break;
		// 	case '02':

		// 		break;
		// 	case '13':    //요청건수
		// 		var formattedValue = Ext.util.Format.number(value, '0,000');
		// 		if (value > 0) { col = 'black'; }
		// 		else if (value < 0) { col = 'red'; };
		// 		result = `<span style='color:${col}'>${formattedValue} 건</span> `;
		// 		break;
		// 	default:
		// 		result = value;
		// 		break;
		// }
		return result;
	}
	

	//점 초기 01 세팅
	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
	}

	//달력 포멧 한글로 변경
	searchFromDayCmp: any;
	onReadysearchFromDay(event){
		this.searchFromDayCmp = event.cmp;
		this.searchFromDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//달력 포멧 한글로 변경
	searchToDayCmp: any;
	onReadysearchToDay(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.endDt)
	   {
		  this.searchFromDayCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
	   {
		  this.searchToDayCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	   }
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//grid ready
	gridCmpDetail : any;
	onReadyDetailGrid(event){
		this.gridCmpDetail = event.cmp;
	}

	//grid ready
	gridCmpSendPerson : any;
	onReadySendPersonGrid(event){
		this.gridCmpSendPerson = event.cmp;
	}

	//grid ready
	gridCmpCommDis: any;
	onReadyCommDisGrid(event){
		this.gridCmpCommDis = event.cmp;
	}

	//grid row 선택 이벤트
	onSelectGrid(row){

		console.log(this.manageStore);
		//row 데이터 model 바인딩
		if(row.selected[0].data.orgName != '합계' && row.selected[0].data.orgName != '구성비' ) {
			this.gridModel = row.selected[0].data;
			this.paramModel.eventStartDt = this.gridModel.eventStartDt;
			this.paramModel.eventEndDt = this.gridModel.eventEndDt;
			this.paramModel.eventNo = this.gridModel.eventNo;
			this.paramModel.eventNm = this.gridModel.eventNm;

			if(this.isCollapse != false) {
				this.isCollapse = false;
			}

			//행사 대상자 선정 조건
			this.gridCmpDetail.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});

			this.dmEventHisInqService.selectDmEventHisInqDetail(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */

					// console.log('res:'+ JSON.stringify(res));
					this.gridDetailModel=res
					this.gridDetailStore.setData(res);
					//console.log('this.gridStore:' + this.gridDetailStore.getData());
					this.gridCmpDetail.setMasked(false);
					//그래프의 빠른 출력을 위한 새로고침 추가
					this.gridCmpDetail.refresh();

				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
					this.gridCmpDetail.setMasked(false);
				}
			);

			//행사 대상자 
			this.gridCmpSendPerson.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});

			this.dmEventHisInqService.selectDmEventHisInqT04CrtPson(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					
					// console.log('res:'+ JSON.stringify(res));
					this.gridDetailT04Model=res
					this.gridDetailT04Store.setData(res);
					//console.log('this.gridStore:' + this.gridDetailStore.getData());
					this.gridCmpSendPerson.setMasked(false);
					//그래프의 빠른 출력을 위한 새로고침 추가
					this.gridCmpSendPerson.refresh();

				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
					this.gridCmpSendPerson.setMasked(false);
				}
			);
		};
	}



	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		this.isCollapse = true;

		this.dmEventHisInqService.selectDmEventHisInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */

				// console.log('res:'+ JSON.stringify(res));

				this.gridModel=res
				this.gridStore.setData(res);
				console.log('res:' + this.gridStore);
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
			console.log(data.newValue);
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




	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}


	onTabDetailInqClosed(event){
    	this.isCollapse = !this.isCollapse;
	}


	//종료일 변경 이벤트
	onChangeSearch(value){
		//에러체크
		this.eventNmFilter = value.newData;
	 }


	//행사관리 콤보박스 변경 이벤트
	onChangeComboManage = (data) => {

		this.paramModel.eventManageCd = data.newValue;
		
	}


	//행사관리 콤보박스 변경 이벤트
	onTabManageCdUpdate = (data) => {
		
		console.log(this.paramModel.eventStartDt + this.paramModel.eventNo + this.paramModel.eventNm); 
		if(this.paramModel.eventManageCd != null && this.paramModel.eventManageCd != '' ) { 
			switch( this.paramModel.eventManageCd ) {
				case 'U' :
					Ext.Msg.prompt('Welcome!',
						'What\'s your name going to be today?',
						function (buttonId, value) {
							console.log(value);
						},
						null,
						false,
						null,
						{
							autoCapitalize: true,
							placeholder: 'First-name please...'
						}
					);
					break;
				default:
					Ext.Msg.confirm("코너 폐기", "선택하신 코너를 폐기하시겠습니까?", 
						(e)=>{
							if( e == 'yes' ){
							}
						}
					);
					break;
			}

		} else {
			Ext.Msg.alert('Error!!', '행사 관리 콤보Box를 선택후 UPDATE하세요!!');
	 	}
	}

  	// grid select event
	// onTabDetailInq = ({ sender, selected }) => {
	// 	if(this.isCollapse != false) {
	// 		this.isCollapse = false;
	// 	}
	// 	selected.data
	// }
}