import React from 'react';
import styles from '../styles/Join.module.scss'
import Navbar from '../components/Navbar/Navbar'
import Building from '../asset/image/Property.jpg'
import Image from 'next/image'
import {BigNumber, ethers, providers, Contract} from 'ethers';
import Web3Modal from 'web3modal';
import {useState, useEffect, useRef} from 'react';

import { FETCHVOTESADDRESS, FETCHIDADDRESS, fetchvotesabi, fetchidabi} from "../components/constants";

const join = () =>  { 
    const web3modalref = useRef(); 
    const[proposalId, setProposalId] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => { 
        web3modalref.current = new Web3Modal({ 
            network: "kovan",
            providerOptions: {},
            disableInjectedProvider: false,
        })
        Connect();
        returnId();
      });
    const Connect = async() => { 
        try { 
          await getProviderOrSigner();
          setIsConnected(true);
        }catch(err) { 
          console.error(err);
        }
      };
    
    
        const getProviderOrSigner = async(needSigner = false) => { 
        const provider = await web3modalref.current.connect(); 
        const web3provider = new providers.Web3Provider(provider);
      
        const signer = web3provider.getSigner(); 
        const address = await signer.getAddress();
    
        //check if chainID is kovan 
        const {chainId} = await web3provider.getNetwork(); 
        if(chainId !== 42) { 
          window.alert("You are on the Wrong Network, Swich to Kovan"); 
        }
    
        if(needSigner) { 
          const signer = web3provider.getSigner();
          return signer;
        }
        return web3provider;
      };

      const requestBytes = async() => { 
        try { 
          const signer = await getProviderOrSigner(true); 
          const contract = new Contract(
            FETCHIDADDRESS,
            fetchidabi,
            signer
          );
          const tx = await contract.requestBytes();
          setLoading(true);
          //wait for transaction to get mined
          await tx.wait();
          setLoading(false);
    
        }catch(err) { 
          console.error(err);
        }
    
      }
    
    
     const returnId = async() => { 
        try { 
          const provider = await getProviderOrSigner(); 
          const contract = new Contract(
            FETCHIDADDRESS,
            fetchidabi,
            provider
          );
            const tx = await contract.returnProposalId()
            setProposalId(tx); 
            console.log(tx);
        }catch(err) { 
          console.error(err); 
        }
      }
    
      //Fetching Votes from the Latest Contract 
      //Check The Votes on That ProposalID being fetched
      const requestVotes = async() => { 
        try { 
          const signer = await getProviderOrSigner(true);
          const voteContract = new Contract( 
            FETCHVOTESADDRESS,
            fetchvotesabi,
            signer
          );
            const tx = voteContract.requestVotes(1);
            setLoading(true);
            console.log(tx);
            await tx.wait();
            setLoading(false);
    
        }catch(err) { 
          console.error(err);
        }
      };
    
    
    

    return ( 
        <div>
            <Navbar />
            <section className = {styles.sectionTop} >
                <div className = {styles.proposalInformation}>
                    <div className = {styles.imageContainer}>
                            <Image src = {Building} />
                            <button onClick = {requestBytes}>Request LatestId</button>
                            <button onClick = {requestVotes}>Request Votes</button>
                    </div>
                </div>

                <div className = {styles.proposalDetails}>
                        <h1>Title Of Proposal</h1>
                        <h1>{proposalId}</h1>
                </div>

            </section>

            
        </div>
       

    )


};

export default join;