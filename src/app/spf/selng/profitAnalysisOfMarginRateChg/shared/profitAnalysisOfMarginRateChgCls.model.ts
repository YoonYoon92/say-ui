export class ProfitAnalysisOfMarginRateChgCls {

   dbType            : string;   

   startDt 		      : string;   /*시작일*/

   jum			      : string;	/*점*/
   bu                : string;   /*부*/
   tim               : string;   /*팀*/
   pc                : string;   /*팀*/
   jumNm			      : string;	/*점*/
   buNm              : string;   /*부*/
   timNm             : string;   /*팀*/
   pcNm              : string;   /*팀*/
   coner             : string;   /*팀*/
   conerNm           : string;   /*코너명*/
   orgCode           : string;   /*조직코드*/

   storeLvCd         : string;	/*조직코드*/
   storeLvNm         : string;	/*조직명*/
   paramLvCd         : string;	/*조직 검색 코드*/
   partner           : string;   //협력업체
   partnerNm         : string;   //협력업체명
   cls1              : string;	/*조직코드*/
   cls2              : string;	/*조직명*/
   clsNm             : string;	/*조직 검색 코드*/
   giveDt            : string;   //협력업체
   duseDt            : string;   //협력업체명
   fee               : number;   //수수료
   status            : string;   //상태

   code		         : string;   //특정코드
   trade		         : string;   //거래선
   busiNum		      : string;   //사업자번호
   busiNm		      : string;   //사업자명
   lossRate	         : string;   //재고로스율
   marginRate        : string;   //마진율
   eventDiv	         : string;   //행사구분
   tagDiv		      : string;   //태그구분
   regiDt		      : string;   //등록일
   changeDt	         : string;   //변경일
   stopDt		      : string;   //중지일
   delDt		         : string;   //삭제일

   afterMagin	      : number;   //후마진
   beforeMargin		: number;   //전마진
   endDt		         : string;   //종료일
   marginChangeDt	   : string;   //마진변경일
   eventCode		   : string;   //행사코드

   owner    	 	   : string;	//대표자명
	jumin     	 	   : string;	//주민
	tel      		   : string;	//전화
	address  		   : string;	//주소
	addressNm     	   : string;	//주소명
	service      	   : string;	//업태
	serviceSect       : string;	//업종
	imprest     	   : string;	//전도금
	payment     	   : string;	//지불방법
	paymentCode      	: string;	//지불코드
	billDt     		   : string;	//어음일자
	paymentLateCode   : string;	//지불연착코드
	bankDiv      	   : string;	//예금종류
	bankCode   	      : string;	//은행코드
	bankNum   	      : string;	//계좌번호
	bankNm      	   : string;	//예금주명
	paymentCondition  : string;	//지급조건
	calcdiv      	   : string;	//끝전처리
	openDt      	   : string;	//창사기념일
	endCode     	   : string;	//끝전처리코드
	areaDiv      	   : string;	//지역구분
   manageBu      	   : string;	//관리부서
   tradeStop      	: string;	//거래중지
	ParterdelDt      	: string;	//협력업체 삭제일자
	fax      		   : string;	//fax

}