import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { ClsSaleNews } from './clsSaleNews.model';

@Injectable()
export class ClsSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/clsSaleNews',null);
	}

	//단일 대상 조회
	public selectClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/selectClsSaleNews',request);
	}

	//복수 대상 조회
	public selectClsSaleNewsList(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/selectClsSaleNewsList',request);
	}

	//수정
	public updateClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/updateClsSaleNews',request);
	}

	//등록
	public insertClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/insertClsSaleNews',request);
	}

	//수정+등록
	public saveClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/saveClsSaleNews',request);
	}

	//삭제
	public deleteClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/deleteClsSaleNews',request);
	}

	//엑셀
	public excelClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/deleteClsSaleNews',request);
	}

	//레포트
	public reportClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/reportClsSaleNews',request);
	}

	//도움말
	public helpClsSaleNews(request: ClsSaleNews){
		return this.httpPost('/api/clsSaleNews/deleteClsSaleNews',request);
	}

}