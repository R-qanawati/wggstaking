alert("WORKING!");
const web3 = new Web3(Web3.givenProvider);
const CHAIN_ID = '0x4'
const CONTRACT_ADDRESS_TOKEN = '0x85498D9cEE105C19f5e49bC214AdBBc874aB8552'
var contract_abi = "";
async function getABI() 
{
	var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            contract_abi = JSON.parse(xhr.responseText);
        }
   }
   await xhr.open('GET', 'https://api.npoint.io/8442890e62a9961cf1f4', true);
   xhr.send(null);
}
getABI()
const connectButton = document.querySelector('.connect-button')
const connectedTo = document.querySelector('.connected-to')
const balanceWrapper = document.querySelector('.balance-wrapper')
const balanceText = document.querySelector('.balance-text')
const totalClaimable = document.querySelector('.earnings_item-claim-text')
const claimButton = document.querySelector('.claim-button')
const loadingState = document.querySelector('.loading-animation')
const totalNftsOfUser = document.querySelector('.total-nfts')
const unityLeadersOfUser = document.querySelector('.unity-leaders-quantity')
const totalNftsOfUserSpan = document.querySelector('.rarity_low-opacity-text-span')
const tokenImages = document.getElementsByClassName('rarity_item-image')
const tokenRarity = document.getElementsByClassName('token-rarity')
const tokenId = document.getElementsByClassName('token-id')
const tokenRank = document.getElementsByClassName('token-rank')
const nftLayout = document.querySelector('.owned-nfts_list-layout')
const contractToken = new web3.eth.Contract(contract_abi, CONTRACT_ADDRESS_TOKEN);

const getTokensFromDb = async (tokensId) => {
try {
 const response = await axios.post(
 'https://api.npoint.io/9be20b6a681fc3d8040c'
 );
 return response
} catch(error) {
console.log(error)
}
}

