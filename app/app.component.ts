import { Component } from '@angular/core';
import { merge, timer } from 'rxjs';
import { tap, takeUntil, exhaustMap, skipUntil } from 'rxjs/operators';
import { StreamService } from '../service/stream.service';
import { Stream } from '../interface/stream.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  sumStreamId: number = 0;
  firstArr = [];
  secondArr = [];
  thirdArr = [];;

  constructor(private streamService: StreamService) {}

  start() {
    merge(
      this.streamService
        .createStream(1, 1000)
        .pipe(tap((stream: Stream) => console.log('stream1', this.firstArr.push(stream.id)))),
      this.streamService.createStream(2, 1500).pipe(
        skipUntil(timer(10000)),
        tap((stream: Stream) => console.log('stream2', this.secondArr.push(stream.id))),
      ),
      this.streamService.createStream(3, 2000).pipe(
        skipUntil(timer(20000)),
        tap((stream: Stream) => console.log('stream3', this.thirdArr.push(stream.id))),
      ),
    )
    .pipe(
      takeUntil(timer(30000)),
      exhaustMap((stream: Stream) => this.streamService.createOtherStream(stream)),
      tap((stream: Stream) => (this.sumStreamId += stream.id)),
    )
    .subscribe();
  }
}