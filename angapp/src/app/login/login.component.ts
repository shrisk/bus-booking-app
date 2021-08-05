import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Data} from '@angular/router';
import { FormControl,FormGroup,Validators } from "@angular/forms";
import { SharedService } from '../shared.service';
import { register } from '../register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[SharedService]
})
export class LoginComponent implements OnInit{

  public response:register[];
  constructor( private router : Router, public service:SharedService) { }
 ngOnInit(){}
  signinform = new FormGroup({
  Emailid : new FormControl('', [Validators.required,Validators.minLength(12),Validators.maxLength(50),Validators.email]),
  Pass_word : new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(50),Validators.pattern('[a-zA-Z\\d@._!#$%^&*()-=+{}",]*')]),
})
get Emailid(){
  return this.signinform.controls['Emailid'];
}
get Pass_word(){
  return this.signinform.controls['Pass_word'];
}
/*toCheck(){
  console.log(this.signinform.value);
  
}*/
error:any
err:boolean
toCheck(){
  console.log(this.signinform);

  this.error="User with these credentials were not registered"
  let a=this.signinform.value.Emailid;
  let b=this.signinform.value.Pass_word;
  this.service.loginGet().subscribe((data:Data)=>{
    let c = data.register.find((register:any)=>register.email===a && register.password===b)
    if(c){
    //navigate by url
   console.log(c);
  this.router.navigateByUrl('/bussearch')
   console.log(a);
    }
    else{
      this.err=true
     console.log("error");
    }
})
}
  
 
}


