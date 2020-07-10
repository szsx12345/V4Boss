import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable()
export class SpreadSheet {
  data: any = null;

  constructor(public http: HttpClient) { }

  public getItems(): Observable<any> {
    const sheetId = '1nakyOGLbVtO7jk2q7rxz_16oJ5cmudw9av97mMMCWM8';
    const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;

          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach(entry => {
              const obj = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }
          return returnArray;
        })
      );
  }
}
