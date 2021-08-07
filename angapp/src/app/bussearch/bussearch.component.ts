import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from '../shared.service';
import { Bus } from '../bus';
import { Busdetails } from '../busdetails';

@Component({
  selector: 'app-bussearch',
  templateUrl: './bussearch.component.html',
  styleUrls: ['./bussearch.component.css']
})
export class BussearchComponent implements OnInit, AfterViewInit {

  city1 = ['', 'Arunachal Pradesh', 'Nagaland', 'Manipur', 'Imphal', 'Assam'];
  default: string = "";
  city2 = ['', 'Nagaland', 'Assam', 'Manipur', 'Arunachal Pradesh', 'Imphal']

  visible: boolean;
  search: boolean;
  buses = [
    {
      'busType': 'Asia Line',
      'departure': '11:00PM',
      'arrival': '10:00PM',
      'date': '30/06/2021',
      'availableSeats': '30',
      'fare': '600'
    },
    {
    'busType': 'Royal Exclusive',
    'departure': '04:30PM',
    'arrival': '03:00PM',
    'date': '30/06/2021',
    'availableSeats': '30',
    'fare': '700'
    }
  ]
  selectedbus: any;
  date: any;
  array: Bus[];

  constructor(private router: Router, private service: SharedService) { }

  searchForm = new FormGroup({
    leavingFrom: new FormControl(''),
    goingTo: new FormControl(''),
    departingOn: new FormControl('')
  });

  get leavingFrom() {
    return this.searchForm.controls['leavingFrom'];
  }
  get goingTo() {
    return this.searchForm.controls['goingTo'];
  }
  get departingOn() {
    return this.searchForm.controls['departingOn'];
  }

  isSourceAndDestinationSame(): boolean {
    if (this.searchForm.controls['leavingFrom'].value === this.searchForm.controls['goingTo'].value) {
      return true;
    }
    return false;
  }

  submit() {
    if (this.isSourceAndDestinationSame()) return;
    this.visible = true;
    this.searchForm.controls['leavingFrom'].disable();
    this.searchForm.controls['goingTo'].disable();
    this.searchForm.controls['departingOn'].disable();

    let location1 = this.searchForm.value.leavingFrom;
    let location2 = this.searchForm.value.goingTo;

    this.service.busDetails().subscribe((busdetails: Busdetails) => {
      this.array = [];
      for (let businfo of busdetails.bus) {

        if (businfo.leavingFrom === location1 && businfo.goingTo === location2) {
          this.array.push(businfo);
        }
      }
      console.log(this.array)
      this.date = this.searchForm.value.departingOn;
    });
  }



  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("dateField").setAttribute('min', today);
  }

  seats(booking: any) {
    this.search = true;
    this.selectedbus = { _id: booking._id, busType: booking.busType, departingOn: this.date, fare: booking.fare, leavingFrom: this.searchForm.value.leavingFrom, goingTo: this.searchForm.value.goingTo, reservedSeats: booking.reservedSeats, availableSeats: booking.availableSeats }
    console.log(this.selectedbus)
    this.router.navigate(['/seatselection'], { queryParams: { selectedbus: JSON.stringify(this.selectedbus) } });

  }

  clear() {
    this.searchForm.reset();
    this.edit();
  }

  edit() {
    this.visible = !this.visible;
    Object.keys(this.searchForm.controls).map(key => this.searchForm.controls[key].enable());
  }
}

