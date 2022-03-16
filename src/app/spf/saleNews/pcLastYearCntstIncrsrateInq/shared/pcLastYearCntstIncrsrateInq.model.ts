export class PcLastYearCntstIncrsrateInq {
	startDt 		: string;   /*시작일*/
	endDt   		: string;   /*종료일*/
	jum				: string;	//점
	bu    	    	: string;   	//부
	tim     	    : string;   	//팀
	comboVal   		: string;   /*콤보박스 값*/
	textFieldVal	: string;	/*text 값*/
	urlFieldVal		: string;	/*url 값*/
	emailFieldVal	: string;	/*email 값*/
	numFieldVal		: string;	/*숫자필드 값*/
	checkVal		: string;	/*전년 출력YN */
	toggleVal		: string;	/*토글 값 */
	dateVal		    : string;	/*날짜 값 */
	serchLevel 		: string; 	//검색등급
	page    		: number;   /*현재 페이지*/
	start   		: number;   /*start index*/
	limit   		: number;   /*limit index*/
	paramLvCd   	: string;	/*조직 검색 코드*/
	onlinechk		: string;  /*온라인체크*/
	onlinechkNm		: string;  /*온라인체크박스이름*/
	ZoneCd			: string; /*존*/
	ZoneNm			: string; /*존이름*/
	achivmentrateCheck : string; //달성율체크
	
	Seq				:number;		//순번
	coner			:string;        //코너
	conerNm			:string;        //코너명
	lastyearTry		:number;   	    //전년목표
	Try				:number;   	    //목표
	Splan			:number;   	    //실적
	lastyearSplan	:number;  	 	//전년실적
	lastyearCo		:number;  	 	//작년건수
	Co				:number;  	 	//건수
	lastyeaerDcnt	:number;		//전년할인
	Dcnt			:number;		//할인
	lastyearAchivmentrate :number; 	//전년달성율	
	Achivmentrate	:number; 	  	//달성율
	Incrsrate		:number;       	//신장율
}