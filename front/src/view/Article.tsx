import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Article() {
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/articles/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setArticles(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Restaurant</h1>
      <div>
        <ul>
          {articles.map((article) => (
            <div key={article.id}>
              <li>{article.name}</li>
              <img src={`/images/${article.image}`} height='100' alt={article.id} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Article
