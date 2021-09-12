import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { AboutContactComponent } from './about-contact/about-contact.component';

interface Event {
  date: number | Date;
  title: string;
  content: string;
}

@Component({
  selector: 'demo-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  public events: Event[] = [
    { date: new Date('2016-07-05'), title: '第一台电脑', content: '抱着自己的第一台电脑，日夜不眠。' },
    { date: new Date('2016-09-01'), title: '开启大学生活', content: '第一次踏上大学校园，满心欢喜、小鹿乱撞。' },
    { date: new Date('2017-01-02'), title: '第一个程序', content: '写出了第一个有着完整功能的 C 语言程序，兴奋至极。' },
    { date: new Date('2017-09-15'), title: '第一台服务器', content: '从阿里云上租了第一台学生服务器，从此踏上云端之路，一发不可收拾。' },
    { date: new Date('2018-08-02'), title: '第一个开源项目', content: '重新步入 GitHub，正式开启全新的开源之旅，为技术界添砖加瓦。' },
    { date: new Date('2019-07-10'), title: '第一个博客', content: '做出了自己梦了三年的个人博客，完全自主实现，不套用其他模板。' },
    { date: new Date('2020-01-01'), title: '展望未来', content: '生命不息，学习不止。' }
  ];

  public mottos: string[] = [
    '从善如登，从恶如崩。',
    '宠辱不惊，悲喜无鸣。',
    '但行好事，莫问前程。'
  ];

  constructor(
    public app: AppService
  ) { }

  nextPage() {
    this.app.scrollToBottom(window.innerHeight);
  }

  openDialog(name: string) {
    this.app.dialog.open(AboutContactComponent, { data: name });
  }

}
