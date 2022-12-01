import {useEffect, useState} from 'react'
import { API_PROJECT_URLS, OPENSEA_API_CONTRACT_URL, API_COLLECTIONS_URL } from '../lib/api';

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
            const contractData = await fetch(`${OPENSEA_API_CONTRACT_URL}${address}`)
            const contractDataJson = await contractData.json()
            projectData = {
                ...projectData,
                contract: contractDataJson,
            }
            const contractStats = await fetch(`${API_COLLECTIONS_URL}${address}?compat=true`)
            const contractStatsJson = await contractStats.json()
            projectData = {
                ...projectData,
                contractStats: contractStatsJson?.stats,
            }
            setProjectData(projectData)
            setLoading(false)
        }
        fetchProject()
    }, [address])
    
    return { projectData, loading }
};

export { useProjectData }