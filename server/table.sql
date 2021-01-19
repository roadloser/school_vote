create table platform(
  id BIGINT auto_increment not null,
  user_id VARCHAR(50) DEFAULT NULL,
  weapp_id VARCHAR(50) DEFAULT NULL,
  alipay_id VARCHAR(50) DEFAULT NULL,
  updatedAt BIGINT,
  createdAt BIGINT,
  version INTEGER,
  primary key(id)
);
create table platform(
  id VARCHAR(50) not null,
  user_id VARCHAR(50) DEFAULT NULL,
  weapp_id VARCHAR(50) DEFAULT NULL,
  alipay_id VARCHAR(50) DEFAULT NULL,
  updatedAt BIGINT,
  createdAt BIGINT,
  version INTEGER,
  primary key(id)
);

--  drop table platform;      
INSERT INTO platform ( id, weapp_id ) VALUES ( '1', 'roadloser' );
INSERT INTO test (`weappId`,`id`,`createdAt`,`updatedAt`,`version`) VALUES (11111,'我是谁',1,1,0);
select * from platform;


-- 查类型

-- show fulll columns from 表名;
-- show variables like 'character%';
-- show create table 表名;


-- 改字符
-- alter database 数据库名 character set utf8mb4;

