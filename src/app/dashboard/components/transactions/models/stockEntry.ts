export class StockEntry {
    plant:string;
    location:string;
    labelNr:string;
    rackType:string;
    rackId:string;
    bin:string;
    material:string;
    qty:number;
    status:string;
    sapLoc:string;
  }

  export class StockChange{
    labelNr:string;
    rackId:string;
    bin:string;
    feildChangeType:string;
    status:string;
    sapLoc:string;
  }
