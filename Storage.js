export default class Storage {

    static get() {
        return JSON.parse(localStorage.getItem("transactions")) || [];
    }

    static save(data) {
        localStorage.setItem("transactions", JSON.stringify(data));
    }
}