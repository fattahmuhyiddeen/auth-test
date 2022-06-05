const Sequelize = require('sequelize');
const config = require('../config/config');

exports.encoderBase64 = (str_hash, encode = true) => {
  // eslint-disable-next-line new-cap
  if (encode) return new Buffer.from(str_hash.toString()).toString('base64');

  // eslint-disable-next-line new-cap
  return new Buffer.from(str_hash, 'base64').toString();
};

exports.removeTrailingSymbolFromUrl = url => url.replace(/\/+$/, '').replace(/#+$/, '').replace(/\?+$/, '');

exports.queryParameters = args => {
  const { req, search_columns: sc, model_name } = args;
  let { where = {} } = args;

  const { or, like, iLike } = Sequelize.Op;
  const { page = 1, perpage = 30, keyword, sortby } = req.query;

  if (keyword && sc) {
    where = {
      ...where,
      [or]: sc.map(c => {
        const likeSymbol = config.dialect === 'postgres' ? iLike : like;
        //  TODO: temp solution for non postrgres
        if (c === 'id' && config.dialect !== 'postgres') return { [c]: +keyword };
        //  TODO: end temp solution for non postrgres

        if (c === 'id') {
          if (!model_name) return { [c]: keyword };

          return Sequelize.where(Sequelize.cast(Sequelize.col(model_name + '.' + c), 'varchar'), {
            [likeSymbol]: `%${keyword}%`,
          });
        }
        return { [c]: { [likeSymbol]: `%${keyword}%` } };
      }),
    };
  }
  const order = {};
  if (sortby) order.order = [sortby.split(',')];

  return {
    Sequelize,
    page: +page,
    perpage: +perpage,
    where,
    keyword,
    order,
    offset: (+page - 1) * +perpage,
  };
};

exports.bulk_upsert = (model, rows) => {
  return Promise.all(
    rows.map(async row => {
      await model.upsert(row);
    })
  );
};
exports.extFromFileName = fileName => fileName.split('.').pop();

const isValidURL = str => /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(str);
exports.isEmail = s =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );

const endsWithAny = (suffixes, str) => suffixes.some(suffix => str.endsWith(suffix));

exports.appendAbsoluteUrlToFilePath = path => {
  if (typeof path !== 'string' || !path || isValidURL(path) || !endsWithAny(['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.pdf'], path)) return path;
  if (process.env.STORAGE_DRIVER === 'google') {
    return `https://firebasestorage.googleapis.com/v0/b/${process.env.GOOGLE_BUCKET}/o/${path.replace(/\//g, '%2F')}?alt=media`;
  }
  return process.env.STORAGE_DOMAIN + '/' + path;
};

exports.displayId = id => {
  const ID_LENGHT = 6;
  const i = `${id}`;
  return 'MYL ' + i.padStart(ID_LENGHT + 1 - i.length, 0);
};

exports.isObject = data => !!data && typeof data === 'object' && !Array.isArray(data);
