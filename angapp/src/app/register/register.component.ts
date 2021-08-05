import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SharedService]
})
export class RegisterComponent {
  registerPostData: any = {}
  constructor(public service: SharedService) { }


  form = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
    Mobile_Number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[\\d]*')]),
    Email_id: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern('[a-zA-Z\\d@._!#$%^&*()-=+{}",]*')]),
    DOB: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })

  get Name() {
    return this.form.controls['Name'];
  }
  get Mobile_Number() {
    return this.form.controls['Mobile_Number'];
  }
  get Email_id() {
    return this.form.controls['Email_id'];
  }
  get Password() {
    return this.form.controls['Password'];
  }
  get DOB() {
    return this.form.controls['DOB'];
  }

  registered: boolean
  submit: any
  save(form: FormGroup) {
    // console.log(this.form.controls['Name']);
    this.registered = true;
    this.submit = "Details submitted succesfully!"
    // setTimeout(() => this.submit = "", 4000);
    // form.reset();
    if (this.submit === "") {
      this.registered = false;
    }

    // console.log("Form Succesfully submitted");
    // console.log(this.form.value);
    this.service.registerPost({
      name: this.form.value.Name,
      email: this.form.value.Email_id,
      mobileno: Number(this.form.value.Mobile_Number),
      password: this.form.value.Password,
      dob: this.form.value.DOB,

    })
      .subscribe(res => {
        console.log(res);
      })
    err => {
      console.log(err);
    }
  }



}