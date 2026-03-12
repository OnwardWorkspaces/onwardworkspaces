var Queue = require('bull');

var sampleQueue = new Queue('sample-queue')


const addToQueue = async (item) => {

    var job = await sampleQueue.add(item)
    return job;

}





exports.queue = sampleQueue ;
exports.addToQueue = addToQueue;
