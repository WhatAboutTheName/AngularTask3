import { of, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Stream } from '../interface/stream.interface';

@Injectable({
    providedIn: 'root',
})

export class StreamService {
    createOtherStream(stream: Stream) {
        return of(stream);
    }

    createStream(streamId: number, period: number) {
        const source = interval(period);
        return source.pipe(
        map(inc => {
            return { streamId: streamId, id: inc + 1 };
        }),
        );
    }
}
  