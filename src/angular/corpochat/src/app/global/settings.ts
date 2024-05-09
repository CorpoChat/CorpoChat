export class Settings {
    static isMobile: boolean = false;

    static updateDevice(newValue: boolean) {
        this.isMobile = newValue;
    }
}