const ContentWrapper = ({ cssClass, size, children, padding, mobileFullSwiper, style, aosFade }) => {
    const classes = ['contentWrapper'];
    padding && classes.push(padding);
    mobileFullSwiper && classes.push('mobileFullSwiper');
    cssClass && classes.push(cssClass);

    return (
        <div className={classes.join(' ')} data-wrapper={size ? size : 'xl'} style={style && style} data-aos={aosFade && 'fade'}>
            {children}
        </div>
    )
}

export default ContentWrapper;