export function isLink(str) {
  // Regular expression pattern to match URLs
  var urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

  // Test if the string matches the URL pattern
  return urlPattern.test(str);
}
