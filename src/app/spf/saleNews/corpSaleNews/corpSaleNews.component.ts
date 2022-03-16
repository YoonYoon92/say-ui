/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CorpSaleNews } from './shared/corpSaleNews.model';
import { CorpSaleNewsService } from './shared/corpSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { testModel } from './shared/testModel';


@Component({
	selector: 'app-corpSaleNews',
	templateUrl: './corpSaleNews.component.html',
	providers: [CorpSaleNewsService],
})
export class CorpSaleNewsComponent implements OnInit {

	@Input() public route: any;

	public testModel: testModel = <testModel>{};

	//param model
	public paramModel: CorpSaleNews = <CorpSaleNews>{};

	//grid select model
	public gridModel: CorpSaleNews = <CorpSaleNews>{};

   	//comboBox Store 점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: CorpSaleNews = <CorpSaleNews>{};

   	//comboBox Store 부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: CorpSaleNews = <CorpSaleNews>{};

   	//comboBox Store 팀
   	public comboStoreLv3: any = null;
	public comboStoreLv3Model: CorpSaleNews = <CorpSaleNews>{};
	   
	//comboBox Store PC
   	public comboStoreLv4: any = null;
   	public comboStoreLv4Model: CorpSaleNews = <CorpSaleNews>{};   
	
	//comboBox Store 구분
	public comboStoreGubun : any = [
		{comboId: 'gubunAll', comboNm: '전체'},
		{comboId: 'gubunDal', comboNm: '달성율'},
		{comboId: 'gubunSin', comboNm: '신장율'},
		{comboId: 'gubunJin', comboNm: '진도율'},
		{comboId: 'gubunDnfnt', comboNm: '차액'}
	]
	public comboStoreGubunModel: CorpSaleNews = <CorpSaleNews>{};   

	//grid store
	gridStore = new Ext.data.Store({});

	//조회일자
	public searchDay: any = null;
	public monthstartDt: any = null;
	public yearstartDt: any = null;

	public title: string = "";

	public dayCol = [];
	public monthCol = [];
	public yearCol = [];
	public compCol = [];

	//CheckBox 값
	public checkval1: any = null;
	public checkval2: any = null;

