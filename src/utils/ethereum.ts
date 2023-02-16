// Check for MetaMask wallet browser extension
function hasEthereum() {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
}

// Request wallet account
async function requestAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts;
}

export { hasEthereum, requestAccount };
