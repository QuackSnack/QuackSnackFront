import { useState, useEffect, ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import request from '../plugin/request'
import { useCurrentContext } from '../plugin/context'

function ArticleView(): ReactElement {
  const { setSnackBar } = useCurrentContext()
  const [article, setarticle] = useState({
    owner: 0,
    id: 0,
    tag: [],
    name: '',
    image: '',
    price: '',
    description: ''
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
      <h1>Owner ID:{article.owner}</h1>
      <h1>ID:{article.id}</h1>
      <h1>Tags:</h1>
      {article.tag.map((tag: { id: number; name: string }, index: number) => (
        <h5 key={index}>{tag.name}</h5>
      ))}
      <h1>Name:{article.name}</h1>
      <h1>Price:{article.price}</h1>
      <h1>Description:{article.description}</h1>
      <img src={`/images/${article.image}`} alt={article.image}></img>
    </div>
  )
}

export default ArticleView
