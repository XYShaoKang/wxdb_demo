import {
  getAllTableName,
  getTable,
  getAllDbs,
  searchInDB,
  searchInAllDB,
} from '../wechat'

// 获取所有数据库列表
const allDbsAsync = async (ctx, next) => {
  const data = await getAllDbs()
  ctx.response.body = data
}

// 搜索,必须参数 platform text ,可选 dbName tName
const searchAsync = async (ctx, next) => {
  const { text, tName, dbName, platform } = ctx.query
  const data = dbName
    ? await searchInDB(text, platform, dbName)
    : await searchInAllDB(platform, text)
  ctx.response.body = data
}

// 获取数据库所有表格
const tablesAsync = async (ctx, next) => {
  const { platform, dbName } = ctx.params

  const tables = await getAllTableName(dbName, platform)
  if (tables.err) {
    ctx.response.body = tables
  } else {
    ctx.response.body = tables.sort(
      (a, b) =>
        a.tableName.toLocaleLowerCase().charCodeAt() -
        b.tableName.toLocaleLowerCase().charCodeAt(),
    )
  }
}

// 获取表格数据
const tableDataAsync = async (ctx, next) => {
  const { dbName, tName, platform } = ctx.params
  const tables = await getTable(dbName, tName, platform)
  ctx.response.body = tables
}

export { allDbsAsync, searchAsync, tablesAsync, tableDataAsync }
