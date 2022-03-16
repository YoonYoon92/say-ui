export class RtnReqManagement {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/
   returnDt 		 : string;   /*반품일*/
	payDt   		    : string;   /*납기일*/
   deleteDt 		 : string;   /*삭제일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/
   cls            : string;
   pc              : string;
   clsNm            : string;
   partner          : string;
   partnerNm        : string;
   chitYear          : string; //전표년도
   chitNum           : string; //전표번호
   partnerStatus     : string; //거래선상태

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/
   userId          : string; //userId
   
   itemCd         : string; //단품코드
   itemNm         : string; //단품명
   itemsCd        : string; //품목코드
   itemsNm        : string; //품목코드
   cost           : number; //원가
   emptyCost      : number; //공병단가
   price          : number; //매가
   totCost        : number; //원가합계
   totPrice       : number; //매가합계
   diffPrice      : number; //차액
   diffRate       : number; //차익율
   num            : number; //수량
   unit           : number; //단위
   purchaseMargin : number; //매입마진
   conf           : string; //확정
   featureCd      : string; //특정코드
   taxDiv         : string; //세금구분
}