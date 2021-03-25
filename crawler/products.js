// productUrl
const axios = require('axios');
const cheerio = require('cheerio');
const getHtml = async () => {
  try {
    return await axios.get(
      'https://www.nike.com/kr/ko_kr/w/men/fw/fb/football-shoes'
    );
  } catch (error) {
    console.error(error);
  }
};

const products = async () => {
  let productUrl = [];
  try {
    const html = await getHtml();
    const $ = await cheerio.load(html.data);
    const $bodyList = await $('a.a-product-image-link');
    $bodyList.each(function(i, elem) {
      productUrl[i] = `nike.com${$(this).attr('href')}`;
    });
    return productUrl;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { products };
