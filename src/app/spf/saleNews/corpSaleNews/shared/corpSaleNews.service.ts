import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { CorpSaleNews } from './corpSaleNews.model';

@Injectable()
export class CorpSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/corpSaleNews',null);
	}

	//단일 대상 조회
	public selectCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/selectCorpSaleNews',request);
	}

	//복수 대상 조회
	public selectCorpSaleNewsList(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/selectCorpSaleNewsList',request);
	}

	//수정
	public updateCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/updateCorpSaleNews',request);
	}

	//등록
	public insertCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/insertCorpSaleNews',request);
	}

	//수정+등록
	public saveCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/saveCorpSaleNews',request);
	}

	//삭제
	public deleteCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/deleteCorpSaleNews',request);
	}

	//엑셀
	public excelCorpSaleNewsList(request: CorpSaleNews){		
		return this.httpUrl('/api/corpSaleNews/excel',request);
	}

	//레포트
	public reportCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/reportCorpSaleNews',request);
	}

	//도움말
	public helpCorpSaleNews(request: CorpSaleNews){
		return this.httpPost('/api/corpSaleNews/deleteCorpSaleNews',request);
	}

}