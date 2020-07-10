import { Component } from '@angular/core';
import { SpreadSheet } from './services/SpreadSheet.service';
import * as momentNS from 'moment-timezone';
const moment = momentNS;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SpreadSheet ]
})
export class AppComponent {
  title = 'V4Boss';
  spreadSheetData = [];

  constructor(spreadSheet: SpreadSheet) {
    spreadSheet.getItems()
      .subscribe(
        data => this.spreadSheetData = data
      );
  }

  onClickMe(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    const cooldownTime = (String)(this.spreadSheetData[value].cooldowntime).split(':');
    const cooldownHour = cooldownTime[0];
    const cooldownMiniute = cooldownTime[1];
    const date = new Date();
    const formattedDate = moment()
    .tz(Date.now.toString()).add(cooldownHour, 'h').add(cooldownMiniute, 'minute')
    .format('HH:mm');
    this.spreadSheetData[value].deathtime = formattedDate;
  }
}
