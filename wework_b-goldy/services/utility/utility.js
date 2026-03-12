const url = require("url");
const moment = require('moment')



exports.defaultDateRange = (presentDate) => {

  var dateTo = '';
  var dateFrom = '';
  if(presentDate != undefined && presentDate.length> 0){
    console.log("IN LOOP", presentDate);
      // Calculating the to & From date initially
      dateTo = moment(new Date(presentDate)).endOf('day').utc().format();
      dateFrom = moment(new Date(presentDate)).subtract(7, 'days').startOf('day').utc().format();
  }
  else{
    dateTo = moment(new Date()).endOf('day').utc().format();
    dateFrom = moment(new Date()).subtract(7, 'days').startOf('day').utc().format();
  }


  return  {
    from : dateFrom,
    to : dateTo
};


}

// Function checks if value is not null
// If true -> Push the element to reference
// array
exports.pushValidElement = (value, arr) => {
  if (value != null) {
    arr.push(value);
  }
};

exports.mergeTwoArrays = (arr1, arr2) => {
  return [].concat(arr1, arr2);
};

const getValidArrayForMap = (key, arrayOfObject) => {
  // console.log("FOUND MAP", arrayOfObject);

  return arrayOfObject.map((obj) => {
    let _obj = {};
    _obj[obj[key]] = obj;
    return _obj;
  });

  // return validArray ;
};

exports.convertObjectArrayToMap = (key, arrayOfObject) => {
  let map = new Map();

  arrayOfObject.map((obj) => {
    map.set(obj[key], obj);
  });

  return map;
};

exports.convertMapsToObjects = (mapInstance) => {
  const obj = {};
  for (let object of mapInstance.keys()) {
      obj[object] = mapInstance.get(object)
  }
 return obj;
}

exports.removeDuplicateElements = (arrayOne, arrayTwo) => {
  return arrayOne.filter((val) => !arrayTwo.includes(val));
};

exports.getElementUsingSubString = (array, value) => {
  return array.find((index) => index.includes(value));
};

exports.filterArrayForNull = (array) => {
  return array.filter((element) => element != null);
};

exports.isJSONObject = (jsonStr) => {
  try {
    JSON.parse(jsonStr);
  } catch (e) {
    return false;
  }
  return true;
};

exports.isElementExists = (element, arr) => {
  if(arr.indexOf(element) > -1){
    return true;
  }
  else{
    return false;
  }
}

exports.isValidUrl = (url) => {
  try {
    let _url = new URL(url);
    return {
      url : _url,
      flag : true
    }
  } catch (error) {
    return {
      url : url,
      flag : false
    }
  }
}

exports.stripWhiteSpaces = function(str){
  return str.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ');
}

exports.getColor = function()
{
    // storing all letter and digit combinations 
    // for html color code 
    var letters = "0123456789ABCDEF"; 
  
    // html color code starts with # 
    var color = '#'; 
  
    // generating 6 times as HTML color code consist 
    // of 6 letter or digits 
    for (var i = 0; i < 6; i++) 
       color += letters[(Math.floor(Math.random() * 16))]; 
  
   return color;
}
// Expects values like -> 00:00:00 or 00:00

exports.callDurationNumberFormat = () => {
}

exports.caseInsensitiveSubStrMatch = (str, substr) => {
  var re = new RegExp(substr, 'i');
  let match = str.match(re)
  if(match == null){
    return false
  }
  return true;
}

exports.hmsToSecondsOnly = (str) => {
  var p = str.split(':'),
      s = 0, m = 1;

  while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
  }

  return s;
}
