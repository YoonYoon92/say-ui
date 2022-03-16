import{ Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'comma'
})
export class commaPipeComponent implements PipeTransform{

    transform(value: any) {
        //천단위 콤마
        return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
    }
    
}