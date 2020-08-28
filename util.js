// Creates a RegExp from the given string, converting asterisks to .* expressions,
// and escaping all other characters. 
function wildcardToRegExp (s) {
  return RegExp(s.split(/\*+/).map(regExpEscape).join('.*') + '$');
}

// RegExp-escapes all characters in the given string.
function regExpEscape (s) {
  return s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}



module.exports = {
	"wildcardToRegExp":wildcardToRegExp
}

