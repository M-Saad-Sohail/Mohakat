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
import { useTranslations } from 'next-intl';


const SocialSharing  = () => {
    const shareUrl = "https://moakhat.org/en"
    const title = `I'm proud to be a sponsor for the people of Gaza and Palestine. You can also join the cause and make a positive impact by visiting this website.`
    const t = useTranslations('Socail');
    return (
        <div className="Demo__some-network">
                <FacebookShareButton
                    url={shareUrl}
                    hashtag={`#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة `}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={40} />
                </FacebookShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    title= {t("title")}
                    className="Demo__some-network__share-button"
                >
                    <WhatsappIcon size={40} />
                </WhatsappShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                    title= {t("title")}
                    className="Demo__some-network__share-button"
                >
                    <LinkedinIcon size={40} />
                </LinkedinShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title= {t("title")}
                    hashtag={'#Sponser #Gaza #GazaStrip #Palestine #مؤاخاة'}
                    className="Demo__some-network__share-button"
                >
                    <XIcon size={40} round={true} />
                </TwitterShareButton>
        </div>
    );
}

export default SocialSharing