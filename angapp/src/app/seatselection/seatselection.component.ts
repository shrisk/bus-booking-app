import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BussearchComponent } from '../bussearch/bussearch.component';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-seatselection',
  templateUrl: './seatselection.component.html',
  styleUrls: ['./seatselection.component.css'],
  providers: [BussearchComponent]
})
export class SeatselectionComponent implements OnInit {
  selectedbus: any;
  onSelect: boolean;
  bookingDetails: any;
  busFare: number;
  totalTax: number;
  totalFare: number;
  payment: any;
  seatNo: any;
  passengerNames: any[] = [];

  gender: string;
  //@Input() selectedbus:any;
  constructor(private route: ActivatedRoute, private router: Router, private service: SharedService) { }
  form = new FormGroup({
    Name: new FormControl(''),
    gender: new FormControl('male')
  })

  get Name() {
    return this.form.controls['Name'];
  }

  get Gender() {
    return this.form.controls['Gender'];
  }



  ngOnInit() {
    this.selectedbus = this.service.selectedbus.value;
    const bus = JSON.parse(localStorage.getItem('selectedbus'));
    if (this.selectedbus?.goingTo === bus.goingTo && this.selectedbus?.leavingFrom === bus.leavingFrom) {
      this.selectedbus.bookedSeats = bus.bookedSeats;
    }
  }
  pay(f: any) {
    this.passengerNames.push(this.Name.value);
    this.onSelect = true;
    this.selectedbus = { _id: this.selectedbus._id, passangername: this.passengerNames, availableSeats: this.selectedbus.availableSeats, bookedSeats: this.selectseat, pay: this.totalFare, busType: this.selectedbus.busType, leavingFrom: this.selectedbus.leavingFrom, goingTo: this.selectedbus.goingTo, departingOn: this.selectedbus.departingOn }
    this.service.selectedbus.next(this.selectedbus);
    this.router.navigate(['/payment'], { queryParams: { selectedbus: JSON.stringify(this.selectedbus) } });
  }

  checkIfValid() {
    return this.form.get('Name').value === '' || this.form.get('gender').value === '';
  }

  selectseat = []
  bus = {
    totalSeats: 36
  };
  seats = [...new Array(this.bus.totalSeats)].map((item, index) => {
    return {
      selected: false,
      seatNo: index + 1
    };
  });
  selectSeats(seatNo: any) {
    if (!this.selectedbus?.reservedSeats?.includes(seatNo)) {
      this.seats[seatNo - 1].selected = !this.seats[seatNo - 1].selected;
      if (this.selectseat.includes(seatNo)) {
        this.selectseat.splice(this.selectseat.indexOf(seatNo), 1)
      }
      else {
        if (this.selectseat.length !== 0) {
          this.passengerNames.push(this.Name.value);
        }
        this.selectseat.push(seatNo);
      }
    }

    this.busFare = this.selectedbus?.fare * this.selectseat.length;
    this.totalTax = this.busFare / 10;
    this.totalFare = this.busFare + this.totalTax;
  }


}