let balance = 0
let sumToClaim = 0
const connectWallet = async function () {
	try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) { 
      connectedTo.innerText = 'CONNECTED TO: ' + accounts[0].substring(0,5)+'...'+accounts[0].substring(accounts[0].length - 4, accounts[0].length)
      connectedTo.classList.remove('is-hidden')
      connectButton.classList.add('is-hidden')
     contractToken.methods.balanceOf(accounts[0]).call().then((userBalance) => {
        balanceText.innerText = web3.utils.fromWei(userBalance, 'ether')
        balanceWrapper.classList.remove('is-hidden');
        balance = +web3.utils.fromWei(userBalance, 'ether')
      }).catch(error => console.log(error)) 
      contractToken.methods.getTotalClaimable(accounts[0]).call().then((total) => {
        if(+total !== 0) { claimButton.classList.remove('is-disabled')}
        totalClaimable.innerText = web3.utils.fromWei(total, 'ether')+' $SURVIVE'
        sumToClaim = +web3.utils.fromWei(total, 'ether')
      })
      contractToken.methods.lastUpdate(accounts[0]).call().then((info) => {
      	if(+info === 0) claimButton.innerText = 'START'
      })
      contractToken.methods.walletOfOwner(accounts[0]).call().then((tokens) => {
        const tokenIds = tokens
        getTokensFromDb(tokens).then((response) => {
        	const {data} = response
          data.forEach((info,i) => {
      			nftLayout.classList.remove('is-hidden')
          	const rarityItemContentWrapper = document.createElement('div')
            const rarityItemContent = document.createElement('div')
            const rarityItemMainContentWrapper = document.createElement('div')
            const rarityItemMainContentLayoutLeft = document.createElement('div')
            const rarityItemMainContentLayoutRight = document.createElement('div')
            const rarityItemInfoWrapperCollection = document.createElement('div')
            const rarityItemInfoWrapperRarity = document.createElement('div')
            const rarityItemInfoWrapperId = document.createElement('div')
            const rarityItemInfoWrapperRank = document.createElement('div')
            rarityItemContentWrapper.classList.add('rarity_item-content-wrapper')
            rarityItemContent.classList.add('rarity_item-content')
            rarityItemMainContentWrapper.classList.add('rarity_item-main-content-wrapper')
            rarityItemMainContentLayoutLeft.classList.add('rarity_item-main-content-layout')
            rarityItemMainContentLayoutRight.classList.add('rarity_item-main-content-layout')
            rarityItemInfoWrapperCollection.classList.add('rarity_item-info-wrapper')
            rarityItemInfoWrapperRarity.classList.add('rarity_item-info-wrapper')
            rarityItemInfoWrapperId.classList.add('rarity_item-info-wrapper')
            rarityItemInfoWrapperRank.classList.add('rarity_item-info-wrapper')
          	const labelCollection = document.createElement('div')
            const labelId = document.createElement('div')
            const labelRarity = document.createElement('div')
            const labelRank = document.createElement('div')
            labelCollection.classList.add('rarity_item-label')
            labelRarity.classList.add('rarity_item-label')
            labelRank.classList.add('rarity_item-label')
            labelId.classList.add('rarity_item-label')
            labelCollection.innerText = 'Collection'
            labelRarity.innerText = 'Rarity Score'
            labelRank.innerText = 'Rank'
            labelId.innerText = 'ID'
            const infoCollection = document.createElement('div')
            const infoId = document.createElement('div')
            const infoRarity = document.createElement('div')
            const infoRank = document.createElement('div')
            infoCollection.classList.add('rarity_item-text')
            infoRarity.classList.add('rarity_item-text')
            infoRank.classList.add('rarity_item-text')
            infoId.classList.add('rarity_item-text')
            infoCollection.innerText = '55Unity'
            infoRarity.innerText = info.score
            infoRank.innerText = info.rank
            infoId.innerText = tokenIds[i]
            rarityItemInfoWrapperCollection.appendChild(labelCollection)
            rarityItemInfoWrapperCollection.appendChild(infoCollection)
            rarityItemInfoWrapperRarity.appendChild(labelRarity)
            rarityItemInfoWrapperRarity.appendChild(infoRarity)
            rarityItemMainContentLayoutLeft.appendChild(rarityItemInfoWrapperCollection)
            rarityItemMainContentLayoutLeft.appendChild(rarityItemInfoWrapperRarity)
            rarityItemInfoWrapperId.appendChild(labelId)
            rarityItemInfoWrapperId.appendChild(infoId)
            rarityItemInfoWrapperRank.appendChild(labelRank)
            rarityItemInfoWrapperRank.appendChild(infoRank)
            rarityItemMainContentLayoutRight.appendChild(rarityItemInfoWrapperId)
            rarityItemMainContentLayoutRight.appendChild(rarityItemInfoWrapperRank)
            rarityItemMainContentWrapper.appendChild(rarityItemMainContentLayoutLeft)
            rarityItemMainContentWrapper.appendChild(rarityItemMainContentLayoutRight)
            rarityItemContent.appendChild(rarityItemMainContentWrapper)
            rarityItemContentWrapper.appendChild(rarityItemContent)
            const elementImage = document.createElement('img')
            elementImage.setAttribute("src", info.imageUrl)
            elementImage.classList.add('rarity_item-image')
            const newNftCard = document.createElement('div')
            newNftCard.classList.add('owned-nfts_item-component')
            newNftCard.appendChild(elementImage)
            newNftCard.appendChild(rarityItemContentWrapper)
            nftLayout.appendChild(newNftCard)
          })
        })
        let sum = 0;
        totalNftsOfUser.innerText = tokens.length
        totalNftsOfUserSpan.innerText = '('+tokens.length+')'
        unityLeadersOfUser.innerText = sum
          if(tokens.length > 0) {
          ['0','1','2','3','4','5'].forEach((value,i) => {
          if(tokens[i] === value) {
           sum++;
          }
         })
         unityLeadersOfUser.innerText = sum; 
        }
      })   
    }
  } catch(error) {
  	console.log(error)
  }
}
const claimToken = async function () {
	claimButton.classList.add('is-hidden')
  loadingState.classList.remove('is-hidden')
	const accounts = await ethereum.request({ method: 'eth_accounts' });
  if(claimButton.innerText === 'CLAIM') {
  contractToken.methods.claim().send({
  		from: accounts[0],
      to: CONTRACT_ADDRESS_TOKEN,
  }).then((claim) => {
  		claimButton.classList.remove('is-hidden')
  		loadingState.classList.add('is-hidden')
     	balance += sumToClaim
      balanceText.innerText = balance
   	 	claimButton.classList.add('is-disabled')
      totalClaimable.innerText = 0;
  }).catch(error => {claimButton.classList.remove('is-hidden')
  	loadingState.classList.add('is-hidden')
  })
  } else { 
  contractToken.methods.start().send({
  		from: accounts[0],
      to: CONTRACT_ADDRESS_TOKEN,
  }).then((claim) => {
  claimButton.classList.remove('is-hidden')
  loadingState.classList.add('is-hidden')
  sumToClaim += balance
  balanceText.innerText = web3.utils.fromWei(sumToClaim.toString(), 'ether')
	claimButton.classList.add('is-disabled')
  totalClaimable.innerText = 0;
  }) 
  }
}
claimButton.addEventListener('click', claimToken)
connectButton.addEventListener('click', connectWallet)
if(!window.ethereum) {
	connectedTo.innerText = 'PLEASE INSTALL METAMASK'
  connectedTo.classList.remove('is-hidden')
  connectButton.classList.add('is-hidden')
}
ethereum.on('chainChanged', handleChainChanged);
function handleChainChanged(_chainId) {
  if(_chainId !== CHAIN_ID) {
  	connectButton.classList.add('is-hidden')
    connectedTo.classList.remove('is-hidden')
  	connectedTo.innerText = 'PLEASE CHANGE YOUR CHAIN TO THE MAINNET'
	 } else {
   window.location.reload(); 
   }
}
ethereum.on('accountsChanged', handleAccountChanged);
function handleAccountChanged(_account) {
	if(connectedTo.innerText !== '') {
  	window.location.reload();
  }
}
