const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const numberID = event.body;
  console.log(numberID);

  const searchItem = async () => {
    const res = await fetch(`
${process.env.BASE_URL}/person/${numberID}?api_key=${process.env.API_KEY}`);

    const data = await res.json();
    // console.log(data);
    return data;
  };

  const searchResults = await searchItem();
  return {
    statusCode: 200,
    body: JSON.stringify({ data: searchResults }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  };
};