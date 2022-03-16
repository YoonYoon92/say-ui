export class EventHallSaleInq {
	startDt 		: string;   /*시작일*/
	endDt   		: string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   pc             : string;   /*팀*/

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
   serchLevel 		: string; 	//검색등급
   alleventcd     :string; //전제조건
   eventcd1       : String; //행사지역코드
   eventcd2       : String; //행사일련번호
   eventNm        : String; //이벤트명
   eventstartDt   : String; //이벤트시작일
   eventendDt     : String; //이벤트종요일
 
   Nm   	            :string;	   //이름
	Try				   :number;    //목표
	sumTry			   :number;	   //누계목표
	sale				   :number;    //매출
   sumSale			   :number;    //누계매출
   discount			   :number;    //매출
   sumDiscount		   :number;    //누계매출
   custmernum			:number;    //고객수
	sumCustmernum		:number;    //누계고객수
	custmercst			:number;    //객단가
	sumCustmercst		:number;    //누계객단가
	Achivmentrate	   :number;	   //달성율
   sumAchivmentrate  :number;	   //누계달성율
   
}