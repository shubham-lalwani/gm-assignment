import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from './config.service';
import { FormElements } from './gmForm.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public jsonData: FormElements[];
  dynamicForm: FormGroup;
  submitted: boolean = false;
  constructor(private configService: ConfigService) {}

  ngOnInit() {
    const controls = {};
    this.configService.getData().subscribe((data: FormElements[]) => {
      this.jsonData = data;
      this.jsonData.forEach((val) => {
        if (val.type != 'check') {
          // if it text field validate mandatory
          const validations = [];
          if (val.mandatory) {
            validations.push(Validators.required);
          }
          controls[val.field] = new FormControl('', validations);
        } else {
          // if it check field then add requiredTrue
          controls[val.field] = new FormControl(false, Validators.requiredTrue);
        }
      });
      this.dynamicForm = new FormGroup(controls);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    }
  }
}
