export class Useful {
    
    public GetfullName(name: String){
        return name
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/ig, "_");
    }

    public GetTrimmedName(name: String) {
        if (name.trim() == ""){
            return "";
          }
          else {
            return name;
          }
    }
    
}
