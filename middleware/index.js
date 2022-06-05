const { cloneDeep } = require('lodash');
const { version } = require('../package.json');
const helper = require('../helper');

const requireAdmin = (req, res, next) => {
  if (req.user.level !== 10) return res.status(403).send({ error: 'access denied' });
  next();
};

function modifyResponseBody(req, res, next) {
  const oldSend = res.json;
  // const origin = req.get('origin');
  // console.log('xxxxx origin', origin);

  res.json = function (...args) {
    args[0].version = version;

    function iterateChildren(data) {
      if (!data || ['number', 'function'].includes(typeof data)) return data;
      // to take plain object results from sequelize results

      if (Array.isArray(data) && data.length) return data.map(iterateChildren);

      if (helper.isObject(data)) {
        if (data.dataValues) return iterateChildren(data.toJSON());
        // TODO: find another how efficiently convert sequelize to plain JS while maintaning the structure (raw: true change the structure of the response)
        // TODO: find another way to stringify datetime
        data = JSON.parse(JSON.stringify(data));
        // if (data.dataValues) return iterateChildren(data.toJSON());
        const tmp = {};
        Object.keys(data).forEach(k => {
          // if (k === '_id') return tmp[k] = data[k].toString(); // for mongo
          if (k === 'pincode') return (tmp[k] = !!data[k]);

          const keysShouldBeIgnoreFromAppendingAbsoluteUrl = [];
          tmp[k] = keysShouldBeIgnoreFromAppendingAbsoluteUrl.includes(k) ? data[k] : iterateChildren(data[k]);
        });
        return cloneDeep(tmp);
      }
      return helper.appendAbsoluteUrlToFilePath(data);
    }

    try {
      args[0] = iterateChildren(args[0]);
    } catch (e) {
      console.log('error middleware response e', e);
    }
    oldSend.apply(res, args);
  };
  next();
}
module.exports = { requireAdmin, modifyResponseBody };