	constructor(private corpSaleNewsService: CorpSaleNewsService, public envService: EnvService ) { }
	ngOnInit() { 
		this.searchDay = new Date(this.envService.getCalDate(null));
		this.monthstartDt =new Date();
		this.monthstartDt.setDate('01');
		this.yearstartDt=new Date();
		this.yearstartDt.setMonth('00');
		this.yearstartDt.setDate('01');
		//조회일자 셋팅
		this.paramModel.searchDay 	= this.envService.getDateToString(this.envService.getCalDate(null));
       //점 콤보박스 셋팅
	   this.baseStoreCombo();
	   //구분 콤보박스 셋팅
	   this.comboStoreGubunModel.gubun = 'gubunDal';
	   this.paramModel.gubun = this.comboStoreGubunModel.gubun;

	   console.log(this.dayCol);
	}

	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}	

	//달력 포멧 변경
	searchDayCmp: any;
	onReadysearchDay(event){
		this.searchDayCmp = event.cmp;
		this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.searchDay = this.envService.getDateToString(date.newDate);
		this.monthstartDt=new Date(date.newDate);
		this.monthstartDt.setDate('01');
		this.yearstartDt.setDate('01');
		this.paramModel.monthstartDt=this.envService.getDateToString(this.monthstartDt);
		console.log(this.paramModel.searchDay)
		console.log(this.paramModel.monthstartDt)
		console.log('변환후')
		this.yearstartDt.setMonth('00');
		this.yearstartDt.setDate('01');
		this.paramModel.yearstartDt=this.envService.getDateToString(this.yearstartDt);
	
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

	//그리드 체크박스 선택 이벤트
	onSelectionChange = (grid, records, selecting, selection) => {
		console.log(this.dayCol);
		
		let checkData = selection._selected.items;
		let userIds = new Array();
		checkData.forEach(function(element){
			userIds.push(element.data.jum);
			//console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
		});

		console.log(userIds);
		//this.testModel = new CorpSaleNewsCopy;
		this.testModel.title = "제목";
		this.testModel.userIds = userIds;
		console.log(this.testModel);

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
		if(this.paramModel.serchLevel=='pc')
				{
			Ext.getCmp('mainPanel').hide();
			Ext.getCmp('mainPanelDal').hide();
			Ext.getCmp('mainPanelSin').hide();
			Ext.getCmp('mainPanelJin').hide();
			Ext.getCmp('mainPanelDnfnt').hide();
			Ext.getCmp('conerPanel').show();
		}
		else
		{
			Ext.getCmp('conerPanel').hide();
			if(this.paramModel.gubun=='gubunDal'){
				Ext.getCmp('mainPanel').hide();
				Ext.getCmp('mainPanelSin').hide();
				Ext.getCmp('mainPanelJin').hide();
				Ext.getCmp('mainPanelDnfnt').hide();				
				Ext.getCmp('mainPanelDal').show();
			}			
			else if(this.paramModel.gubun=='gubunSin'){
				Ext.getCmp('mainPanel').hide();
				Ext.getCmp('mainPanelDal').hide();
				Ext.getCmp('mainPanelJin').hide();
				Ext.getCmp('mainPanelDnfnt').hide();
				Ext.getCmp('mainPanelSin').show();
			}
			else if(this.paramModel.gubun=='gubunJin'){
				Ext.getCmp('mainPanel').hide();
				Ext.getCmp('mainPanelDal').hide();
				Ext.getCmp('mainPanelSin').hide();
				Ext.getCmp('mainPanelDnfnt').hide();
				Ext.getCmp('mainPanelJin').show();
			}
			else if(this.paramModel.gubun=='gubunDnfnt'){
				Ext.getCmp('mainPanel').hide();
				Ext.getCmp('mainPanelDal').hide();
				Ext.getCmp('mainPanelSin').hide();
				Ext.getCmp('mainPanelJin').hide();
				Ext.getCmp('mainPanelDnfnt').show();
			}
			else{
				Ext.getCmp('mainPanelDal').hide();
				Ext.getCmp('mainPanelSin').hide();
				Ext.getCmp('mainPanelJin').hide();
				Ext.getCmp('mainPanelDnfnt').hide();				
				Ext.getCmp('mainPanel').show();
			}			
		}

		this.corpSaleNewsService.selectCorpSaleNewsList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.title = 'wer';
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				console.log(err);
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
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
				this.corpSaleNewsService.deleteCorpSaleNews(null).subscribe(
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
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				this.corpSaleNewsService.saveCorpSaleNews(null).subscribe(
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
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		console.log("asdfasdfasdfasdfasdfasdfasdflakjsdl;kfajs;dlkfja");
		let url = this.corpSaleNewsService.excelCorpSaleNewsList(this.paramModel);
	
		
		console.log(url);
	
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//레포트 버튼 이벤트
	onTapReport(event){
		this.corpSaleNewsService.reportCorpSaleNews(this.paramModel).subscribe(
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
		this.corpSaleNewsService.helpCorpSaleNews(this.paramModel).subscribe(
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
   baseStoreCombo = () =>{
	this.paramModel.jum = '01';
	this.paramModel.serchLevel = 'jum';
	this.comboStoreLv1Model.storeLvCd='01';
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		this.comboStoreLv2Model.paramLvCd = '01';
		this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		    (res: any) => {
			this.comboStoreLv2 = res;
		},
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
	   this.paramModel.jum = data.newValue;
	   this.paramModel.serchLevel = 'jum';
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
		console.log(this.comboStoreLv2);
   }

   //부 콤보박스 선택 이벤트
   comboStoreLv2Event = (data) =>{
	   this.paramModel.bu = data.newValue;
	   this.paramModel.serchLevel = 'bu';
	   console.log(this.paramModel);
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
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
			console.log(this.paramModel.bu+'jum');
		}
		else
		{
			this.paramModel.serchLevel = 'bu';
			console.log(this.paramModel.bu+'bu');
		}

	
   }

   //팀 콤보박스 선택 이벤트
   comboStoreLv3Event = (data) =>{
	   this.paramModel.tim = data.newValue;
	   this.paramModel.serchLevel = 'tim';
	   console.log(this.paramModel);
	    //조직(PC)) 조회
	    this.comboStoreLv4Model.paramLvCd = data.newValue;
	    this.envService.selectStoreComboLv4List(this.comboStoreLv4Model).subscribe(
		    (res: any) => {
			    //조직(팀) data set
			    this.comboStoreLv4 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
		}
		else if(this.paramModel.tim=='')
		{
			this.paramModel.serchLevel = 'bu';
		}
		else
		{
			this.paramModel.serchLevel = 'tim';
		}
   }

	//PC 콤보박스 선택 이벤트
	comboStoreLv4Event = (data) =>{
		this.paramModel.pc = data.newValue;
		console.log(this.paramModel);
		if(this.paramModel.bu=='')
		{
			this.paramModel.serchLevel = 'jum';
		}
		else if(this.paramModel.tim=='')
		{
			this.paramModel.serchLevel = 'bu';
		}
		else if(this.paramModel.pc=='')
		{
			this.paramModel.serchLevel = 'tim';
		}
		else
		{
			this.paramModel.serchLevel = 'pc';
		}
	}

	//구분 콤보박스 선택 이벤트
	comboStoreGubunEvent = (data) =>{
		this.paramModel.gubun = data.newValue;
		//console.log(this.paramModel);
	}


	//전년실적 체크박스 선택 이벤트
	onChangeCheck1(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.checkval1 = data.newValue == true ? 'Y' : 'N';

		if (this.checkval1 == 'Y') 
		{
			//그리드 체크박스 선택 이벤트와 같은 방식으로 처리
			// onSelectionChange = (grid, records, selecting, selection) => {
			// 	console.log(this.dayCol);
				
			// 	let checkData = selection._selected.items;
			// 	let userIds = new Array();
			// 	checkData.forEach(function(element){
			// 		userIds.push(element.data.jum);
			// 		//console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
			// 	});
		
			// 	console.log(userIds);
			// 	//this.testModel = new CorpSaleNewsCopy;
			// 	this.testModel.title = "제목";
			// 	this.testModel.userIds = userIds;
			// 	console.log(this.testModel);
			// }
		}
	}

	//신장률 체크박스 선택 이벤트
	onChangeCheck2(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.checkval1 = data.newValue == true ? 'Y' : 'N';

		if (this.checkval1 == 'Y') 
		{
			//그리드 체크박스 선택 이벤트와 같은 방식으로 처리
			// onSelectionChange = (grid, records, selecting, selection) => {
			// 	console.log(this.dayCol);
				
			// 	let checkData = selection._selected.items;
			// 	let userIds = new Array();
			// 	checkData.forEach(function(element){
			// 		userIds.push(element.data.jum);
			// 		//console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
			// 	});
		
			// 	console.log(userIds);
			// 	//this.testModel = new CorpSaleNewsCopy;
			// 	this.testModel.title = "제목";
			// 	this.testModel.userIds = userIds;
			// 	console.log(this.testModel);
			// }
		}
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
	renderSignRate = (value, record) => {   
      
		var formattedValue = Ext.util.Format.number(value, '000.00 %');
  
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }
  
		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	 }
}