const fetch = require("node-fetch");

const getTopMoviesWeek = async () => {
  const res = await fetch(`
${process.env.BASE_URL}/trending/all/day?api_key=${process.env.API_KEY}`);
  const data = await res.json();
  return data;
};

exports.handler = async function () {
  const movieData = await getTopMoviesWeek();
  return {
    statusCode: 200,
    body: JSON.stringify({ data: movieData }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  };
};
