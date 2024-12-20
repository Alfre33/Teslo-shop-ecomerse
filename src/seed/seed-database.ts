import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from './seed-countries';

async function main() {
  //   await Promise.all([
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  //   ]);


  const dataCountries = await prisma.country.createMany({
    data:countries
  })

  const { categories, products, users } = initialData;

  const userData = await prisma.user.createMany({
    data: users,
  });

  const categoriesData = categories.map((category) => ({
    name: category,
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((previous, category) => {
    previous[category.name.toLowerCase()] = category.id;

    return previous;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { images, type, ...resto } = product;
    const dbProduct = await prisma.product.create({
      data: {
        // description:resto.description,
        // gender:resto.gender,
        // inStock:resto.inStock,
        // slug:resto.slug,
        // title:resto.title,
        // price:resto.price,
        // sizes:resto.sizes,
        // tags:resto.tags,
        ...resto,
        categoryId: categoriesMap[type],
      },
    });

    const imagesdb = images.map((img) => ({
      url: img,
      productId: dbProduct.id,
    }));

    const imgInsertada = await prisma.productImage.createMany({
      data: imagesdb,
    });
  });

  console.log("seed ejecutado correctamente");
}

(() => {
  main();
})();
