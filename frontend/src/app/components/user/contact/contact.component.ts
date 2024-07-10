import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form!:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  this.form = this.formBuilder.group({
    name: [''],
    email: [''],
    message: ['']
  });
  
  }

  validEmail = (email:any) => {
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email.match(validRegex)){
      return true;
    }else{ 
      return false;}
  }

  contact(){

    let contact = this.form.getRawValue();
    console.log(contact)

  if(contact.name == '' || contact.email == '' || contact.message == ''){
    Swal.fire('Error', 'Please fill all the fields', 'error');
  }else if(!this.validEmail(contact.email)){
    Swal.fire('Error', 'Please enter a valid Email', 'error')
  } else {
    this.http.post(`http://localhost:3000/api/v1/contacts`, contact )
    .subscribe(() => {
      Swal.fire('Success', 'Message sent successfully', 'success');
      this.router.navigate(['/']);
    })
  }  
}
  }
  
