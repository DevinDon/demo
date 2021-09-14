import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, finalize } from 'rxjs/operators';
import { Link } from 'src/app/@types';
import { ApiService } from 'src/app/service/api.service';
import { CacheService } from 'src/app/service/cache.service';
import { ButtonText, Icon, isInvalidURL, isLongURL, isShortURL, REG_IS_VALID_URL, Tip } from 'src/app/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  icon: Icon = Icon.invalid;
  tip: Tip = Tip.invalid;
  button: ButtonText = ButtonText.shorten;
  loading = false;
  form: FormGroup;

  link?: Link;

  constructor(
    private api: ApiService,
    private bar: MatSnackBar,
    private cache: CacheService,
  ) {
    this.form = new FormGroup({
      url: new FormControl(
        undefined,
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(4096),
          // url pattern
          Validators.pattern(REG_IS_VALID_URL),
        ],
      ),
    });
  }

  ngOnInit() { }

  onInput() {
    const url = this.form.get('url')?.value;
    if (isInvalidURL(url)) {
      // 未输入或输入的不是 URL
      this.icon = Icon.invalid;
      this.tip = Tip.invalid;
      this.button = ButtonText.invalid;
    } else if (isLongURL(url)) {
      // 输入的是外链
      this.icon = Icon.link;
      this.tip = Tip.shorten;
      this.button = ButtonText.shorten;
    } else if (isShortURL(url)) {
      // 输入的是短链
      this.icon = Icon.copy;
      this.tip = Tip.restore;
      this.button = ButtonText.restore;
    }
  }

  copy() {
    this.input.nativeElement.select();
    document.execCommand('copy');
    this.bar.open('Link has been copied.', 'OK', { duration: 3000, horizontalPosition: 'end' });
  }

  submit() {
    this.loading = true;
    const url = this.form.get('url')?.value;
    this.api
      .transform({ url })
      .pipe(
        delay(1000),
        catchError(error => {
          this.bar.open('URL shorten failed', 'OK');
          throw error;
        }),
        finalize(() => this.loading = false),
      )
      .subscribe(({ id, origin }: Link) => {
        if (isLongURL(url)) { // 输入的是外链
          this.form.setValue({ url: `https://${this.cache.getDomain()}/${id}` });
        } else if (isShortURL(url)) { // 输入的是短链
          this.form.setValue({ url: origin });
        }
        this.copy();
        this.onInput();
      });
  }

}
