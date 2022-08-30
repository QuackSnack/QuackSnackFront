import axios from 'axios'

const CsrfToken = () => {
  axios.get('http://127.0.0.1:8000/tokenCSRF/').then((res: any) => {
    // eslint-disable-next-line no-console
    console.log(res.token)
  })
}

export default CsrfToken as any
