import { Injectable, signal } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ThemeService {

	themeSignal = signal<string>(window.localStorage.getItem('theme') || "dark");

	setTheme(theme: string) {
    window.localStorage.setItem('theme', theme);
		this.themeSignal.set(theme);
	}

	updateTheme() {
    window.localStorage.setItem('theme', this.themeSignal() === "dark" ? "light" : "dark");
		this.themeSignal.update((value) => (value === "dark" ? "light" : "dark"));
	}
}
