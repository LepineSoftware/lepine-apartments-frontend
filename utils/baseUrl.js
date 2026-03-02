export const baseUrl = (content) => {
    if (process.env.NODE_ENV === 'production') {
        if (content.startsWith('nyc')) {
            return `https://${content}`;
        } else {
            return content;
        }
    } else {
        if (content.includes('https')) {
            return content;
        } else {
            return `${process.env.NEXT_PUBLIC_BASE_URL}${content}`;
        }
    }
}

export const baseUrlPDF = (content) => {
    if (process.env.NODE_ENV === 'production') {
        return `https://${content}`;
    } else {
        if (content.includes('https')) {
            return content;
        } else {
            return `${process.env.NEXT_PUBLIC_BASE_URL}${content}`;
        }
    }
}