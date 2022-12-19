import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/PucMarketplace.json'
import Token from '../abis/PucCoin.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    const marketplaceAddr = networkData.address
    if (networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
      this.setState({ marketplace, token, marketplaceAddr })
      const productCount = await marketplace.methods.productCount().call()
      // console.log(productCount.toString())
      this.setState({ productCount })
      //Load products
      for (let i = 0; i < productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
      console.log(this.state.products)
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    // this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct = (name, price) => {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .on('receipt', (receipt) => {
        this.setState({ loading: false })
        window.location.reload();
      })
  }
  
  purchaseProduct(id, price) {
    this.setState({ loading: true })

    console.log("Approving PUC transfer...")  
    this.state.token.methods.approve(this.state.marketplaceAddr, price).send({ from: this.state.account })
      .on('receipt', (receipt) => {
        console.log("Approved. Purchasing product...")
        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account })
                .on('receipt', (receipt) => {
                        console.log("Purchased.")
                        this.setState({ loading: false })
                        window.location.reload()
                })
                .on('error', function(error, receipt) { 
                      console.log(error);
                      //window.location.reload()


        })

      })
    
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  products = {this.state.products}
                  createProduct = {this.createProduct}
                  purchaseProduct = {this.purchaseProduct} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
