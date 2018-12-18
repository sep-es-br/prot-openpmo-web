export class Util {

    public JSONStringfyOmitNull(object: any): string {
        let strReturn = JSON.stringify(object, (key, value) => {
            if (value !== null) return value
          });
        return strReturn;
    }
    
}