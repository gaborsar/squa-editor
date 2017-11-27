"use strict";

import Schema from "./Schema";
import Style from "./Style";
import createKey from "./utils/createKey";
import nodeMixin from "./mixins/node";
import leafMixin from "./mixins/leaf";
import formatMixin from "./mixins/format";

export default class Embed {
  static create(props = {}) {
    const {
      schema = new Schema(),
      key = createKey(),
      style = Style.create(),
      value = {}
    } = props;
    return new Embed(schema, key, style, value);
  }

  static type(value) {
    return Object.keys(value)[0];
  }

  constructor(schema, key, style, value) {
    this.schema = schema;
    this.key = key;
    this.style = style;
    this.value = value;
  }

  merge(props) {
    return Embed.create(
      Object.assign(
        {
          schema: this.schema,
          key: this.key,
          style: this.style,
          value: this.value
        },
        props
      )
    );
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

  toJSON() {
    return {
      style: this.style.toJSON(),
      value: this.value
    };
  }

  format(attributes) {
    return this.setStyle(
      this.style.update(attributes, type =>
        this.schema.isEmbedMark(this.type, type)
      )
    );
  }

  formatAt(offset, length, attributes) {
    if (offset === 0 && length === 1) {
      return this.format(attributes);
    }
    return this;
  }

  normalize() {
    return this;
  }
}

nodeMixin(Embed);
leafMixin(Embed);
formatMixin(Embed);
