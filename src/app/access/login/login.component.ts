import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from 'arvan/state';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'arvan-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  waiting$!: Observable<boolean | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private appState: Store<fromRoot.AppState>
  ) {
    this.form = this.generateForm();
  }

  ngOnInit(): void {
    this.waiting$ = this.appState.select(fromRoot.selectAuthWaiting);
  }

  generateForm() {
    return this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.appState.dispatch(fromRoot.loginUser(this.form.value));
  }
}
