let axios = require('axios');

// Takes URL to visit & AXIOS configuration as input
exports.doGetRequest = async (url, headers= null) => {
    return new Promise((resolve, reject) =>{
        axios.get(url, 
            {
                headers : headers
            })
        .then(response => {

            resolve(response.data)

        })
        .catch(err => {
            console.log(err);
            
            reject(err.response);
        })
    })
}

exports.doSiteMapGetRequest = async (url, config) => {
    return new Promise((resolve, reject) =>{
        axios.get(url, config)
        .then(response => {
            
            
            // let contentType = response.headers['content-type'];

            // if((contentType.indexOf("xml") > -1) || (contentType.indexOf("XML") > -1)){
                resolve(response.data)
            // }
            // else{
            //     reject({
            //         message : "INVALID XML FOUND"
            //     })
            // }
        })
        .catch(err => {
            reject(err);
        })
    })
}

// Takes URL to visit & AXIOS configuration as input
exports.doPostRequest = async (url, data, headers =null) => {
    return new Promise((resolve, reject) =>{
        axios.post(url, data, {
            headers : headers
        })
        .then(response => {
            resolve(response.data)

        })
        .catch(err => {
            console.log(err);
            reject(err.response);
        })
    })
}

// Function to do concurrent requests
exports.doConcurrentRequest = async (requests, config) => {
    return new Promise((resolve, reject) =>{
        axios.all(requests, config)
        .then(axios.spread((...responses) => {
            // use/access the results
            resolve(responses)
        })
    )
        .catch(err => {
            reject(err.response);
        })
    })
}

// Takes URL to get Header Data
exports.doHeadRequest = async (url, config) => {
    return new Promise((resolve, reject) =>{
        axios.head(url, config)
        .then(response => {

            resolve(response.headers)

        })
        .catch(err => {
            reject(err.response);
        })
    })
}

// Takes URL to get Header Data
exports.doStreamRequest = async (url, stream, config) => {
    return new Promise((resolve, reject) =>{
        axios.get(url, {responseType: 'stream'})
        .then(response => {

            resolve(response.headers)

        })
        .catch(err => {
            reject(err.response);
        })
    })
}
