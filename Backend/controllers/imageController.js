const imageModel = require('../models/imageModel');
const fs = require('fs')
const path = require('path')

const generateImage = async (req, res) => {
    const { searchText } = req.body
    let url = ""
    // console.log(response.url)
    // let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
    try {

        const response = await fetch(`https://source.unsplash.com/random/400x400/?${searchText}`);
        url = response.url;

    } catch (e) {
        console.log(e)
    }

    const image = new imageModel({
        query: searchText,
        image: url
    })
    await image.save()

    res.status(200).json({
        status: 'success',
        message: 'POST Request to /api/v1/images',
        data: {
            searchText,
            url
        }
    })
}

const getImages = async (req, res) => {
    const images = await imageModel.find()
    console.log(images)
    res.status(200).json({
        status: 'success',
        message: 'GET Request to /api/v1/images',
        data: images
    })

}

module.exports = { generateImage, getImages }



// const response = await fetch("https://api.hotpot.ai/art-maker-sdte-zmjbcrr", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "en-US,en;q=0.9",
//         "api-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTczMjcxMDMsImV4cCI6MTcxNzQxMzUwM30.AGUJW0DnkDqlLgOs37B4gGL4Cl9Pi0hFT0U2pc-sF_E",
//         "authorization": "hotpot-t2mJbCr8292aQzp8CnEPaK",
//         "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryuCBhcP1iIFuD6Rt2",
//         "sec-ch-ua": "\"Opera GX\";v=\"109\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"Windows\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-site"
//     },
//     "referrer": "https://hotpot.ai/",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": `------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"seedValue\"\r\n\r\nnull\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"inputText\"\r\n\r\n${searchText}\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"width\"\r\n\r\n512\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"height\"\r\n\r\n512\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"styleId\"\r\n\r\n49\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"styleLabel\"\r\n\r\nPhoto General 1\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"isPrivate\"\r\n\r\nfalse\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"price\"\r\n\r\n0\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"requestId\"\r\n\r\n8-WVJKPPvpZHVL88w\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2\r\nContent-Disposition: form-data; name=\"resultUrl\"\r\n\r\nhttps://hotpotmedia.s3.us-east-2.amazonaws.com/${uniqueSuffix}\r\n------WebKitFormBoundaryuCBhcP1iIFuD6Rt2--\r\n`,
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });