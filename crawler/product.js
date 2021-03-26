const axios = require('axios');
const cheerio = require('cheerio');
const { products } = require('./products');

let productItem = [];
const getHtml = async (productUrl) => {
  try {
    return await axios.get(`http://${productUrl}`);
  } catch (error) {
    console.error(error);
  }
};

const productFunc = async (productNum) => {
  try {
    let productUrl = await products();
    const html = await getHtml(productUrl[productNum]);
    const $ = cheerio.load(html.data);
    const $productImages = $('div.product-gallery-wrap ul li');
    let productImages = [];
    $productImages.each(async function (i, elem) {
      productImages[i] = $(this).find('img').attr('src');
    });
    const $productOptionContainer = $('div.product-option-container');
    let subtitle = $productOptionContainer
      .find('span.text-color-secondary')
      .text();
    let title = $productOptionContainer.find('h1.title-wrap span').text();
    let price = $productOptionContainer.find('span.price strong').text();
    //
    let optionColors = [];
    const $productOptColors = $('#product-option_color div a');
    $productOptColors.each(function (i, elem) {
      optionColors[i] = $(this).attr('href');
    });
    //
    let sizes = [];
    const $sizes = $('div.size-grid-type').find('span.input-radio');
    $sizes.each(function (i, elem) {
      sizes[i] = $(this).find('label').text();
    });
    //
    let descriptionPreview = {
      title: '',
      body: '',
    };
    descriptionPreview.title = $('div.description-preview p b').text();
    descriptionPreview.body = $(
      'div.description-preview p'
    )[1].children[0].data;
    //
    let color = $('span.style-color').text();
    let code = $('span.style-code').text();

    productItem = {
      productImages,
      subtitle,
      title,
      price,
      optionColors,
      sizes,
      descriptionPreview,
      color,
      code,
    };
    return productItem;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { productFunc };
