export class CorpSaleNews {
	dbType		: string;
	jum			: string;	//점
	bu          : string;   	//부
	tim         : string;   	//팀
	pc          : string;   	//세분류
	gubun       : string;
	coner       : string;  	//코너
	cls         : string;  	//클래스
	serchLevel  : string; 	//검색등급
	frDate      : string; 	//시작검색일자
	toDate      : string;   //종료검색일자
	monthstartDt: string;   //월시작일
	yearstartDt : string;   //년시작일
	searchDay	: string;	//조회일자
	beforeDay 	: string;	//조회일자-1 
	beforeYear 	: string;	//작년조회일자

	storeLvCd   : string;	/*조직코드*/
	storeLvNm   : string;	/*조직명*/
	paramLvCd   : string;	/*조직 검색 코드*/
}
