const Container = ({ children, page, theme, cssClass, brand }) => {
    const classes = ['container'];
    cssClass && classes.push(cssClass)

    return (
        <div className={classes.join(' ')} data-page={page} data-theme={theme} data-brand={brand ? brand : 'lepine'}>
            {children}
        </div>
    );
}

export default Container;