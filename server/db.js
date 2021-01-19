/*
 * @Descripttion: 
 * @version: 
 * @Author: roadloser
 * @Date: 2021-01-21 15:50:43
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-26 18:50:17
 */
const Sequelize = require('sequelize')
const uuid = require('node-uuid')
const config = require('./config');

const generateId = () => uuid.v4()

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  logging: console.log
});
const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  let attrs = {};
  // 默认 属性不为空 , 加属性
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs = {
    ...attrs,
    // [`${name.toLowerCase()}_id`]: {
    id: {
      type: ID_TYPE,
      primaryKey: true,
    },
    createdAt: {
      type: Sequelize.BIGINT(),
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.BIGINT(),
      allowNull: false
    },
    version: {
      type: Sequelize.BIGINT(),
      allowNull: false
    }
  };
  console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, (k, v) => {
    if (k === 'type') {
      for (let key in Sequelize) {
        if (key === 'ABSTRACT' || key === 'NUMBER') {
          continue;
        }
        let dbType = Sequelize[key];
        if (typeof dbType === 'function') {
          if (v && v instanceof dbType) {
            if (v._length) {
              return `${dbType.key}(${v._length})`;
            }
            return dbType.key;
          }
          if (v === dbType) {
            return dbType.key;
          }
        }
      }
    }
    return v;
  }, '  '));
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          console.log('will create entity...');
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          console.log('will update entity...', 1231231232132132131231312312312312);
          obj.updatedAt = now;
          obj.version++;
        }
      }
    }
  });
}

// const TYPES = ['STRING', 'INTEGER', 'BIGINT()', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let exp = {
  ...Sequelize,
  sequelize,
  defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      console.log('start sync\n\n\n\n\n')
      sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};


exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;