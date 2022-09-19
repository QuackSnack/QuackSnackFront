import { useState, useEffect, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'

function ArticleView(): ReactElement {
  const { setSnackBar } = useCurrentContext()
  const [article, setarticle] = useState({
    name: ''
  })
  const { articleId } = useParams()

  useEffect(() => {
    request
      .get(`get/article/${articleId}/`)
      .then((res) => {
        console.log(res.data.data)
        setarticle(res.data.data)
      })
      .catch((err) => {
        setSnackBar(err.response.data.message)
      })
  }, [])

  return (
    <div className="main-frame">
      <h1>Article</h1>
      <h1>{articleId}</h1>
      <h1>{article.name}</h1>
    </div>
  )
}

export default ArticleView
