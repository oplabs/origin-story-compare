import {useEffect, useState} from 'react';
import useSWR from 'swr';
import { OPENSEA_API_CONTRACT_URL, API_COLLECTIONS_URL, INTERNAL_API_ALCHEMY_URL, API_DASHBOARD_URL, API_SALES_BY_DAY_URL } from '../lib/api';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProjectData = (address:string | undefined) => {
    const [loading, setLoading] = useState(true)
    const [projectData, setProjectData] = useState({})

    const nipArgs = `?contract=${address}`;
    const { data: dashboard } = useSWR(`${API_DASHBOARD_URL}/${address}`, fetcher);
    const { data: salesByDay } = useSWR(`${API_SALES_BY_DAY_URL}/${nipArgs}`, fetcher);
    const { data: contractData } = useSWR(`${OPENSEA_API_CONTRACT_URL}${address}`, fetcher);
    const { data: contractStats } = useSWR(`${API_COLLECTIONS_URL}${address}?compat=true`, fetcher);
    const { data: ownerAddresses } = useSWR(`${INTERNAL_API_ALCHEMY_URL}/getOwnersForCollection?contractAddress=${address}`, fetcher);

    useEffect(() => {
        setLoading(true);
    }, [address]);
    
    useEffect(() => {
        if(dashboard && salesByDay?.result && contractData && contractStats && ownerAddresses?.ownerAddresses) {
            const {
                highConvictionHolders,
                totalHolders,
                totalSupply,
                holderDistribution,
                sortedHolders: topHolders,
            } = dashboard;

            const uniqueOwners = ((totalHolders / totalSupply) * 100).toFixed(2);
            
            setProjectData({
                totalHolders,
                topHolders,
                highConvictionHolders,
                uniqueOwners,
                holderDistribution,
                salesByDay: salesByDay?.result,
                contract: contractData,
                contractStats: contractStats?.stats,
                ownerAddresses: ownerAddresses?.ownerAddresses,
            });
            setLoading(false);
        }
    }, [dashboard, salesByDay?.result, contractData, contractStats, ownerAddresses?.ownerAddresses])
    
    return { projectData, loading }
};

export { useProjectData }