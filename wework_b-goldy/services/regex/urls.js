exports.isSpecialOrQueryLink = (url) => {
    return (url.indexOf('#') == -1 || url.indexOf('?') == -1 || url.indexOf('=') == -1 || url.indexOf('.pdf') == -1)
    // return (!new RegExp('#').test(url) || !new RegExp('?').test(url))
}

exports.isTagLink = (url) => {
    // Pattern check 
    // first character -> . / - \ __ space 
    // after that it has to be tag
    let pattern =  new RegExp(/([\/]tag[\/]|[\/]tags[\/]|[\/]category[\/]|[\/]categories[\/]|[\/]topic[\/]|[\/]topics[\/])/gi);
    return pattern.test(url);
}

exports.isValidVideoLink = (url) => {
    // Pattern check 
    // first character -> . / - \ __ space 
    // after that it has to be tag
    let pattern =  new RegExp(/(youtube)/gi);
    return pattern.test(url);
}

exports.isImageLink = (url) => {
    // pattern check
    // https://your-url-ending-.image-extension
    // Both upercase & lowercase support
    // Supported extensions => jpg, Jpeg, jpe, jif, jfe,jfi, 
    // gif,png,webp,tif,tiff,psd,raw,arw,cr2, nrw,k25, 
    // bmp,dib,svg,svgz
    
    let pattern = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:[jJ][pP][gG]|[jJ][pP][eE][gG]|[jJ][pP][eE]|[jJ][iI][fF]|[jJ][fF][iI]|[gG][iI][fF]|[pP][nN][gG]|[wW][eE][bB][pP]|[tT][iI][fF][fF]|[tT][iI][fF]|[pP][sS][dD]|[rR][aA][wW]|[aA][rR][wW]|[cC][rR]2|[nN][rR][wW]|[kK]25|[bB][mM][pP]|[dD][iI][bB]|[sS][vV][gG]|[sS][vV][gG][zZ])/g);
    return pattern.test(url);
}

// Takes content-type header string as input
exports.isHtmlLink = (contentType) => {
    let pattern = new RegExp(/(text\/html)/gi);
    return pattern.test(contentType);
}
