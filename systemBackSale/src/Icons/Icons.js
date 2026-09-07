import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import { faBell,faEnvelope, } from '@fortawesome/free-regular-svg-icons'


import {
     faUser,
      faArrowRight,
      faDesktop,
      faPenFancy,
      faTrashCan,
      faPlus,
      faMagnifyingGlass
    
    } from "@fortawesome/free-solid-svg-icons";

// Add icons to library
library.add(
    // ----testing icons
            // faUser, 
            faArrowRight, 
            // faFacebook,

            //--- used
            faDesktop,
            faBell,
            faEnvelope,        
            faPenFancy,
            faTrashCan,
            faPlus,
            faMagnifyingGlass
        );

export {FontAwesomeIcon}