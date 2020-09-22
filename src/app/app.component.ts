import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'strapi-upload';

  form: FormGroup;
  file: File = null;

  constructor(private data: DataService) {}

  ngOnInit(): any {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      resume: new FormControl('', [Validators.required]),
      identityNumber: new FormControl('', [Validators.required]),
    });
  }

  onFileChange(event): any {
    if (event.target.files && event.target.files.length) {
      this.file = (event.target as HTMLInputElement).files[0];
    }
  }

  submit(form: FormGroup): any {
    form.value.resume = [];
    this.data.sendUserData(form.value).toPromise().then((res) => {
      this.data.upload(this.file,
        {
        refId: res.id,
        field: 'resume',
        ref: 'application',
      }).toPromise().then((doc: any) => {
        console.log(doc);
      }).catch(err => {
        console.log(err.message);
      });
    }).catch(err => {
      console.log(err.message);
    });
  }
}
