import { Pipe } from "@angular/core";


@Pipe({
    name: 'phone'
})
export class PhonePipe{
    i: number
    result:any
    val_2:any;

    transform(val:any = "") {

        this.val_2 = val.split("");
        
        for(this.i=0; this.i < (Math.floor(val)); this.i++){

            if (this.val_2[this.i] == "0"){
                this.result = this.result + this.val_2[this.i]
            }

        }

        
        return this.result;
    }
}