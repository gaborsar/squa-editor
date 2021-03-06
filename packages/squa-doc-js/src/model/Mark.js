import Pool from "./Pool";

const pool = new Pool();

export default class Mark {
    static create(props) {
        return pool.recycle(new Mark(props), Mark.equals);
    }

    static equals(markA, markB) {
        return markA.name === markB.name && markA.value === markB.value;
    }

    static compare(markA, markB) {
        if (markA.name < markB.name) {
            return -1;
        }
        if (markA.name > markB.name) {
            return 1;
        }
        if (markA.value < markB.value) {
            return -1;
        }
        if (markA.value > markB.value) {
            return 1;
        }
        return 0;
    }

    constructor({ name, value }) {
        this.name = name;
        this.value = value;
    }
}
