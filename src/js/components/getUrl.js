const getUrl = (counter, request) => {
  const url = 'https://gateway.marvel.com/v1/public/characters?';
  const ts = '1';
  const key = 'hereisyourKEY';
  const hash = 'hereisyourHASH';
  const limit = 10; // characters for one request
  const offset = counter * limit;

  const result = `${url}nameStartsWith=${request}&limit=${limit}&offset=${offset}&ts=${ts}&apikey=${key}&hash=${hash}`;

  return result;
};

export default getUrl;
