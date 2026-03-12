exports.getSanitizedString  = (str) => {
    let result = str.replace(/(\%HESITATION+)/gm, " ");
    // Hardcode &nbsp and others with space
    // result = result.trim();
    return result;
}

exports.isNotValidClass = (str) => {
        let pattern =  new RegExp(/logo/gm);
        return pattern.test(str);
}

exports.isValidImageUrl = (str) => {
    let pattern =  new RegExp(/data:/gm);
    return pattern.test(str);
}
