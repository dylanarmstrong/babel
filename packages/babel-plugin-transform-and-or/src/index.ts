import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-and-or",

    visitor: {
      LogicalExpression(path) {
        const { node } = path;
        if (node.operator === "and") {
          path.replaceWith(
            t.logicalExpression(
              "&&",
              t.cloneNode(node.left),
              t.cloneNode(node.right),
            ),
          );
        } else if (node.operator === "or") {
          path.replaceWith(
            t.logicalExpression(
              "||",
              t.cloneNode(node.left),
              t.cloneNode(node.right),
            ),
          );
        }
      },
    },
  };
});
