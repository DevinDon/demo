import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'demo-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.scss'],
})
export class AboutContactComponent {

  public image = '';

  public link = '';

  public title = '扫一扫了解更多';

  constructor(
    @Inject(MAT_DIALOG_DATA) public name: string,
  ) {
    switch (name) {
      case 'github':
        this.image = 'assets/qrcode/github.png';
        this.link = 'https://github.com/DevinDon';
        this.title = '扫一扫查看 GitHub';
        break;
      case 'email':
        this.image = 'assets/qrcode/email.png';
        this.link = 'mailto:I.INF@Outlook.com';
        this.title = '扫一扫发送邮件';
        break;
      case 'linkedin':
        this.image = 'assets/qrcode/linkedin.png';
        this.link = 'https://www.linkedin.com/in/devin-don-29bba216a/';
        this.title = '扫一扫添加 领英';
        break;
      case 'wechat':
        this.image = 'assets/qrcode/wechat.jpg';
        this.link = 'https://u.wechat.com/EEJ48QfP2wR3zlKNxHOTIBQ';
        this.title = '扫一扫添加微信';
        break;
      case 'twitter':
        this.image = 'assets/qrcode/wechat.jpg';
        this.link = 'https://u.wechat.com/EEJ48QfP2wR3zlKNxHOTIBQ';
        this.title = '扫一扫添加 Twitter';
        break;
    }
  }

}
