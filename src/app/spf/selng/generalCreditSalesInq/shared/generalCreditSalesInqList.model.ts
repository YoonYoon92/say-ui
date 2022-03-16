export class GeneralCreditSalesInqList {

   classfication           : string;            //구분                             
   saledate                : string;            //판매일자                              
   regi                    : string;            //regi                            
   receipt                 : string;            //영수증 번호                              
   slpno                   : string;            //전표번호                              
   orgCd                   : string;            //조직코드                              
   classNo                 : string;            //클래스번호                              
   classNm                 : string;            //클래스명                              
   singleItemNo            : string;            //단품번호                              
   singleItemNm            : string;            //단품명                              
                      
   unitPrice               : number;            //단가                             
   quantity                : number;            //수량                             
   
   netAmount               : number;	         //순매출                              
   saleAmount              : number;	         //할인                              
   totalAmount             : number;	         //총매출

   creditAmount            : number;	         //외상매출금액                              
   etcAmount               : number;	         //기타매출금액                              
 
}