import axios from 'axios'

let httpClient = axios.create({
  baseURL: 'http://localhost:56424/api'
})

export default httpClient
export * from './user-service'
export * from './board-service'
