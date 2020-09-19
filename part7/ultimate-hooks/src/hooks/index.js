import {useEffect, useState} from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    // ...
    const response = await axios.post(baseUrl, resource)
    const newResources = resources.concat(response.data)
    setResources(newResources)
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}