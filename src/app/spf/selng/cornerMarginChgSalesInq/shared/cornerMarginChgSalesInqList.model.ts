export class CornerMarginChgSalesInqList {

   cls2                   : string;            //클래스 key 2byte                             
   minDay                 : string;            //매출 시작일                              
   maxDay                 : string;            //매출 종료일                              
   netAmount              : number;            //순매출
   saleAmount             : number;            //할인
   totalAmount            : number;            //총매출
   feeAmount              : number;            //수수료
   marginRate             : number;            //이익율(마진)

   marginFrDate           : string;            //마진변경 시작일                              
   marginToDate           : string;            //마진변경 종료일                           

}