export default function tokenizeNode(node) {
  const tokens = [];

  if (node.nodeName === "IMG" && node.hasAttribute("src")) {
    tokens.push({
      type: "inline-embed-node",
      payload: {
        "inline-image": node.getAttribute("src")
      }
    });

    if (node.hasAttribute("alt")) {
      tokens.push({
        type: "inline-style",
        payload: {
          alt: node.getAttribute("alt")
        }
      });
    }
  }

  return tokens;
}
