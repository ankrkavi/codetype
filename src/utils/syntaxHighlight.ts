import { Language } from '../types';

export type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'type'
  | 'identifier'
  | 'default';

export interface CodeCharToken {
  char: string;
  index: number;
  line: number;
  col: number;
  tokenType: TokenType;
}

const CPP_KEYWORDS = new Set([
  'int', 'void', 'bool', 'char', 'double', 'float', 'auto', 'long', 'const', 'static',
  'class', 'struct', 'template', 'typename', 'public', 'private', 'protected',
  'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
  'using', 'namespace', 'explicit', 'noexcept', 'delete', 'operator', 'true', 'false',
  'nullptr', 'include', 'sizeof', 'std', 'vector', 'string', 'stack', 'queue', 'array'
]);

const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'interface', 'record', 'static', 'final',
  'void', 'int', 'boolean', 'char', 'double', 'float', 'long', 'byte', 'short',
  'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
  'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'import',
  'package', 'true', 'false', 'null', 'synchronized', 'override', 'extends', 'implements'
]);

export function tokenizeCode(code: string, language: Language): CodeCharToken[] {
  const tokens: CodeCharToken[] = [];
  const lines = code.split('\n');

  let globalIndex = 0;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineText = lines[lineIdx];
    let col = 0;

    while (col < lineText.length) {
      const rest = lineText.slice(col);
      const ch = lineText[col];

      // Comments (// or #include)
      if (rest.startsWith('//')) {
        const commentLength = lineText.length - col;
        for (let i = 0; i < commentLength; i++) {
          tokens.push({
            char: lineText[col + i],
            index: globalIndex++,
            line: lineIdx + 1,
            col: col + i,
            tokenType: 'comment'
          });
        }
        col = lineText.length;
        continue;
      }

      // Strings (single and double quotes)
      if (ch === '"' || ch === "'") {
        const quote = ch;
        let strEnd = col + 1;
        while (strEnd < lineText.length) {
          if (lineText[strEnd] === quote && lineText[strEnd - 1] !== '\\') {
            strEnd++;
            break;
          }
          strEnd++;
        }
        const strLen = strEnd - col;
        for (let i = 0; i < strLen; i++) {
          tokens.push({
            char: lineText[col + i],
            index: globalIndex++,
            line: lineIdx + 1,
            col: col + i,
            tokenType: 'string'
          });
        }
        col = strEnd;
        continue;
      }

      // Numbers
      if (/[0-9]/.test(ch) && (col === 0 || /[^a-zA-Z0-9_]/.test(lineText[col - 1]))) {
        let numEnd = col;
        while (numEnd < lineText.length && /[0-9a-fA-FxX.eE]/.test(lineText[numEnd])) {
          numEnd++;
        }
        const numLen = numEnd - col;
        for (let i = 0; i < numLen; i++) {
          tokens.push({
            char: lineText[col + i],
            index: globalIndex++,
            line: lineIdx + 1,
            col: col + i,
            tokenType: 'number'
          });
        }
        col = numEnd;
        continue;
      }

      // Preprocessor #include / #define
      if (ch === '#' && language === 'cpp') {
        let ppEnd = col;
        while (ppEnd < lineText.length && /[#a-zA-Z0-9_]/.test(lineText[ppEnd])) {
          ppEnd++;
        }
        for (let i = col; i < ppEnd; i++) {
          tokens.push({
            char: lineText[i],
            index: globalIndex++,
            line: lineIdx + 1,
            col: i,
            tokenType: 'keyword'
          });
        }
        col = ppEnd;
        continue;
      }

      // Words (keywords, identifiers)
      if (/[a-zA-Z_$]/.test(ch)) {
        let wordEnd = col;
        while (wordEnd < lineText.length && /[a-zA-Z0-9_$]/.test(lineText[wordEnd])) {
          wordEnd++;
        }
        const word = lineText.slice(col, wordEnd);
        let type: TokenType = 'identifier';

        if (language === 'cpp' && CPP_KEYWORDS.has(word)) type = 'keyword';
        else if (language === 'java' && JAVA_KEYWORDS.has(word)) type = 'keyword';

        for (let i = 0; i < word.length; i++) {
          tokens.push({
            char: word[i],
            index: globalIndex++,
            line: lineIdx + 1,
            col: col + i,
            tokenType: type
          });
        }
        col = wordEnd;
        continue;
      }

      // Operators and punctuation
      let punctuationType: TokenType = 'punctuation';
      if (['+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':', '=>', '->', '::'].some(op => rest.startsWith(op))) {
        punctuationType = 'operator';
      }

      tokens.push({
        char: ch,
        index: globalIndex++,
        line: lineIdx + 1,
        col: col,
        tokenType: punctuationType
      });
      col++;
    }

    // Add newline character if not last line
    if (lineIdx < lines.length - 1) {
      tokens.push({
        char: '\n',
        index: globalIndex++,
        line: lineIdx + 1,
        col: lineText.length,
        tokenType: 'default'
      });
    }
  }

  return tokens;
}
