import { Component, ViewChild, ElementRef  } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [PaymentComponent]
})

export class ConfirmationComponent {
  selectedbus: any;
  constructor(private router: Router, private route:ActivatedRoute, private service: SharedService) { }

  ngOnInit(): void {
    this.selectedbus= this.service.selectedbus.value;
    localStorage.setItem('selectedbus', JSON.stringify(this.selectedbus));
  }
  @ViewChild('pdfTable') pdfTable: ElementRef;
  //PDF genrate button click function
  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    
    this.selectedbus={_id:this.selectedbus._id,passangername:this.selectedbus.passangername,availableSeats:this.selectedbus.availableSeats,bookedSeats:this.selectedbus.bookedSeats,pay:this.selectedbus.pay,busType:this.selectedbus.busType,leavingFrom:this.selectedbus.leavingFrom,goingTo:this.selectedbus.goingTo,departingOn:this.selectedbus.departingOn}
  
  
  }
  
  
  
}
