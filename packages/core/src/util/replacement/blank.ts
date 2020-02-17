// blank
import { isCode } from '../isCode';
import { isFence } from '../isFence';
import { isKeep } from '../isKeep';
import { fenceReplacement } from './fence';
import { listReplacement } from './list';
import { keepReplacement } from './keep';
import { Options, Node } from '../../types';

export function blankReplacement(
  content: string,
  node: Node,
  options: Options
) {
  if (isKeep(options, node)) {
    return keepReplacement(content, node);
  } else if (isFence(options, node)) {
    return fenceReplacement(content, node, options);
  } else if (isCode(node)) {
    var delimiter = options.codeDelimiter ? options.codeDelimiter : '`';

    return (
      delimiter +
      (options.codeBlockStyle === 'fenced' ? ' ' : '') +
      (content || ' ') +
      delimiter +
      '\n'
    );
  } else if (node.nodeName.toLowerCase() === 'blockquote') {
    return '>';
  } else if (node.nodeName.toLowerCase() === 'li') {
    return listReplacement(content, node, options);
  } else if (node.nodeName.toLowerCase() === 'ul') {
    return content + '\n\n';
  }
  return node.isBlock ? content + '\n\n' : '';
}
