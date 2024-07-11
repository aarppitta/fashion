import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      email:'',
      password:'',
    });
  }

  validateEmail(email: string) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (email.match(validRegex)) {
      return true;
    }else{
      return false;
    }
  }

  register(){
    let user = this.form.getRawValue();
    console.log(user);

    if(user.name == '' || user.gender == '' || user.email == '' || user.password == ''){
      swal.fire('Error', 'Please fill all the fields', 'error');
      return;
    }
    else if(!this.validateEmail(user.email)){
      swal.fire('Error', 'Please enter a valid email', 'error');
    }
    else{
      this.http.post(`https://fashion-frontend-liard.vercel.app/api/v1/users/register`, user,{ withCredentials:true }).subscribe(() => {
        this.router.navigate(['/login']),(err: any) => {
          swal.fire('Error', err.error.message, 'error');
        }
      })
    }
  }

}
