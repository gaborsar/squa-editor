import Delta from "quill-delta";
import NodeType from "./NodeType";
import SpecialCharacter from "./SpecialCharacter";
import NodeMixin from "./NodeMixin";
import FormatMixin from "./FormatMixin";
import ParentMixin from "./ParentMixin";
import ListIterator from "./ListIterator";
import findPosition from "./findPosition";
import createRange from "./createRange";
import applyMixins from "./applyMixins";
import { addLength, concatText, concatDelta } from "./Reducers";

export default class Row {
    _length = 0;
    _text = "";
    _delta = null;

    constructor(schema, key, style, children) {
        this.schema = schema;
        this.key = key;
        this.style = style;
        this.children = children;
    }

    get type() {
        return NodeType.Row;
    }

    get length() {
        if (this._length === 0) {
            this._length = this.children.reduce(addLength, 1);
        }
        return this._length;
    }

    get text() {
        if (this._text === "") {
            this._text =
                SpecialCharacter.RowStart +
                this.children.reduce(concatText, "");
        }
        return this._text;
    }

    get delta() {
        if (this._delta === null) {
            this._delta = this.children.reduce(
                concatDelta,
                new Delta().insert(
                    SpecialCharacter.RowStart,
                    this.getAttributes()
                )
            );
        }
        return this._delta;
    }

    merge(props) {
        return this.schema.createRow({ ...this, ...props });
    }

    iterator() {
        return new ListIterator(
            [
                this.schema.createRowStart({
                    key: this.key,
                    style: this.style
                })
            ].concat(this.children)
        );
    }

    isValidMark(name) {
        return this.schema.isRowMark(name);
    }

    findChildAtOffset(offset) {
        return findPosition(this.children, offset - 1, false);
    }

    findChildrenAtRange(offset, length) {
        return createRange(this.children, offset - 1, length - 1);
    }

    optimize() {
        return this.children.length === 0
            ? this.setChildren([this.schema.createCell()])
            : this;
    }
}

applyMixins(Row, NodeMixin, FormatMixin, ParentMixin);
