export class BuPlanSaleInq {
	dbType				: string;
	startDt 		: string;   /*시작일*/
	endDt   		: string;   /*종료일*/

	comboVal   		: string;   /*콤보박스 값*/
	textFieldVal	: string;	/*text 값*/
	urlFieldVal		: string;	/*url 값*/
	emailFieldVal	: string;	/*email 값*/
	numFieldVal		: string;	/*숫자필드 값*/
	checkVal		: string;	/*체크박스 값 */
	toggleVal		: string;	/*토글 값 */
	dateVal		    : string;	/*날짜 값 */

	page    		: number;   /*현재 페이지*/
	start   		: number;   /*start index*/
	limit   		: number;   /*limit index*/

	jum				: string;		//점
	bu    	    	: string;   	//부
	paramLvCd   	: string;	/*조직 검색 코드*/
	serchLevel 		: string; 	//검색등급
	
	Pc   		   : string;			//피씨번호
	PcNm 		   : string;			//피시명
	Try            : number;    		//계획
	Splan          : number;    		//실적
	LastyearSplan  : number;	 		//전년실적	
	Achivmentrate  : number; 			//달성율
	Incrsrate      : number;			//신장율
	CustmerNum     : number;			//객수
	CustmerCst     : number;			//객단가

}