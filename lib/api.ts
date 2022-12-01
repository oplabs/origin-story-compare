const API_BASE_URL = `https://nip.ogn-review.net/v1/`
const API_STATS_BASE_URL = API_BASE_URL + `stats/`
const API_TOP_HOLDERS_URL = API_STATS_BASE_URL + `top-holders`
const API_HIGH_CONVICTION_HOLDERS_URL = API_STATS_BASE_URL + `high-conviction-holders`
const API_UNIQUE_OWNERS_URL = API_STATS_BASE_URL + `unique-owners`
const API_HOLDER_DISTRIBUTION_URL = API_STATS_BASE_URL + `holder-distribution`
const API_SALES_BY_DAY_URL = API_STATS_BASE_URL + `sales-by-day`
const API_COLLECTIONS_URL = API_BASE_URL + `collections/`

const API_PROJECT_URLS = [
    {key: 'topHolders', url: API_TOP_HOLDERS_URL },
    {key: 'highConvictionHolders', url: API_HIGH_CONVICTION_HOLDERS_URL},
    {key: 'uniqueOwners', url: API_UNIQUE_OWNERS_URL},
    {key: 'holderDistribution', url: API_HOLDER_DISTRIBUTION_URL},
    {key: 'salesByDay', url: API_SALES_BY_DAY_URL},
]

const OPENSEA_API_CONTRACT_URL = `https://api.opensea.io/api/v1/asset_contract/`

export {
    API_BASE_URL,
    API_STATS_BASE_URL,
    API_TOP_HOLDERS_URL,
    API_HIGH_CONVICTION_HOLDERS_URL,
    API_UNIQUE_OWNERS_URL,
    API_HOLDER_DISTRIBUTION_URL,
    API_SALES_BY_DAY_URL,
    API_COLLECTIONS_URL,
    API_PROJECT_URLS,
    OPENSEA_API_CONTRACT_URL,
}