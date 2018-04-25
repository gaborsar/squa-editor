import createId from "./createId";

export default function renderNode(node) {
  switch (node.getAttribute("type")) {
    case "heading-one":
      return {
        component: "h1",
        props: {
          id: createId(node.getText())
        }
      };

    case "heading-two":
      return {
        component: "h2",
        props: {
          id: createId(node.getText())
        }
      };

    case "heading-three":
      return {
        component: "h3",
        props: {
          id: createId(node.getText())
        }
      };

    case "heading-four":
      return {
        component: "h4",
        props: {
          id: createId(node.getText())
        }
      };

    case "heading-five":
      return {
        component: "h5",
        props: {
          id: createId(node.getText())
        }
      };

    case "heading-six":
      return {
        component: "h6",
        props: {
          id: createId(node.getText())
        }
      };
  }
}
