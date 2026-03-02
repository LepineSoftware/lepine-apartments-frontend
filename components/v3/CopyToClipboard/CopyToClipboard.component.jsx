import { useState } from "react";

const CopyToClipboard = ({ promptCopy, href, successCopy }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(href);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 5000)
    }

    const classes = ['btn', 'copyToClipboard'];
    copied && classes.push('btnGreen');

    if (promptCopy && successCopy && href) {
        return (<div className={classes.join(' ')} onClick={() => copy()}><p>{copied ? '' : '+ '}{copied ? successCopy : promptCopy}</p></div>);
    }
}

export default CopyToClipboard;