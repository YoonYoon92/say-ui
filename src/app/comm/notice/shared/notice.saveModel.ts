export class NoticeSave {
   userId          :    string;   //등록유저ID

   //공지내용
   ms81myy         :    string;       //공지년도 4            
  // ms81mid         :    int;        	 //공지순번 7	      
   ms81fr          :    string;       //공지시작 8            
   ms81to          :    string;       //공지종료 8            
   ms81gubun       :    string;       //구분, '' = 정상       
   ms81title       :    string;       //제목                
   ms81msg         :    string;       //내용                
   ms81wsabun      :    string;       //작성자 6             
   ms81wdate       :    string;       //작성일 14            
   ms81fill1       :    string;       //예비1               
   ms81fill2       :    string;       //예비2               
                                                
   //공지대상자
   ms82rsabuns      :    any;           //공지대상자사번   6    
   ms82rsabun      :    string;      
   ms82rchk        :    string;       //확인여부 1            
   ms82myy         :    string;       //공지년도 4            
  // ms82mid         :    int;        	 //공지순번 7         
   ms82rdate       :    string;       //확인일자14            
   ms82fill1       :    string;       //예비1               
   ms82fill2       :    string;       //예비2    
      
}