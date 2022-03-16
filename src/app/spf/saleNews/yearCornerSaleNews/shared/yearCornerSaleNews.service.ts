import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared/api-http.service';
import { YearCornerSaleNews } from './yearCornerSaleNews.model';

@Injectable()
export class YearCornerSaleNewsService extends ApiHttpService{

	//서버 상태 체크
	public condition(){
		return this.httpGet('/api/yearCornerSaleNews',null);
	}

	//단일 대상 조회
	public selectYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/selectYearCornerSaleNews',request);
	}

	//복수 대상 조회
	public selectYearCornerSaleNewsList(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/selectYearCornerSaleNewsList',request);
	}

	//수정
	public updateYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/updateYearCornerSaleNews',request);
	}

	//등록
	public insertYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/insertYearCornerSaleNews',request);
	}

	//수정+등록
	public saveYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/saveYearCornerSaleNews',request);
	}

	//삭제
	public deleteYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/deleteYearCornerSaleNews',request);
	}

	//엑셀
	public excelYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/deleteYearCornerSaleNews',request);
	}

	//레포트
	public reportYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/reportYearCornerSaleNews',request);
	}

	//도움말
	public helpYearCornerSaleNews(request: YearCornerSaleNews){
		return this.httpPost('/api/yearCornerSaleNews/deleteYearCornerSaleNews',request);
	}

}