import { Pipe, PipeTransform, SecurityContext } from '@angular/core';


export let translation2 = function (texto:string) : string {
  let result:string

    if (texto == "New Workpack Template")
    result = "@@translation_teste"

  return result
}


@Pipe({
  name: 'translation'
})
export class translation{
  constructor(private texto:string) { }
 

}
