export class BuyReqFormInq {
   dbType				: string;
   startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   chit           : string; //전표
   chitNum        : string; //전표번호
   cls            : string; //클래스
   clsNm          : string; //클래스명
   partner        : string; //협력업체
   partnerNm      : string; //협력업체명
   cost           : number; //원가
   price          : number; //매가
   sumCost        : number; //원가합계
   sumPrice       : number; //매가합계
   diffPrice      : number; //차액
   diffRate       : number; //차익율
   num            : number; //수량
   conf           : string; //확정
   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
}