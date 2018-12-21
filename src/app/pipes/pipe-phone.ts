import { Pipe } from "@angular/core";


@Pipe({
    name: 'stringFilter'
})
export class PhonePipe {
    public key= true

    transform ( value:string = "", caracters:string = "", flow:boolean = true, oscillation:boolean = false ) {

        let i: number = 0;
        let j: number = 0;
        let check: boolean = false
        let check_osc: boolean = false
        let data_suport:any = "";
        let char_value: any = value.split("");
        let char_caracters: any = caracters.split("");
    
        for ( i=0; i < value.length; i++ ) {
            for ( j=0; j < caracters.length; j++ ) {

                if ( char_value[i] == char_caracters[j] ) {
                    check = true;
                    check_osc = false;
                    j = caracters.length;
                } 
                else {
                     check_osc = true; 
                }
            }

            if ( flow == true ) {
                if( check == true ) {
                    data_suport = data_suport + char_value[i];
                }
            }
            else {
                if( check == false ) {
                    data_suport = data_suport + char_value[i];
                }
            }
            check = false;
        }

        if (( oscillation ) && ( check_osc )) {
            if ( this.key ) {
                data_suport = data_suport + " "
                this.key = false
            }
            else {
                this.key = true 
            }
        }
            
        console.log('data_suport', data_suport);
        return data_suport;
    }
}

