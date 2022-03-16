/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { WorkEnvMangement } from './shared/workEnvMangement.model';
import { WorkEnvMangementService } from './shared/workEnvMangement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timeHours } from 'd3-time';

@Component({
	selector: 'app-workEnvMangement',
	templateUrl: './workEnvMangement.component.html',
	providers: [WorkEnvMangementService],
})
export class WorkEnvMangementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: WorkEnvMangement = <WorkEnvMangement>{};
	public resultModel:WorkEnvMangement = <WorkEnvMangement>{};
	public gridModel: WorkEnvMangement = <WorkEnvMangement>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: WorkEnvMangement = <WorkEnvMangement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: WorkEnvMangement = <WorkEnvMangement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: WorkEnvMangement = <WorkEnvMangement>{};

	//grid store
	gridStore = new Ext.data.Store({});
	
    //접속자 위치 정보
    public location     : any;
	//날씨정보
	public weatherMap   : any;

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	//비교일
	public CompareDt: any = null;
	//요일선택
	public dayValue : string;
	public dayStore : any = [
		{dayCd: '0', dayNm: '일요일'},
		{dayCd: '1', dayNm: '월요일'},
		{dayCd: '2', dayNm: '화요일'},
		{dayCd: '3', dayNm: '수요일'},
		{dayCd: '4', dayNm: '목요일'},
		{dayCd: '5', dayNm: '금요일'},
		{dayCd: '6', dayNm: '토요일'},
	 ]
	 public workYNValue : string;
	 public workYNStore : any = [
		{workYNCd: '1', workYNNm: '영업'},
		{workYNCd: '2', workYNNm: '휴일'}
	 ]
	 public workFormValue : string;
	 public workFormStore : any = [
		{workFormCd: '1', workFormNm: '정상'},
		{workFormCd: '2', workFormNm: '행사'}
	 ]
	 public weatherValue : string;
	 public weatherStore : any = [
		{weatherCd: '0', weatherNm: '맑음'},
		{weatherCd: '1', weatherNm: '흐림'},
		{weatherCd: '2', weatherNm: '비'},
		{weatherCd: '3', weatherNm: '눈'}
	 ]
	 public TemperatureValue : string;
	 public carCntValue : string;
	 public customerCntValue : string;
	 public processResult :any =null;


	constructor(private workEnvMangementService: WorkEnvMangementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();
		//this.CompareDt= new Date(this.envService.getBeforeDate(365));
		this.CompareDt=this.envService.getDateToString(new Date(this.envService.getBeforeDate(365)));
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.toDay 		= this.envService.getDateToString(null);
		this.paramModel.workCompareDt = this.CompareDt;
       //점 콤보박스 셋팅
       this.baseStoreCombo();
	   this.getGeolocation();
	   this.workYNValue='1';
	   this.workFormValue='1';
	   this.weatherValue='0';
	   this.carCntValue='0';
	   this.customerCntValue='0';
	   this.dayValue=this.dayOfWeek(0);
	   //파라메터값저장
	   this.paramModel.workDay=this.dayValue;
	   this.paramModel.workYN= this.workYNValue;
	   this.paramModel.workForm=this.workFormValue;
	   this.paramModel.workWeather=this.weatherValue;
	   this.paramModel.workCarCnt=this.carCntValue;
	   this.paramModel.workcustomerCnt=this.customerCntValue;
	   this.paramModel.workTemperature=this.TemperatureValue;
	
	
	
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}
	// //달력 포멧 변경
	// searchFrDayCmp: any;
	// onReadyCompareDt(event){
	// 	this.CompareDt = event.cmp;
	// 	this.CompareDt.getPicker().setHeaderFormat('Y년m월d일');
	// }

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}
	onChangeCompareDt(date){
		this.paramModel.workCompareDt = this.envService.getDateToString(date.newDate);
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
	onReadyDay(event){
		this.dayStore.dayCd=this.resultModel.workDay;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
	
		this.workEnvMangementService.selectWorkEnvMangement(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.resultModel=res;
				this.dayValue=this.resultModel.workDay;
				this.workYNValue=this.resultModel.workYN;
				this.workFormValue=this.resultModel.workForm;
				this.weatherValue=this.resultModel.workWeather;
				this.TemperatureValue=this.resultModel.workTemperature;
				this.carCntValue=this.resultModel.workCarCnt;
				this.customerCntValue=this.resultModel.workcustomerCnt;
				//this.CompareDt=this.resultModel.workCompareDt.substring(0,4)+'/'+this.resultModel.workCompareDt.substring(4,2)+'/'+this.resultModel.workCompareDt.substring(6,2);
				//this.CompareDt=new Date(this.resultModel.workCompareDt);
				//this.CompareDt=new Date(parseInt(this.resultModel.workCompareDt.substr(0,4)),parseInt(this.resultModel.workCompareDt.substr(4,2)),parseInt(this.resultModel.workCompareDt.substr(6,2)) );
				this.CompareDt=this.resultModel.workCompareDt;
				console.log(this.CompareDt);
				console.log(parseInt(this.resultModel.workCompareDt.substr(0,4)));
				console.log(parseInt(this.resultModel.workCompareDt.substr(4,2)));
				console.log(parseInt(this.resultModel.workCompareDt.substr(6,2)));
				console.log(this.resultModel);
			
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

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			(e)=>{
				if( e == 'yes' ){
					// console.log(this.formModel);
					this.workEnvMangementService.deleteWorkEnvMangement(this.paramModel).subscribe(
						(res: any) => {
							/**
							 * @success
							 */
							 this.processResult=res;

							 if(this.processResult==1){
								Ext.Msg.alert('삭제완료!!','삭제되었습니다.');  
							}
							else{
								Ext.Msg.alert('삭제오류!!','삭제하지 못했습니다.');  
							}
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
		// this.formModel = <WorkEnvMangement>{};
		// this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
	//	this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		console.log(this.paramModel);
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if(this.paramModel.workDay==null ||
					this.paramModel.workCarCnt==null||
					this.paramModel.workCompareDt==null||
					this.paramModel.workForm==null||
					this.paramModel.workTemperature==null||
					this.paramModel.workWeather==null||
					this.paramModel.workYN==null||
					this.paramModel.workcustomerCnt==null||
					this.paramModel.workDay=='' ||
					this.paramModel.workCarCnt==''||
					this.paramModel.workCompareDt==''||
					this.paramModel.workForm==''||
					this.paramModel.workTemperature==''||
					this.paramModel.workWeather==''||
					this.paramModel.workYN==''||
					this.paramModel.workcustomerCnt==''
					)
					{	
						Ext.Msg.alert('오류!!','빈칸이있는지 확인해주세요');  
					}
				else{
					if( e == 'yes' ){
						// console.log(this.formModel);
						
						console.log(this.TemperatureValue);
						this.workEnvMangementService.saveWorkEnvMangement(this.paramModel).subscribe(
							(res: any) => {
								/**	
								 * @success
								 */
								this.processResult=res;
								

								if(this.processResult==1){
									Ext.Msg.alert('수정완료!!','수정되었습니다.');  
								}
								else if(this.processResult==2){
									Ext.Msg.alert('저장완료!!','저장되었습니다.');  
								} 
								else{
									Ext.Msg.alert('저장오류!!','저장하는 중 오류가 발생했습니다.');  
								}
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
			}
		);
		
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.workEnvMangementService.excelWorkEnvMangement(this.paramModel).subscribe(
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
		this.workEnvMangementService.reportWorkEnvMangement(this.paramModel).subscribe(
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
		this.workEnvMangementService.helpWorkEnvMangement(this.paramModel).subscribe(
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


   dayStoreEvent = (data) =>{
	this.paramModel.workDay = data.newValue;
	console.log(data.newValue)
   }
   workYNStoreEvent = (data) =>{
	this.paramModel.workYN = data.newValue;
	console.log(data.newValue)
   }
   workFormStoreEvent = (data) =>{
	this.paramModel.workForm = data.newValue;
	console.log(data.newValue)
   }
   TemperatureEvent = (data) =>{
	this.paramModel.workTemperature = data.newValue;
	console.log(data.newValue)
   }
   weatherStoreEvent = (data) =>{
	this.paramModel.workWeather = data.newValue;
	console.log(data.newValue)
   }
   carCntEvent = (data) =>{
	this.paramModel.workCarCnt = data.newValue;
	console.log(data.newValue)
   }
   customerCntEvent = (data) =>{
	this.paramModel.workcustomerCnt = data.newValue;
	console.log(data.newValue)
   }
   getGeolocation(){
	//현재 접속한 사용자의 위치 정보를 가져온다
	this.envService.getPosition().then(pos=>{
		/* 날씨 정보 조회
		   위도 경도는 접속자 위치(브라우저에서 권한 동의 해야함) 
		   위치 정보를 못가져 올때는 기본값으로 대전
		*/
	   this.location = {
			lng: pos.lng
		,   lat: pos.lat
	   }
	   this.getWeatherMap();
	}).catch(err=>{
		this.location = {
			lng: '127.408961'
		,   lat: '36.321038'
	   }
	   this.getWeatherMap();
	});

}

   getWeatherMap(){
	this.envService.selectWeatherMap(this.location).subscribe(
		(res: any) => {
			/**
			 * @success
			 */
			this.weatherMap = res;
			this.TemperatureValue=this.envService.kToc(this.weatherMap.current.temp);
			this.TemperatureValue=this.TemperatureValue.substr(0,2);
			console.log(this.envService.kToc(this.weatherMap.current.temp));
			
		},
		(err: HttpErrorResponse) => {
			/**
			 * @error
			 */
			Ext.Msg.alert('Error!!', '날씨정보 조회 실패.');
			if (err.error instanceof Error) {
				console.log('An error occurred:', err.error.message);
			} else {
				console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
			}
		}
	);
	}
	public dayOfWeek(day){
        let week = ['0', '1', '2', '3', '4', '5', '6'];
        let date = new Date();
        date.setDate( date.getDate() + day );
        return week[date.getDay()];
    }

}