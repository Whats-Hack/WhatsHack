export function isLink(str) {
  // Regular expression pattern to match URLs
  const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

  // Test if the string matches the URL pattern
  return urlPattern.test(str);
}

// const images = ['jpg', 'jpeg', 'png', 'gif'];

export function isImageURL(url) {
  // Regular expression pattern to match URLs
  const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;

  return imageExtensions.test(url);
}
