import { createKey } from "../Keys";

const NodeMixin = {
  getKey() {
    return this.key;
  },

  setKey(key) {
    return this.merge({ key });
  },

  regenerateKey() {
    return this.setKey(createKey());
  }
};

export default NodeMixin;
