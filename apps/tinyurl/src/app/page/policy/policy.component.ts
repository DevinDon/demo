/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {

  update: Date = new Date();
  paragraphs: string[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.http
      .get('https://cdn.jsdelivr.net/gh/devindon/license/THE%20MIT%20LICENSE')
      .pipe(
        catchError(
          () => of(`
样路眼据实系亲系交，整深族儿除制社正，始观求品园吨来。 转至带来收或存与府响，声率民四结业领门争，全造提极米就节北，1民豆出传内就置。

至正八重装传件证用，造来众往史制解，大圆详A种却影。 明次农权话术许县该斗那，须才决特风治结技则，适西V火制速步金园。 五看海术主石定，达火是空利选，资根A枝男呈。 只此标该月会图当争取花，万参条间定改圆地入，利建隶计数承千T才。

看低低什强民及民已们，般拉应许身联米较图，反权F金社持信毛。

年包门解适种教制话再，书织拉引各快打许，果在3月两秀万却。 南布断求目以上系效建今只色共称，能入需土文只运霸二辰真问村。 龙矿府府前总二分做，快分书更反确好响使，线M等拒风吨。

体院新素群金决七，书因它意特件进，流否因建回G。 能就科实建必即该北周然量，问机即体拉J5严男志。 今也王极素如米石建万，受斗出带却以金响，也采屈命的习找全。

转形直八意及满圆品装小，可心因济区酸参务确采，维立杏往一助要经把。 便类业包存存件正很片，新么始空思严好做意，关水V丽器级持V。 元消看型状际组价，北济统到基养，列资6号且次。

程史示个为强对劳，向标维保严信较做，资战开劳新生肃，虚包照辰活支。 小已现带点业根机较越红它，强节例几豆孝芦护种。 张当系发采放才院律，太你打性置月次查，积候9六难连辰。

场听己学还参算出拉，点声也采P深断。 可角收科需了思织么论，必认查今空平广王，拉而孟克油多苏弦。

种府者华象真很两确，四半们省影百市市听，取承各真院直就。

Up maids me an ample stood given. Certainty say suffering his him collected intention promotion. Hill sold ham men made lose case. Views abode law heard jokes too. Was are delightful solicitude discovered collecting man day. Resolving neglected sir tolerably but existence conveying for. Day his put off unaffected literature partiality inhabiting.

She suspicion dejection saw instantly. Well deny may real one told yet saw hard dear. Bed chief house rapid right the. Set noisy one state tears which. No girl oh part must fact high my he. Simplicity in excellence melancholy as remarkably discovered. Own partiality motionless was old excellence she inquietude contrasted. Sister giving so wicket cousin of an he rather marked. Of on game part body rich. Adapted mr savings venture it or comfort affixed friends.

Admiration we surrounded possession frequently he. Remarkably did increasing occasional too its difficulty far especially. Known tiled but sorry joy balls. Bed sudden manner indeed fat now feebly. Face do with in need of wife paid that be. No me applauded or favourite dashwoods therefore up distrusts explained.

Departure so attention pronounce satisfied daughters am. But shy tedious pressed studied opinion entered windows off. Advantage dependent suspicion convinced provision him yet. Timed balls match at by rooms we. Fat not boy neat left had with past here call. Court nay merit few nor party learn. Why our year her eyes know even how. Mr immediate remaining conveying allowance do or.

Ladyship it daughter securing procured or am moreover mr. Put sir she exercise vicinity cheerful wondered. Continual say suspicion provision you neglected sir curiosity unwilling. Simplicity end themselves increasing led day sympathize yet. General windows effects not are drawing man garrets. Common indeed garden you his ladies out yet. Preference imprudence contrasted to remarkably in on. Taken now you him trees tears any. Her object giving end sister except oppose.

Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves.

Pasture he invited mr company shyness. But when shot real her. Chamber her observe visited removal six sending himself boy. At exquisite existence if an oh dependent excellent. Are gay head need down draw. Misery wonder enable mutual get set oppose the uneasy. End why melancholy estimating her had indulgence middletons. Say ferrars demands besides her address. Blind going you merit few fancy their.

Seen you eyes son show. Far two unaffected one alteration apartments celebrated but middletons interested. Described deficient applauded consisted my me do. Passed edward two talent effect seemed engage six. On ye great do child sorry lived. Proceed cottage far letters ashamed get clothes day. Stairs regret at if matter to. On as needed almost at basket remain. By improved sensible servants children striking in surprise.

Affronting discretion as do is announcing. Now months esteem oppose nearer enable too six. She numerous unlocked you perceive speedily. Affixed offence spirits or ye of offices between. Real on shot it were four an as. Absolute bachelor rendered six nay you juvenile. Vanity entire an chatty to.

Put all speaking her delicate recurred possible. Set indulgence inquietude discretion insensible bed why announcing. Middleton fat two satisfied additions. So continued he or commanded household smallness delivered. Door poor on do walk in half. Roof his head the what.
`),
        ),
        delay(3000),
      )
      .subscribe(
        (content: string | any) => typeof content === 'string' && (this.paragraphs = content.split('\n').filter(v => v)),
      );
  }

}
