import React, { Component } from 'react';
import "./SocailSharing.css"

import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    LinkedinShareButton,
    XIcon,
    LinkedinIcon,
    TwitterShareButton
} from 'react-share';


// function generateRandomSponsorValue() {
//     const randomInteger = Math.floor(Math.random() * 90000) + 10000;
//     return `SPONSER-${randomInteger}`;
//   }


const SocialSharing  = () => {
    const shareUrl = "https://sponserinitial.netlify.app/en"
    const title = `I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website.`
    // const sponsorValue = generateRandomSponsorValue();
    // I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website. This is my Sponser Number ${sponsorValue}. 
    // #Sponser #Gaza #GazaStrip #Palestine #مؤاخاة 
    // My #${sponsorValue} Number. 
    return (
        <div>
            <div className="Demo__some-network">
                <FacebookShareButton
                    url={shareUrl}
                    hashtag={`#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة `}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={40} />
                </FacebookShareButton>
            </div>

            <div className="Demo__some-network">
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <WhatsappIcon size={40} />
                </WhatsappShareButton>
            </div>

            <div className="Demo__some-network">
                <LinkedinShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <LinkedinIcon size={40} />
                </LinkedinShareButton>
            </div>

            <div className="Demo__some-network">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    hashtag={'#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة'}
                    className="Demo__some-network__share-button"
                >
                    <XIcon size={40} round={true} />
                </TwitterShareButton>
            </div>
        </div>
    );
}

export default SocialSharing