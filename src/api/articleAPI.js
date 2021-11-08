import request from '@/utils/request.js'

// 按需导出函数
export const getArticleAPI = function(_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
