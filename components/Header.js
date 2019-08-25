import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '11px' }}>
            {/* <Image src='https://www.kcl.ac.uk/SiteElements/2017/images/kcl-logo.svg' size='small' /> */}
            <Link route="/">
                <a className="item">
                    <h3>Job Market</h3>
                </a>
            </Link>
            <Link route="/users/registeruser">
                <a className="item">
                    <h5>Register As a User</h5>
                </a>
            </Link>
            <Link route="/users/registercompany">
                <a className="item">
                    <h5>Register As a Company</h5>
                </a>
            </Link>
            <Link route="/users/showcompanylist">
                <a className="item">
                    <h5>List of Companies</h5>
                </a>
            </Link>
            <Link route="/users/showjobseekerlist">
                <a className="item">
                    <h5>List of Job Seekers</h5>
                </a>
            </Link>
        </Menu>
    )
}
