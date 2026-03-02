const calculateSqftRange = (sqft) => {
    let sqftRange = '0';

    switch (true) {
        case sqft >= 700 && sqft <= 799:
            sqftRange = '700-799';
            break;
    
        case sqft >= 800 && sqft <= 899:
            sqftRange = '800-899';
            break;
    
        case sqft >= 900 && sqft <= 999:
            sqftRange = '900-999';
            break;
    
        case sqft >= 1000 && sqft <= 1399:
            sqftRange = '1000-1399';
            break;
    
        case sqft >= 1400 && sqft <= 1699:
            sqftRange = '1400-1699';
            break;
    
        case sqft >= 1700:
            sqftRange = '1700+';
            break;
    
        default:
            sqftRange = '0';
            break;
    }

    return sqftRange;
}

export default calculateSqftRange;