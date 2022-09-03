import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from 'arvan/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'arvan-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  waiting$!: Observable<boolean | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private appStore: Store<fromRoot.AppState>
  ) {
    this.form = this.generateForm();
  }

  ngOnInit(): void {
    this.waiting$ = this.appStore.select(fromRoot.selectAuthWaiting);
  }

  generateForm() {
    return this.formBuilder.group({
      username: [undefined, Validators.required],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.appStore.dispatch(fromRoot.registerUser(this.form.value));
  }
}
