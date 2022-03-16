/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { Calendar } from './shared/calendar.model';
import { CalendarService } from './shared/calendar.service';
import { EnvService } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: [
        './calendar.css'
    ],
    providers: [CalendarService],
})
export class CalendarViewComponent implements OnInit {

    @Input() public route: any;

    //param model
	public paramModel: Calendar = <Calendar>{};

	//form model
	public formModel: Calendar = <Calendar>{};

    //grid select model
    public gridModel: Calendar = <Calendar>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: Calendar = <Calendar>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: Calendar = <Calendar>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: Calendar = <Calendar>{};

    //grid store
    gridStore = new Ext.data.Store({});

    //시작일
    public startDt: any = null;

    //종료일
    public endDt: any = null;

    //fild disabled
    public isDisabled : boolean = true;

    //Fieldset padding
	public padding : string = '15px';
	
	//달력 년월 
	public year: number;
	public month: number;

	//년월 증감 감소
	public addYear: number = 0;
    public addMonth: number = 0;
    
    public days: any;
    public arrayDay: any;

    constructor(private calendarService: CalendarService, public envService: EnvService ) { }
    ngOnInit() {

       	this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//현재 년월 
		this.year = this.envService.getCalYear(this.addYear);
        this.month = this.envService.getCalMonth(this.addMonth);
		
		//일수
        this.getDayCount(this.year, this.month);

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       	//점 콤보박스 셋팅
       	this.baseStoreCombo();
	}
	
	//달력 만들기
    public getDayCount(year, month){
        let count = new Date(year, month, 0).getDate();
        this.days = new Array();
        for(let i: number = 0; i <= count -1; i++){
            let num = i+1;
            this.days.push({
                day : num
            ,   week: new Date(`${year}-${month}-${num}`).getDay()  /* 요일 0:일요일, 1:월요일... */
            });
        }
        this.arrayDay = this.days;
    }

    //달력(일) 클래스 스타일 정의
    public dayClass(item: any){

        let classNm: string;

        if( item.week == 0 ){
            classNm = 'line-r line-l sun';
        }else if( item.week == 6){
            classNm = 'line-r sat';
        }else{
            classNm = 'line-r';
        }

        //1일은 왼쪽 라인선 추가
        classNm = item.day == 1 ? `${classNm} line-l` : classNm;

        return classNm;
    }

    //시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

    //grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

    //grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

    //조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.calendarService.selectCalendarList(this.paramModel).subscribe(
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
				this.calendarService.deleteCalendar(this.formModel).subscribe(
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
			function(){
				console.log(this.formModel);
				this.calendarService.saveCalendar(this.formModel).subscribe(
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
		this.calendarService.excelCalendar(this.paramModel).subscribe(
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
		this.calendarService.reportCalendar(this.paramModel).subscribe(
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
		this.calendarService.helpCalendar(this.paramModel).subscribe(
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

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

   //조직(점) 기본 셋팅
   baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
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
       console.log(data.newValue)
   	}
}