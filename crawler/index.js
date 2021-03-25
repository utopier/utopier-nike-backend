const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { productFunc } = require('./product');

const main = async () => {
  try {
    //index : 0 ~ 40 , ex : productFunc(0)
    // 0~33
    const data = await productFunc(37);
    console.log('data : ', data);
    const {
      title,
      subtitle,
      price,
      color,
      descriptionPreview,
      code,
      productImages,
      optionColors,
    } = data;
    const productCode = code.slice(6, 12);
    const colorCodes = optionColors.map((url, index) => {
      const searchIndex = url.indexOf(productCode);
      const productCodeLength = productCode.length;
      const startIndex = searchIndex + productCodeLength + 1;
      return url.slice(startIndex, startIndex + 3);
    });
    const resetProductImages = productImages.map((url) => {
      return {
        url,
      };
    });
    console.log(resetProductImages);
    const product = await prisma.product.create({
      data: {
        title,
        subtitle,
        price: +price.slice(0, -2).replace(',', ''),
        color,
        descriptionpreview: {
          create: {
            title: descriptionPreview.title,
            body: descriptionPreview.body,
          },
        },
        productcode: {
          create: {
            productCode,
          },
        },
      },
    });
    resetProductImages.map(async ({ url }) => {
      await prisma.imageurl.create({
        data: {
          product: { connect: { id: product.id } },
          url,
        },
      });
    });
    // colorCodes.map(async (colorCode, index) => {
    //   await prisma.colorcode.create({
    //     data: {
    //       colorCode,
    //       optionColorImgUrl: optionColors[index],
    //       productCode: { connect: { id: productCodeResult.id } },
    //     },
    //   });
    // });

    // productImages.map(async (url) => {
    //   await prisma.imageUrl.create({
    //     data: {
    //       url,
    //       product: { connect: { id: product.id } },
    //     },
    //   });
    // });
    const result = await prisma.product.findOne({ where: { id: product.id } });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

main();
