import {useEffect, useState} from 'react'
import { API_PROJECT_URLS } from '../lib/api';

const useProjectData = (address:string) => {
    const [loading, setLoading] = useState(true)
    const [projectData, setProjectData] = useState({})
    
    useEffect(() => {
        const fetchProject = async () => {
            let projectData = {}
            await Promise.all(API_PROJECT_URLS.map(async (project) => {
                const res = await fetch(`${project.url}?contract=${address}`)
                const json = await res.json()
                projectData = {
                    ...projectData,
                    [project.key]: json.result,
                }
            }))
            setProjectData(projectData)
            setLoading(false)
        }
        fetchProject()
    }, [address])
    
    return { projectData, loading }
};

export { useProjectData }