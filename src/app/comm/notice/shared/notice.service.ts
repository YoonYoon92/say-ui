import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../..//shared/api-http.service';
import { Notice } from './notice.model';
import { NoticeSave } from './notice.saveModel';

@Injectable()
export class NoticeService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/notice',null);
	}

	//단일 대상 조회
	public selectNotice(request: Notice){
		return this.httpPost('/api/notice/selectNotice',request);
	}

	//복수 대상 조회
	public selectNoticeList(request: Notice){
		return this.httpPost('/api/notice/selectNoticeList',request);
	}

	//수정
	public updateNotice(request: Notice){
		return this.httpPost('/api/notice/updateNotice',request);
	}

	//등록
	public insertNotice(request: NoticeSave){
		return this.httpPost('/api/notice/insertNotice',request);
	}

	//수정+등록
	public saveNotice(request: NoticeSave){
		return this.httpPost('/api/notice/saveNotice',request);
	}

	//삭제
	public deleteNotice(request: Notice){
		return this.httpPost('/api/notice/deleteNotice',request);
	}

	//엑셀
	public excelNotice(request: Notice){
		return this.httpPost('/api/notice/deleteNotice',request);
	}

	//레포트
	public reportNotice(request: Notice){
		return this.httpPost('/api/notice/reportNotice',request);
	}

	//도움말
	public helpNotice(request: Notice){
		return this.httpPost('/api/notice/deleteNotice',request);
	}

}