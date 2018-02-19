import createKey from "./utils/createKey";

export default class Node {
  constructor(schema, key = createKey()) {
    this.schema = schema;
    this.key = key;
  }

  merge() {
    throw new Error("missing method");
  }

  setKey(key = createKey()) {
    return this.merge({ key });
  }

  regenerateKey() {
    return this.setKey();
  }
}
