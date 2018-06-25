export default (hyphenCaseString) => hyphenCaseString.split(`-`).map(string => string.slice(0, 1).toUpperCase() + string.slice(1)).join('');
