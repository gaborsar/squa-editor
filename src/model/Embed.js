import Delta from "quill-delta";
import Style from "./Style";
import Node from "./Node";
import LeafMixin from "./mixins/Leaf";
import FormatMixin from "./mixins/Format";
import createKey from "./utils/createKey";
import defaultSchema from "../plugins/schema";

export default class Embed extends FormatMixin(LeafMixin(Node)) {
  static create(props = {}) {
    return new Embed(props);
  }

  static type(value) {
    return Object.keys(value)[0];
  }

  constructor(props = {}) {
    const {
      schema = defaultSchema,
      key = createKey(),
      style = Style.create(),
      value = {}
    } = props;

    super(schema, key);

    this.style = style;
    this.value = value;
  }

  merge(props) {
    return Embed.create({ ...this, ...props });
  }

  get kind() {
    return "embed";
  }

  get type() {
    return Embed.type(this.value);
  }

  get length() {
    return 1;
  }

  get text() {
    return "*";
  }

  get delta() {
    return new Delta().insert(this.value, this.style.toObject());
  }

  format(attributes) {
    const style = this.style.update(attributes, type =>
      this.schema.isEmbedMark(this.type, type)
    );
    return this.setStyle(style);
  }

  formatAt(offset, length, attributes) {
    return offset === 0 && length === 1 ? this.format(attributes) : this;
  }
}
