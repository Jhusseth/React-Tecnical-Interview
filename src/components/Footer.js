import React from 'react'
import {
    faFacebook,
    faGithub,
    faLinkedin

} from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {

    const year = new Date().getFullYear();
    return (
        <>
            <div className="bg-transparent footer dark:z-0">
                <div className=" flex justify-center text-center items-center">

                    <div className="mr-5">
                    <a className="rounded-full text-app dark:text-white text-xs shadow-lg" href="https://www.facebook.com/jhussethvaironel.sanchezarias" target="blank">
                        <FontAwesomeIcon icon={faFacebook} size="3x" />
                    </a>
                    </div>
                    <div>
                    <a className="rounded-full text-app dark:text-white text-xs shadow-lg" href="https://github.com/Jhusseth" target="blank">
                        <FontAwesomeIcon icon={faGithub} size="3x" />
                    </a>
                    </div>
                    <div className="ml-5">
                    <a className="rounded-full text-app dark:text-white text-xs shadow-lg" href="https://www.linkedin.com/in/jhusseth-sanchez" target="blank">
                        <FontAwesomeIcon icon={faLinkedin} size="3x" />
                    </a>
                    </div>

                </div>
                <div className='flex justify-center mt-4 dark:text-white'>
                    © <b>{year}</b>
                </div>
                <div className='flex justify-center dark:text-white'>
                    <b>Jhusseth</b>   
                </div>
            </div>
        </>
    )
}
