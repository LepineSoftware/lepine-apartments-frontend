module.exports.submitGAEvent = (goalName) => {
    const gtag = window.gtag;
    gtag('event', goalName);
};