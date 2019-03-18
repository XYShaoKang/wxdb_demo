import R from 'ramda'

// {
//   item0:{item0},
//   item1:{item1},
//   item2:{item2}
// }
//
// =>
//
// [{ item0 }, { item1 }, { item2 }]
const mmreaderMap = obj => {
  const { $count: { data: count = 1 } = {}, $type: { data: type } = {} } = obj
  const items = []
  for (let i = 0; i < count; i++) {
    const item = obj[`item${i === 0 ? '' : i}`]
    items.push({ ...item, sources: item.sources.source.name.data })
  }

  return { ...obj, items, count, type }
}

// 返回一个遍历对象的函数
const iterateAttr = fn => {
  const f = R.when(
    R.is(Object),
    R.pipe(
      fn,
      R.when(R.is(Object), obj => R.map(f)(obj)),
    ),
  )
  return f
}

// {
//   _attributes: {
//     name: 'username',
//     type: 'link_profile',
//   },
// }
//
// =>
//
// {
//   name: 'username',
//   type: 'link_profile',
// }
//
const promoteAttributes = R.when(
  R.has('_attributes'),
  R.converge(R.merge, [R.dissocPath(['_attributes']), R.prop('_attributes')]),
)

// {
//   "memberlist": {
//     "member": {
//       "username": "username",
//       "nickname": "nickname"
//     }
//   }
//  "type": "link_profile"
// }
//
// =>
//
// {
//   "username": "username",
//   "nickname": "nickname"
//   "type": "link_profile"
// }
//
const promoteMemberlist = R.when(
  R.has('memberlist'),
  R.converge(R.merge, [
    R.dissocPath(['memberlist']),
    R.path(['memberlist', 'member']),
  ]),
)

const promoteMessageNodeInfo = R.when(
  R.has('messagenodeinfo'),
  R.converge(R.merge, [
    R.dissocPath(['messagenodeinfo']),
    R.path(['messagenodeinfo']),
  ]),
)
const promoteLikeuserlist = R.when(
  R.has('likeuserlist'),
  R.converge(R.assocPath, [
    () => ['likeuserlist'],
    R.path(['likeuserlist', 'userinfo']),
    R.dissocPath(['likeuserlist']),
  ]),
)
const promoteRank = R.when(
  R.has('rank'),
  R.converge(R.merge, [R.dissocPath(['rank']), R.path(['rank'])]),
)
const promoteScore = R.when(
  R.has('score'),
  R.converge(R.merge, [R.dissocPath(['score']), R.path(['score'])]),
)
const promotePushMail = R.when(
  R.has('pushmail'),
  R.pipe(
    R.path(['pushmail']),
    R.converge(R.merge, [R.dissocPath(['content']), R.path(['content'])]),
  ),
)
const promoteFromToList = R.when(
  R.has('fromlist'),
  R.map(
    R.pipe(R.converge(R.merge, [R.dissocPath(['item']), R.path(['item'])])),
  ),
)
const promoteMmreader = R.when(
  R.has('mmreader'),
  R.map(
    R.pipe(
      R.when(
        R.has('category'),
        R.converge(R.merge, [
          R.dissocPath(['category']),
          R.pipe(
            R.path(['category']),
            mmreaderMap,
          ),
        ]),
      ),
      R.when(
        R.has('publisher'),
        R.converge(R.merge, [
          R.dissocPath(['publisher']),
          R.path(['publisher']),
        ]),
      ),
    ),
  ),
)

//  {
//    recorditem: {
//      recordinfo: {
//        recordinfo: {
//          datalist: {
//            dataitem: [list],
//          },
//        },
//      },
//    },
//  }
//
//  =>
//
//  {
//    recorditem: [list]
//  }
//
//
const promoteRecorditem = R.when(
  R.has('recorditem'),
  R.converge(R.assocPath, [
    () => ['recorditem'],
    R.path(['recorditem', 'data', 'recordinfo', 'datalist', 'dataitem']),
    R.identity,
  ]),
)

//  {
//    link_list: {
//      link: [list]
//    },
//  }
//
//  =>
//
//  {
//    link_list: [list]
//  }
//
//
const promoteLinkList = R.when(
  R.has('link_list'),
  R.converge(R.assocPath, [
    () => ['link_list'],
    R.path(['link_list', 'link']),
    R.identity,
  ]),
)

const promoteRankInfoList = R.when(
  R.has('rankview'),
  R.pipe(
    R.converge(R.assocPath, [
      () => ['rankinfolist'],
      R.path(['rankview', 'rankinfolist', 'rankinfo']),
      R.identity,
    ]),
    R.dissocPath(['rankview']),
  ),
)

// {
//   title: {
//     data: 'title',
//   },
// }
//
// =>
//
// {
//   title: 'title',
// }
const promoteDataProp = R.when(
  R.converge(R.and, [
    R.has('data'),
    R.pipe(
      R.pathEq(['data'], '(null)'),
      R.not,
    ),
  ]),
  R.prop('data'),
)

const emptyObjToStr = R.when(
  R.is(Object),
  R.pipe(R.when(R.equals({}), () => '')),
)

const formatContent = R.pipe(
  promoteRecorditem,
  iterateAttr(
    R.pipe(
      promoteDataProp,
      promoteAttributes,
      promoteLinkList,
      promoteMemberlist,
      promoteMessageNodeInfo,
      promoteLikeuserlist,
      promoteRankInfoList,
      promoteRank,
      promoteScore,
      promotePushMail,
      promoteFromToList,
      emptyObjToStr,
      promoteMmreader,
    ),
  ),
)

export { promoteAttributes, promoteDataProp, formatContent }
