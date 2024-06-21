import {Injectable, signal} from "@angular/core";

export enum Theme {
  Dark = "dark",
  Light = "light"
}

@Injectable({
  providedIn: "root",
})
export class ThemeService {

  themeSignal = signal<Theme>(window.localStorage.getItem('theme') as Theme || Theme.Dark);


  updateTheme() {
    const newTheme = this.themeSignal() === Theme.Dark ? Theme.Light : Theme.Dark;
    window.localStorage.setItem('theme', newTheme);
    this.themeSignal.set(newTheme);
  }
}
