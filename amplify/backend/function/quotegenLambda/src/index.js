/* Amplify Params - DO NOT EDIT
	API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_ARN
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// AWS packages

const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const docClient = DynamoDBDocument.from(new DynamoDB());
const path = require("path");
const lineBreak = 4;
const fs = require("fs");
const imagePath = path.join("/tmp", "quote-card.png");
const sharp = require("sharp");

const constructImage = async (text, additionalData) => {
  const HEIGHT = 470;
  const WIDTH = 750;
  const words = text.split(" ");
  const tspanElement = words
    .map(
      (value, index) =>
        `${value}${
          index !== 0 && (index + 1) % lineBreak === 0
            ? "/n"
            : index < words.length - 1
            ? " "
            : ""
        }`
    )
    .join("")
    .split("/n")
    .map((value) => `<tspan x="${WIDTH / 2}" dy="1.2em"> ${value}</tspan>`)
    .join("");

  // svg image construction

  const svgImage = `
  <svg width="${WIDTH}" height="${HEIGHT}">
  <style>
     .title { 
       fill: #ffffff;  
      font-size: 20px; 
         font-weight: bold;
    }
   .quoteAuthorStyles {
         font-size: 35px;
        font-weight: bold;
       padding: 50px;
  }
    .footerStyles {
      font-size: 20px;
         font-weight: bold;
        fill: lightgrey;
       text-anchor: middle;
      font-family: Verdana;
  }
  </style>
  <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.155)"/>
  <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
  <g>
      <rect x="0" y="0" width="${WIDTH}" height="auto"></rect>
         <text id="lastLineOfQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
            ${tspanElement}
        <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${additionalData.join(
          ","
        )}</tspan>
   </text>
    </g>
  <text x="${WIDTH / 2}" y="${
    HEIGHT - 10
  }" class="footerStyles">Developed by @rajeevdessai | Quotes from ZenQuotes.io</text>
</svg>
  `;

  // Add backgrounds imaegs for svg
  const backgroundImages = [
    "./background/Aubergine.png",
    "./background/Mantle.png",
    "./background/Midnight-City.png",
    "./background/Orangey.png",
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const selectedImage = backgroundImages[randomIndex];

  // image composition

  //   const timestamp = new Date().toLocaleString().replace(/[^\d]/g, "");

  const svgBuffer = Buffer.from(svgImage);

  await sharp(selectedImage)
    .composite([
      {
        input: svgBuffer,
        top: 0,
        left: 0,
        blend: "over",
      },
    ])
    .toFile(imagePath);
};

const fetchCall = require("node-fetch");
const API_URL = "https://zenquotes.io/api/random";

async function updateDynamoDBObject() {
  const tableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
  const objectId = "123322";
  var params = {
    TableName: tableName,
    Key: {
      id: objectId,
    },
    UpdateExpression: "SET #quotesGenerated=#quotesGenerated + :inc",
    ExpressionAttributeValues: {
      ":inc": 1,
    },
    ExpressionAttributeNames: {
      "#quotesGenerated": "quotesGenerated",
    },
    ReturnValues: "UPDATED_NEW",
  };
  const updateObject = await docClient.update(params);
  return updateObject;
}
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const response = await fetchCall(API_URL);
  var quoteData = await response.json();
  const quoteText = quoteData[0]?.q;
  const quoteAuthor = quoteData[0]?.a;
  await constructImage(quoteText, [quoteAuthor]);
  try {
    updateDynamoDBObject();
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "image/png",
      },
      body: fs.readFileSync(imagePath).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error("Error found  ", err);
  }
};
