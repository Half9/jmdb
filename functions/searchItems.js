const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const search = event.body;
  // console.log(search);

  const searchItem = async () => {
    const res = await fetch(`
${process.env.BASE_URL}/search/multi?api_key=${process.env.API_KEY}&query=${search}`);
    const data = await res.json();
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
