export class SalesByTypeInqList {

   orgCd                  : string;            //조직코드                             
   orgName                : string;            //조직명                              
                      
   //입금형태별 매출
   cash                   : number;            //현금                             
   card                   : number;            //카드                             
   norCrdt                : number;            //일반외상                             
   gift                   : number;            //상품권                            
   cod                    : number;            //COD  
   etc                    : number;            //기타 
   
   //판매형태별 매출
   normal                 : number;	           //정상                              
   event                  : number;	           //행사                              
   uniform                : number;	           //균일
   
   //합계
   netAmount              : number;	           //순매출                              
   saleAmount             : number;	           //할인                              
   totalAmount            : number;	           //총매출

   //고객수(매출건수)
   customCnt              : number;	           //고객수                              
 
}