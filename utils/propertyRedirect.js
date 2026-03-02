module.exports = (path) => {
    const pathParams = path.split('?');
    let propertyRedirectPath;

    switch (pathParams[0]) {
        case '/property/normand':
            propertyRedirectPath = pathParams[1] ? `/property/thenormand?${pathParams[1]}` : '/property/thenormand';
            break;

        case '/property/theNormand':
            propertyRedirectPath = pathParams[1] ? `/property/thenormand?${pathParams[1]}` : '/property/thenormand';
            break;

        case '/property/cristina':
            propertyRedirectPath = pathParams[1] ? `/property/thecristina?${pathParams[1]}` : '/property/thecristina';
            break;

        case '/property/theCristina':
            propertyRedirectPath = pathParams[1] ? `/property/thecristina?${pathParams[1]}` : '/property/thecristina';
            break;

        case '/property/johannesCourt':
            propertyRedirectPath = pathParams[1] ? `/property/johannescourt?${pathParams[1]}` : '/property/johannescourt';
            break;

        case '/property/lepineLodge':
            propertyRedirectPath = pathParams[1] ? `/property/lepinelodge?${pathParams[1]}` : '/property/lepinelodge';
            break;

        case '/property/howardGrant':
            propertyRedirectPath = pathParams[1] ? `/property/howardgrant?${pathParams[1]}` : '/property/howardgrant';
            break;

        case '/property/saintEmilion':
            propertyRedirectPath = pathParams[1] ? `/property/saintemilion?${pathParams[1]}` : '/property/saintemilion';
            break;

        case '/comingSoon/lesJardinsFrancoise':
            propertyRedirectPath = pathParams[1] ? `/comingsoon/lesJardinsFrancoise?${pathParams[1]}` : '/comingsoon/lesjardinsfrancoise';
            break;

        case '/comingSoon/renesCourt':
            propertyRedirectPath = pathParams[1] ? `/comingsoon/renescourt?${pathParams[1]}` : '/comingsoon/renescourt';
            break;

        case '/comingSoon/johannesGarden':
            propertyRedirectPath = pathParams[1] ? `/comingsoon/johannesgarden?${pathParams[1]}` : '/comingsoon/johannesgarden';
            break;

        case '/locations/barrhaven/howard-grant':
            propertyRedirectPath = '/property/howardgrant';
            break;

        case '/locations/carleton-place/johannes-court':
            propertyRedirectPath = '/property/johannescourt';
            break;

        case '/locations/kanata/saint-emilion':
            propertyRedirectPath = '/property/saintemilion';
            break;

        case '/locations/kanata/the-normand':
            propertyRedirectPath = '/property/thenormand';
            break;

        case '/locations/renfrew/lepine-lodge':
            propertyRedirectPath = '/property/lepinelodge';
            break;

        case '/locations/smiths-falls/the-cristina':
            propertyRedirectPath = '/property/thecristina';
            break;
    
        default:
            propertyRedirectPath = '/';
            break;
    }

    return propertyRedirectPath;
}