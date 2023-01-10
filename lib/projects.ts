const projects = [
    {
        name: 'Pudgy Penguins',
        address: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
    },
    {
        name: 'Lil Pudgys',
        address: '0x524cAB2ec69124574082676e6F654a18df49A048',
    },
    {
        name: 'Moonrunners',
        address: '0x1485297e942ce64E0870EcE60179dFda34b4C625',
    },
    {
        name: 'Otherdeed',
        address: '0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258',
    },
    {
        name: 'Sappy Seals',
        address: '0x364C828eE171616a39897688A831c2499aD972ec',
    },
    {
        name: 'SupDucks',
        address: '0x3Fe1a4c1481c8351E91B64D5c398b159dE07cbc5',
    },
    {
        name: 'The Humanoids',
        address: '0x3a5051566b2241285BE871f650C445A88A970edd',
    },
    {
        name: 'Chubbiverse Frens',
        address: '0x42f1654B8eeB80C96471451B1106b63D0B1a9fe1',
    },
    {
        name: 'Grimmies',
        address: '0x760C355b8E3DBdA999CC7f41B9278104B782d235',
    },
    {
        name: 'RooTroop',
        address: '0x928f072C009727FbAd81bBF3aAa885f9fEa65fcf',
    },
    {
        name: 'OnChainMonkey',
        address: '0x960b7a6BCD451c9968473f7bbFd9Be826EFd549A',
    },
    {
        name: 'Bored Ape Yacht Club',
        address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    },
    {
        name: 'Mutant Ape Yacht Club',
        address: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
    },
    {
        name: 'Bored Ape Kennel Club',
        address: '0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623'
    },
    {
        name: 'Karafuru',
        address: '0xd2F668a8461D6761115dAF8Aeb3cDf5F40C532C6',
    },
    {
        name: 'Chubbicorns',
        address: '0xb072114151f32D85223aE7B00Ac0528d1F56aa6E',
    },
    {
        name: 'DigiDaigaku',
        address: '0xd1258DB6Ac08eB0e625B75b371C023dA478E94A9',
    },
    {
        name: 'Praise Pals',
        address: '0xFCc57058Ec232a5234D495d95Fb7e593E31756Bd',
    },
    {
        name: 'Meebits',
        address: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
    },
    {
        name: '0N1 Force',
        address: '0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D',
    },
    {
        name: '10KTF',
        address: '0x0Cfb5d82BE2b949e8fa73A656dF91821E2aD99FD',
    },
    {
        name: 'Azuki',
        address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
    },
    /*{
        name: 'BEANZ Official',
        address: '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949',
    },
    {
        name: 'CloneX',
        address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    },
    {
        name: 'Doodles',
        address: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
    },
    {
        name: 'Dooplicator',
        address: '0x466cfcd0525189b573e794f554b8a751279213ac',
    },
    {
        name: 'Moonbirds',
        address: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
    },*/
];

const sortedProjects = projects.sort((a, b) => a.name.localeCompare(b.name));

export { projects, sortedProjects }