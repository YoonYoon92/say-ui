export class TradingAreaMemberInq {
	startDt 		    : string;   /*시작일*/
	endDt   		    : string;   /*종료일*/

   jum			    : string;	/*점*/
   bu              : string;   /*부*/
   tim             : string;   /*팀*/

   storeLvCd       : string;	/*조직코드*/
   storeLvNm       : string;	/*조직명*/
   paramLvCd       : string;	/*조직 검색 코드*/

   searchDt       : string;	/*조직 검색 코드*/
   searchNm       : string;
   searchCd       : string;
   
   tradingAreaCd   : string;  //상권구분코드
   tradingAreaNm   : string;  //상권구분명

   areaCd   : string;  //지역구분코드
   areaNm   : string;  //지역구분명

   cdMember       : number;
   cdRate         : number;
   plusMember     : number;
   plusRate       : number;
   
   useMember      : number;
   useRate        : number;

   memberAmt      : number;
   memberAmtRate  : number;
   memberPrice    : number;
}