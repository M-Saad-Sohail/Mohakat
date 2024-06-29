import React, { useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useTranslations } from 'next-intl';
import { getUserFromLocalStorage } from '@/utils/auth';
const WebTour = () => {
  const t = useTranslations('WebTour');

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (!user) {
      const tour = driver({
        showProgress: true,
        steps: [
          { 
            element: '#sponsor', 
            popover: { 
              title: t("sponsorTitle"), 
              description: t("sponsorDesc"), 
              side: "top", 
              align: 'end' 
            }
          },
          { 
            element: '.anonomous', 
            popover: { 
              title:  t("anonymousTitle"), 
              description:  t("anonymousDesc"), 
              side: "bottom", 
              align: 'start' 
            }
          },
          { 
            element: '#register_family', 
            popover: { 
              title:  t("registerFamilyTitle"), 
              description:  t("registerFamilyDesc"),
              side: "bottom", 
              align: 'start' 
            }
          },
          { 
            element: '.change_language', 
            popover: { 
              title:  t("changeLanguageTitle"), 
              description:  t("changeLanguageDesc"),
              side: "top", 
              align: 'end' 
            }
          },
        ]
      });
      tour.drive();
    }
  }, []);

  return null; // This component does not render anything visible
};

export default WebTour;


