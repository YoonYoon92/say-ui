export class ClsSendHistory {

   dbType				: string;
   startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/
   jum			    : string;	/*점*/
   // bu              : string;   /*부*/
   // tim             : string;   /*팀*/
   // pc              : string;   /*세분류*/
   // cls            : string;   /*클래스*/
   // clsNm          : string;   //클래스명
   cls1           : string;   /*클래스1*/
   cls1Nm           : string;   /*클래스1*/
   cls2           : string;   /*클래스2*/
   cls2Nm           : string;   /*클래스2*/
   // eventStartDt   : string;   /*행사시작*/
   // eventEndDt     : string;   /*행사종료*/
   // proc           : string;   /*처리구분*/
   // disol          : string;   /*해체구분*/

   // storeLvCd       : string;	/*조직코드*/
   // storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
   partner           : string; //협력업체
   partnerNm         : string; //협력업체명
   coner             : string;   /*팀*/
   conerNm           : string;   /*코너명*/
   
   code		   : string;  //특정코드
   trade		   : string;  //거래선
   busiNum		: string;  //사업자번호
   busiNm		: string;  //사업자명
   lossRate	   : string;  //재고로스율
   marginRate  : string;  //마진율
   eventDiv	   : string;  //행사구분
   tagDiv		: string;  //태그구분
   regiDt		: string;  //등록일
   changeDt	   : string;  //변경일
   stopDt		: string;  //중지일
   delDt		   : string;  //삭제일
}