 const { getWeth } = require("../scripts/getWeth");

async function main() {

    await getWeth();
    const [ deployer ] = await ethers.getSigners();
    const lendingPool = await getLendingPool(deployer);

 }

 async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        networkConfig[network.config.chainId].lendingPoolAddressesProvider,
        account
    );
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool();
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account);
    return lendingPool;
}

async function approveErc20(erc20Address, spenderAddress, amount, signer) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer);
    txResponse = await erc20Token.approve(spenderAddress, amount);
    await txResponse.wait(1);
    console.log("Approved!");
}

 main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// 19:30:50