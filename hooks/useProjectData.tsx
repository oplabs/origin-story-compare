import {useEffect, useState} from 'react';
import useSWR from 'swr';
import { OPENSEA_API_CONTRACT_URL, API_COLLECTIONS_URL, INTERNAL_API_ALCHEMY_URL, API_TOP_HOLDERS_URL, API_HIGH_CONVICTION_HOLDERS_URL, API_UNIQUE_OWNERS_URL, API_HOLDER_DISTRIBUTION_URL, API_SALES_BY_DAY_URL } from '../lib/api';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProjectData = (address:string) => {
    const [loading, setLoading] = useState(true)
    const [projectData, setProjectData] = useState({})

    const nipArgs = `?contract=${address}`;
    const { data: topHolders } = useSWR(`${API_TOP_HOLDERS_URL}/${nipArgs}`, fetcher);
    const { data: highConvictionHolders } = useSWR(`${API_HIGH_CONVICTION_HOLDERS_URL}/${nipArgs}`, fetcher);
    const { data: uniqueOwners } = useSWR(`${API_UNIQUE_OWNERS_URL}/${nipArgs}`, fetcher);
    const { data: holderDistribution } = useSWR(`${API_HOLDER_DISTRIBUTION_URL}/${nipArgs}`, fetcher);
    const { data: salesByDay } = useSWR(`${API_SALES_BY_DAY_URL}/${nipArgs}`, fetcher);
    const { data: contractData } = useSWR(`${OPENSEA_API_CONTRACT_URL}${address}`, fetcher);
    const { data: contractStats } = useSWR(`${API_COLLECTIONS_URL}${address}?compat=true`, fetcher);
    const { data: ownerAddresses } = useSWR(`${INTERNAL_API_ALCHEMY_URL}/getOwnersForCollection?contractAddress=${address}`, fetcher);

    useEffect(() => {
        setLoading(true);
    }, [address]);
    
    useEffect(() => {
        if(topHolders?.result && highConvictionHolders?.result && uniqueOwners?.result && holderDistribution?.result && salesByDay?.result && contractData && contractStats && ownerAddresses?.ownerAddresses) {
            setProjectData({
                topHolders: topHolders?.result,
                highConvictionHolders: highConvictionHolders?.result,
                uniqueOwners: uniqueOwners?.result,
                holderDistribution: holderDistribution?.result,
                salesByDay: salesByDay?.result,
                contract: contractData,
                contractStats: contractStats?.stats,
                ownerAddresses: ownerAddresses?.ownerAddresses,
            });
            setLoading(false);
        }
    }, [topHolders?.result, highConvictionHolders?.result, uniqueOwners?.result, holderDistribution?.result, salesByDay?.result, contractData, contractStats, ownerAddresses?.ownerAddresses])
    
    return { projectData, loading }
};

export { useProjectData }