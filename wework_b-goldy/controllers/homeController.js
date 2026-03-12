
let Home = require("../modal/homebanner"),
    dataTypes = require("../services/dataTypes/mongodb"),
    Property = require("../modal/properties"),
    City = require("../modal/cities"),
    Location = require("../modal/locations"),
    Testimonial = require("../modal/testimonial"),
    uploadImage = require("../services/fileUpload/upload"),
    sendingMail = require("../services/mail/mail");
const subscribes = require("../modal/subscribes");
// let mailer = require("./authController");

exports.getHomeByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let home = await Home.findOne({});
        if (!home) {
            var data = new Home({
                header: [
                    { title: "Home" },
                    { title: "About Us" },
                    { title: "Location" },
                    { title: "Blog" },
                    { title: "Our Solutions" },
                    { title: "Enterprise" },
                    { title: "GET IN TOUCH" }
                ]
            })
            home = await data.save();
        }
        return {
            data: home,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in HomeController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.homeData = async (req) => {
    try {
        let property = await Property.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true
                }
            },
            {
                $limit: 8
            },
            {
                $lookup: {
                    from: "cities",
                    pipeline: [{ $project: { title: 1, path: 1 } }],
                    localField: "cityId",
                    foreignField: "_id",
                    as: "city"
                }
            },
            {
                $lookup: {
                    from: "locations",
                    pipeline: [{ $project: { title: 1, path: 1 } }],
                    localField: "locationId",
                    foreignField: "_id",
                    as: "location"
                }
            },
            {
                $project: {
                    images: 1,
                    title: 1,
                    seat: 1,
                    price: 1,
                    lat: 1,
                    long: 1,
                    city: 1,
                    location: 1,
                    path: 1
                }
            }
        ]);
        let city = await City.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true
                }
            },
            // {
            //   $sort: { createdAt: -1 }
            // },
            {
                $limit: 5
            },
            {
                $project: {
                    image: 1,
                    title: 1
                }
            }
        ]);
        let testi = await Testimonial.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true,
                    type: "image"
                }
            },
            // {
            //   $sort: { createdAt: -1 }
            // },
            {
                $limit: 8
            },
            {
                $project: {
                    image: 1,
                    name: 1,
                    desgi: 1,
                    desc: 1,
                    rating: 1,
                    desig: 1
                }
            }
        ]);
        let gallery = await Property.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true
                }
            },
            { $unwind: '$gallery' },
            {
                $group: {
                    _id: null,
                    gallery: { $push: '$gallery' }
                }
            },
            {
                $project: {
                    _id: 0,
                    gallery: { $slice: ['$gallery', 12] } // Limit to 12 images
                }
            }
        ])
        let cityCount = await City.countDocuments({ isDeleted: false, isActive: true });
        let locationCount = await Location.countDocuments({ isDeleted: false, isActive: true });
        let home = await Home.aggregate([
            {
                $match: {
                    isDeleted: false
                },
            },
            {
                $lookup: {
                    from: "forms",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { heading: 1, desc: 1, field: 1, image: 1 } }],
                    localField: "formId",
                    foreignField: "_id",
                    "as": "form"
                }
            },
            {
                $lookup: {
                    from: "clientales",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1 } }],
                    localField: "clientale",
                    foreignField: "_id",
                    "as": "clientale"
                }
            }
        ]);
        let data = { home: home?.length ? home[0] : undefined, cityCount, locationCount, property, city, testi, gallery: gallery?.length ? gallery[0]?.gallery : [],mediaDesc:home?.length?home[0]?.mediaDesc:'',media:home?.length?home[0]?.media:[] };
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error while homedata in authController', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.headerData = async (req) => {
    try {
        let city = await City.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true
                }
            },
            {
                $project: {
                    title: 1,
                    path: 1
                }
            }
        ]);
        let home = await Home.aggregate([
            {
                $match: {
                    isDeleted: false
                },
            },
            {
                $project: {
                    header: 1,
                    logo: 1,
                    footerLogo: 1
                }
            }
        ]);
        let data = { city };
        if (home?.length) {
            data.header = home[0]?.header;
            data.logo = home[0]?.logo;
            data.footerLogo = home[0]?.footerLogo;
        }
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error while homedata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Home');
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

exports.addData = async (req) => {
    try {
        let saveHome = undefined;
        let { image, title, subTitle, buttonTitle, member, sqFeet, whyOnward, imgAlt, seo, formId, logo, footerLogo, header, clientale,
            cliHead, cliPara, propHead, propPara, connHead, connPara, whyHead, whyPara, catHead, catPara,
            testiHead, testiPara, galHead, galPara, bContent, mediaDesc, media,
        } = req?.body;
        let home = await Home.findOne({});
        if (home) {
            if (image)
                home.image = image;
            if (title)
                home.title = title;
            if (subTitle)
                home.subTitle = subTitle;
            if (buttonTitle)
                home.buttonTitle = buttonTitle;
            if (member)
                home.member = member;
            if (sqFeet)
                home.sqFeet = sqFeet;
            if (whyOnward?.length)
                home.whyOnward = whyOnward;
            if (imgAlt)
                home.imgAlt = imgAlt;
            if (seo)
                home.seo = seo;
            if (formId)
                home.formId = dataTypes.ObjectId(formId)
            if (logo)
                home.logo = logo;
            if (footerLogo)
                home.footerLogo = footerLogo;
            if (header?.length)
                home.header = header;
            if (clientale?.length)
                home.clientale = clientale;
            if (cliHead)
                home.cliHead = cliHead;
            if (cliPara)
                home.cliPara = cliPara;
            if (propHead)
                home.propHead = propHead;
            if (propPara)
                home.propPara = propPara;
            if (connHead)
                home.connHead = connHead;
            if (connPara)
                home.connPara = connPara;
            if (whyHead)
                home.whyHead = whyHead;
            if (whyPara)
                home.whyPara = whyPara;
            if (catHead)
                home.catHead = catHead;
            if (catPara)
                home.catPara = catPara;
            if (testiHead)
                home.testiHead = testiHead;
            if (testiPara)
                home.testiPara = testiPara;
            if (galHead)
                home.galHead = galHead;
            if (galPara)
                home.galPara = galPara;
            if (bContent)
                home.bContent = bContent;
            if (mediaDesc && media) {
                home.mediaDesc = mediaDesc;
                home.media = media;
            }
            saveHome = await home.save();
        } else {
            var data = new Home(req.body)
            saveHome = await data.save();
        }
        return {
            data: saveHome,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addHome function in HomeController ', error);
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
        console.log('id to update', req.body.homeId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateHome = await Home.updateOne({ _id: dataTypes.ObjectId(req.body.homeId) }, updatedData);
        return {
            data: updateHome,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateHome function in HomeController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeHome = async (req) => {
    try {
        let res = await Home.updateOne({ _id: dataTypes.ObjectId(req.body.homeId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeHome function in HomeController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banHome = async (req) => {
    try {
        let updateHome = await Home.updateOne({ _id: dataTypes.ObjectId(req.body.homeId) }, { HomeStatus: req.body.HomeStatus })
        return {
            data: updateHome,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banHome function in HomeController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}