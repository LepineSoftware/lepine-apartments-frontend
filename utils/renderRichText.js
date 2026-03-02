import { marked } from 'marked';

export const renderRichText = (richtext) => {
    const parsed = marked.parse(richtext);
    return parsed;
}