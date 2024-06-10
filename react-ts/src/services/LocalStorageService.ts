export class LocalStorageService {

    public setItem(field: string, item: string) {
        localStorage.setItem(field, item)
    }


}