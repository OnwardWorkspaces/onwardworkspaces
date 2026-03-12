
let Experience = require("../modal/experience"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Experience.aggregate([
            {
                $match: { isDeleted: false, isActive: true, name:{$nin:["Group Tour"]} },
            },
            // {
            //     $lookup: {
            //         from: "tours",
            //         pipeline: [{ $project: { _id: 1, name: 1 } }],
            //         localField: "_id",
            //         foreignField: "experienceId",
            //         as: "tours"
            //     }
            // },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    banner: 1,
                    bannerAlt: 1,
                    desc: 1,
                    // tours: 1,
                    isActive: 1,
                    pageTitle: 1,
                    pageDesc: 1,
                    pageKey: 1
                }
            }
        ]);
        // console.log(records);
        // records.forEach(item => {
        // item.updatedAt = moment(item?.updatedAt).fromNow();
        // })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataByAdmin = async (req) => {
    try {
        let groupExp = await Experience.findOne({ name: "Group Tour" });
        if (!groupExp) {
            let grouToSave = new Experience({
                banner: "https://aahilya.s3.ap-south-1.amazonaws.com/image/Experience/1687764913617.webp",
                bannerAlt: "Group Tour",
                desc: `<p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Join us on an extraordinary adventure as we embark on a group tour that will take us to fascinating destinations all over the world. Get ready to explore the globe, discover diverse cultures, and create lifelong memories with a group of fellow travel enthusiasts.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Our group tour offers a unique opportunity to visit some of the most iconic landmarks, experience local traditions, and immerse ourselves in the beauty of different countries. From bustling cities to serene natural wonders, each destination on our itinerary has been carefully curated to provide a well-rounded and unforgettable travel experience.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Imagine strolling through the vibrant streets of Tokyo, savoring delicious sushi and embracing the energy of this modern metropolis. Or perhaps you prefer the historic charm of European cities like Paris, Rome, or Barcelona, where centuries-old architecture and world-class museums await your exploration.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">For those seeking natural wonders, our group tour will take you to breathtaking locations such as the majestic fjords of Norway, the awe-inspiring landscapes of Iceland, or the pristine beaches of the Maldives. Marvel at the Northern Lights dancing across the sky or bask in the sun on remote tropical islands—there is something for everyone.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Throughout the tour, our experienced guides will provide insights into the local history, culture, and traditions, enriching your understanding of each destination. They will lead you through hidden gems and off-the-beaten-path locations, ensuring that you experience the true essence of each place we visit.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Traveling as a group offers a myriad of benefits. You will have the opportunity to forge new friendships, share experiences, and create lasting bonds with like-minded individuals from different corners of the world. Engage in lively conversations over delicious meals, exchange stories and laughter, and build a global community of fellow adventurers.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Rest assured, our group tour prioritizes safety and comfort. We work with reputable accommodations, reliable transportation, and follow best practices to ensure a smooth and worry-free journey. Our knowledgeable tour leaders will be available to assist you every step of the way, ensuring that your travel experience is enjoyable and hassle-free.</span></p>
                <p style="text-align:start;"><span style="color: rgb(55,65,81);background-color: rgb(247,247,248);font-size: 16px;font-family: Söhne, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">Whether you are a seasoned traveler or embarking on your first international adventure, our group tour promises to be an enriching and transformative experience. Discover the wonders of the world, connect with diverse cultures, and create memories that will last a lifetime. Join us as we embark on this extraordinary journey across continents, forging unforgettable connections and embracing the beauty of our global community.</span>&nbsp;</p>
                `,
                pageTitle: "Group Tour",
                pageDesc: `Join us on an extraordinary adventure as we embark on a group tour that will take us to fascinating destinations all over the world. Get ready to explore the globe, discover diverse cultures, and create lifelong memories with a group of fellow travel enthusiasts.

                Our group tour offers a unique opportunity to visit some of the most iconic landmarks, experience local traditions, and immerse ourselves in the beauty of different countries. From bustling cities to serene natural wonders, each destination on our itinerary has been carefully curated to provide a well-rounded and unforgettable travel experience.
                
                Imagine strolling through the vibrant streets of Tokyo, savoring delicious sushi and embracing the energy of this modern metropolis. Or perhaps you prefer the historic charm of European cities like Paris, Rome, or Barcelona, where centuries-old architecture and world-class museums await your exploration.
                
                For those seeking natural wonders, our group tour will take you to breathtaking locations such as the majestic fjords of Norway, the awe-inspiring landscapes of Iceland, or the pristine beaches of the Maldives. Marvel at the Northern Lights dancing across the sky or bask in the sun on remote tropical islands—there is something for everyone.
                
                Throughout the tour, our experienced guides will provide insights into the local history, culture, and traditions, enriching your understanding of each destination. They will lead you through hidden gems and off-the-beaten-path locations, ensuring that you experience the true essence of each place we visit.
                
                Traveling as a group offers a myriad of benefits. You will have the opportunity to forge new friendships, share experiences, and create lasting bonds with like-minded individuals from different corners of the world. Engage in lively conversations over delicious meals, exchange stories and laughter, and build a global community of fellow adventurers.
                
                Rest assured, our group tour prioritizes safety and comfort. We work with reputable accommodations, reliable transportation, and follow best practices to ensure a smooth and worry-free journey. Our knowledgeable tour leaders will be available to assist you every step of the way, ensuring that your travel experience is enjoyable and hassle-free.
                
                Whether you are a seasoned traveler or embarking on your first international adventure, our group tour promises to be an enriching and transformative experience. Discover the wonders of the world, connect with diverse cultures, and create memories that will last a lifetime. Join us as we embark on this extraordinary journey across continents, forging unforgettable connections and embracing the beauty of our global community.`,
                pageKey: 'tour in group category all over the world',
                name: 'Group Tour'
            });
            let saveExperience = await grouToSave.save();
        }
        const records = await Experience.aggregate([
            {
                $match: { isDeleted: false },
            },
            // {
            //     $lookup: {
            //         from: "tours",
            //         pipeline: [{ $project: { _id: 1, name: 1 } }],
            //         localField: "_id",
            //         foreignField: "experienceId",
            //         as: "tours"
            //     }
            // },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    banner: 1,
                    bannerAlt: 1,
                    desc: 1,
                    // tours: 1,
                    isActive: 1,
                    pageTitle: 1,
                    pageDesc: 1,
                    pageKey: 1
                }
            }
        ]);
        // console.log(records);
        // records.forEach(item => {
        // item.updatedAt = moment(item?.updatedAt).fromNow();
        // })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Experience');
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.url;
                return {
                    data: imagePath,
                    error: null,
                    message: "SUCCESS",
                    statusCode: 200
                }
            }
        } else {
            return {
                data: null,
                error: "Image file is required!",
                message: "FAILED",
                statusCode: 400
            }
        }
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getExperienceById = async (req) => {
    try {
        let experienceId = undefined;
        // console.log('id from query', req)
        if (req.query?.experienceId?.length == 4) {
            let allDesti = await Experience.aggregate([{ $match: { isActive: true, isDeleted: false } }]);
            allDesti.forEach(item => {
                let id = String(item?._id);
                if (id.slice(id.length - 4, id?.length) == req.query?.experienceId)
                    experienceId = item?._id;
            })
        } else {
            experienceId = req.query.experienceId
        }
        let userRecord = await Experience.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(experienceId)
                    },
                },
            },
            {
                $lookup: {
                    from: "tours",
                    pipeline: [{ $project: { _id: 1, name: 1, desc: 1, images: 1, overview: 1, banner:1 } }],
                    localField: "_id",
                    foreignField: "experienceId",
                    as: "tours"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    banner: 1,
                    desc: 1,
                    tours: 1,
                    pageTitle: 1,
                    pageDesc: 1,
                    pageKey: 1
                }
            }
            ]
        );
        if (userRecord.length > 0) {
            return {
                data: userRecord[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Experience not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getExperienceById function in ExperienceController', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addData = async (req) => {
    try {
        let ExperienceExits = await Experience.findOne({
            name: req.body.name,
            isDeleted: false
        });
        if (ExperienceExits) {
            return {
                data: null,
                error: "Experience already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var ExperienceToSave = new Experience(req.body)
        let saveExperience = await ExperienceToSave.save();
        return {
            data: saveExperience,
            error: null,
            message: "Experience added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addExperience function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateData = async (req) => {
    try {
        console.log('id to update', req.body.experienceId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateExperience = await Experience.updateOne({ _id: dataTypes.ObjectId(req.body.experienceId) }, updatedData);
        return {
            data: updateExperience,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateExperience function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeData = async (req) => {
    try {
        let res = await Experience.updateOne({ _id: dataTypes.ObjectId(req.body.experienceId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeExperience function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banExperience = async (req) => {
    try {
        let updateExperience = await Experience.updateOne({ _id: dataTypes.ObjectId(req.body.experienceId) }, { ExperienceStatus: req.body.ExperienceStatus })
        return {
            data: updateExperience,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banExperience function in ExperienceController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}