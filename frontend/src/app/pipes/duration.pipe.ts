import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): any {
    const seconds = Math.floor(value % 60);
    const minutes = Math.floor((value / 60) % 60);
    const hours = Math.floor(value / 60 / 60);

    return this.format(seconds, minutes, hours);
  }

  private format(seconds, minutes, hours) {
    hours < 10 ? (hours = '0' + hours) : hours;
    minutes < 10 ? (minutes = '0' + minutes) : minutes;
    seconds < 10 ? (seconds = '0' + seconds) : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}
