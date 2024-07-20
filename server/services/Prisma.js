const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');

const CommonHelper = require('../helpers/CommonHelper');

const prisma = new PrismaClient();

const getProducts = async () => {
  try {
    const timeStart = process.hrtime();
    const data = await prisma.product.findMany();

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', 'getProducts', 'INFO'], {
      message: { timeTaken },
      data
    });

    return data;
  } catch (error) {
    CommonHelper.log(['Prisma', 'getProducts', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
const getProduct = async (id) => {
  try {
    const timeStart = process.hrtime();
    const data = await prisma.product.findFirst({
      where: {
        id: Number(id)
      }
    });

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', 'getProduct', 'INFO'], {
      message: { timeTaken },
      data
    });

    return data;
  } catch (error) {
    CommonHelper.log(['Prisma', 'getProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const addProduct = async (name, brand, price, stock) => {
  try {
    const timeStart = process.hrtime();
    const data = await prisma.product.create({
      data: {
        name,
        brand,
        price,
        stock
      }
    });
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', 'addProduct', 'INFO'], {
      message: { timeTaken },
      data
    });
  } catch (error) {
    CommonHelper.log(['Prisma', 'addProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const editProduct = async (id, name, brand, price, stock) => {
  try {
    const timeStart = process.hrtime();
    const data = await prisma.product.update({
      where: {
        id: Number(id),
        name,
        brand,
        price,
        stock
      },
      data: {
        name,
        brand,
        price,
        stock
      }
    });
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', 'editProduct', 'INFO'], {
      message: { timeTaken },
      data
    });
    return true;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      // Handle the case where the record is not found
      CommonHelper.log(['Prisma', 'editProduct', 'WARN'], {
        message: `No product entry found with id ${id}`
      });
      return false;
    }

    // Log other errors
    CommonHelper.log(['Prisma', 'editProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const deleteProduct = async (id) => {
  try {
    const timeStart = process.hrtime();
    const data = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    });
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', 'deleteProduct', 'INFO'], {
      message: { timeTaken },
      data
    });
    return true;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      // Handle the case where the record is not found
      CommonHelper.log(['Prisma', 'deleteProduct', 'WARN'], {
        message: `No product entry found with id ${id}`
      });
      return false;
    }

    // Log other errors
    CommonHelper.log(['Prisma', 'deleteProduct', 'ERROR'], {
      message: `${error}`
    });
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, deleteProduct };
