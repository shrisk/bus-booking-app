import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { SeatselectionComponent } from '../seatselection/seatselection.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [SeatselectionComponent]
})
export class PaymentComponent implements OnInit {

  selectedbus: any;
  onPay:boolean;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035",];
  transactionId = Math.random().toString(8).substr(2, 6);

  form = new FormGroup({
    cardtype: new FormControl('', [Validators.required
    ]),
    cardnumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{16}$"),
    ]),
 cardname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),

    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{3}$"),
    ]),
expiry: new FormControl('', Validators.required),

  })

  get cardnumber() {
    return this.form.controls['cardnumber'];
  }

  get cardname() {
    return this.form.controls['cardname'];
  }
get cvv() {
    return this.form.controls['cvv'];
  }

  get expiry() {
    return this.form.controls['expiry'];
  }
 
  constructor(private router: Router, private route:ActivatedRoute, private service:SharedService) { }

  ngOnInit(): void {
    this.selectedbus = this.service.selectedbus.value;
  }
 submit(){
   this.onPay=true;
   this.selectedbus={_id:this.selectedbus?._id,passangername:this.selectedbus.passangername,availableSeats:this.selectedbus.availableSeats,bookedSeats:this.selectedbus.bookedSeats,pay:this.selectedbus.pay,busType:this.selectedbus.busType,leavingFrom:this.selectedbus.leavingFrom,goingTo:this.selectedbus.goingTo,departingOn:this.selectedbus.departingOn}
   this.service.selectedbus.next(this.selectedbus);
   this.router.navigate(['/confirmation'],{queryParams:{selectedbus:JSON.stringify(this.selectedbus)}});
  this.service.updateDetails({_id: this.selectedbus._id, bookedSeats : this.selectedbus.bookedSeats, availableSeats:this.selectedbus.availableSeats})
 .subscribe(res=>{
    console.log(res);
  })
}
}
