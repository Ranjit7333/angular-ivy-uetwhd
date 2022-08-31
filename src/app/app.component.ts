import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  ObjPer: Per = new Per();
  AllGrs: any = {};
  Data: any = {};
  TotalData: any = {};
  Discount :any ={};
  lableName = 'percentage';
  AmountDiscount :any ={};
  inputChange() {
    if(this.ObjPer.Unit && this.ObjPer.Rate){
    this.AllGrs = this.ObjPer.Unit * this.ObjPer.Rate;
    this.ObjPer.GrosAmt = this.AllGrs ? this.AllGrs : 0;
    this.ObjPer.TaxAmt = this.ObjPer.GrosAmt;
    this.SelectChange();
    this.SelectDiscountChange();
    }
    else{
      this.ObjPer.TaxAmt = 0 ;
      this.ObjPer.GrosAmt =0;
        }
  }
  SelectChange() {
    if (this.ObjPer.ExsisType === '%') {
      this.lableName = 'percentage';
      this.Data = this.ObjPer.GrosAmt / 100 * this.ObjPer.Percentage;
      console.log('this.Data', this.Data);
      this.ObjPer.Output = this.Data;
      this.ObjPer.TaxAmt = this.ObjPer.GrosAmt + this.ObjPer.Output;
    }
   else if (this.ObjPer.ExsisType === 'Amount') {
      this.lableName = 'Amount';
      this.ObjPer.Output = this.ObjPer.Percentage;
      this.TotalData = Number(this.ObjPer.Output) + Number(this.ObjPer.GrosAmt);
      this.ObjPer.TaxAmt = this.TotalData ? this.TotalData : undefined;
    } 
    else{
     this.ObjPer.TaxAmt = this.ObjPer.GrosAmt;
     this.ObjPer.Output = undefined;
     this.ObjPer.Percentage =0; 

    }
  }
  SelectDiscountChange(){
  if(this.ObjPer.discoutType === "%"){
   this.Discount = this.ObjPer.TaxAmt / 100 * this.ObjPer.discountField;
   this.ObjPer.discount = this.Discount;
   this.ObjPer.TaxAmt =this.ObjPer.TaxAmt - this.ObjPer.discount ;
  }
  else if(this.ObjPer.discoutType === "Amount"){
    this.ObjPer.discount = this.ObjPer.discountField;
    this.AmountDiscount = this.ObjPer.TaxAmt - this.ObjPer.discount;
   this.ObjPer.TaxAmt = this.AmountDiscount ? this.AmountDiscount : undefined;
  }
  else{
    this.ObjPer.TaxAmt = this.ObjPer.GrosAmt;
    this.ObjPer.discount =0 ;
    this.ObjPer.discountField =0 ;
  }

} 
}
class Per {
  Unit: number;
  Rate: number;
  GrosAmt: number = 0;
  Percentage: any = 0;
  Output: any;
  ExsisType: any;
  discoutType :any;
  discount: number =0;
  discountField :number = 0 ;
  TaxAmt: number = 0;  
}
