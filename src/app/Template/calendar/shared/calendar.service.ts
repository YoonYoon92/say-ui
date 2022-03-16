import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared/api-http.service';
import { Calendar } from './calendar.model';

@Injectable()
export class CalendarService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/calendar',null);
	}

	//단일 대상 조회
	public selectCalendar(request: Calendar){
		return this.httpPost('/api/calendar/selectCalendar',request);
	}

	//복수 대상 조회
	public selectCalendarList(request: Calendar){
		return this.httpPost('/api/calendar/selectCalendarList',request);
	}

	//수정
	public updateCalendar(request: Calendar){
		return this.httpPost('/api/calendar/updateCalendar',request);
	}

	//등록
	public insertCalendar(request: Calendar){
		return this.httpPost('/api/calendar/insertCalendar',request);
	}

	//수정+등록
	public saveCalendar(request: Calendar){
		return this.httpPost('/api/calendar/saveCalendar',request);
	}

	//삭제
	public deleteCalendar(request: Calendar){
		return this.httpPost('/api/calendar/deleteCalendar',request);
	}

	//엑셀
	public excelCalendar(request: Calendar){
		return this.httpPost('/api/calendar/deleteCalendar',request);
	}

	//레포트
	public reportCalendar(request: Calendar){
		return this.httpPost('/api/calendar/reportCalendar',request);
	}

	//도움말
	public helpCalendar(request: Calendar){
		return this.httpPost('/api/calendar/deleteCalendar',request);
	}

}