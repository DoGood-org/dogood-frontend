export default function template(
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) {
  return tpl`
    ${imports}
    ${interfaces}
    const ${componentName} = (${props}) => ${jsx};
    ${exports}
  `;
}
