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

export default class SocailSharing extends Component {
  render() {
    const shareUrl = 'https://sponserinitial.netlify.app/en';
    return (
      <div>
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            quote={"I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website"}
            hashtag={'#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة'}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={40}  />
          </FacebookShareButton>
        </div>

        <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            quote={"I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website"}
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={40}  />
          </WhatsappShareButton>
        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton
            url={shareUrl}
            quote={"I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website"}
            hashtag={'#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة'}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={40} />
          </LinkedinShareButton>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            quote={"I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website"}
            hashtag={'#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة'}
            className="Demo__some-network__share-button"
          >
            <XIcon size={40} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    );
  }
}