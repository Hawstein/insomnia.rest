import React from 'react';
import SocialCards from '../components/social-cards';
import Contributors from '../partials/contributors';
import Title from '../partials/title';
import {Facebook, GooglePlus, Twitter} from '../partials/share-buttons';
import Link from '../components/link';
import {links} from '../config';

export default class extends React.Component {
  onClickDownload(e) {
    const args = e.currentTarget.getAttribute('data-ga').split(':');
    ga('send', 'event', args[0], args[1], args[2]);
  }

  componentDidMount() {
    if (window.location.hash === '#mac') {
      window.location = links.builds.mac;
      ga('send', 'event', 'Download', 'Mac');
    } else if (window.location.hash === '#windows') {
      window.location = links.builds.windows;
      ga('send', 'event', 'Download', 'Windows');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title>Download</Title>
        <article>
          <SocialCards title="Insomnia" summary="Download the Insomnia app" isBanner/>
          <header className="container header--big">
            <div className="row">
              <div className="col-12">
                <h1>Download Insomnia</h1>
                <p className="text-lg">
                  So you can finally <code>GET</code> some <code>REST</code> 😴
                </p>
              </div>
            </div>
          </header>
          <section className="container">
            <div className="row center">
              <div className="col-4 platform-download">
                <i className="platform-download__icon apple"/>
                <p>
                  <Link to={links.builds.mac}
                        data-ga="Download:Mac"
                        onClick={this.onClickDownload.bind(this)}
                        className="button">
                    <svg className="icon" viewBox="0 0 512 512">
                      <path
                        d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    {' '}
                    OS X 10.9+
                  </Link>
                </p>
                <p className="subtle small" style={{maxWidth: '12rem', margin: 'auto'}}>
                  or <code>brew cask install insomnia</code>
                </p>
              </div>
              <div className="col-4 platform-download">
                <i className="platform-download__icon windows"/>
                <p>
                  <Link to={links.builds.windows}
                        data-ga="Download:Windows"
                        onClick={this.onClickDownload.bind(this)}
                        className="button">
                    <svg className="icon" viewBox="0 0 512 512">
                      <path
                        d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    {' '}
                    Windows 7+
                  </Link>
                </p>
                <p className="subtle small" style={{maxWidth: '12rem', margin: 'auto'}}>
                  (64-bit only)
                </p>
              </div>
              <div className="col-4 platform-download">
                <i className="platform-download__icon linux bg-linux"/>
                <p>
                  <Link to="https://support.insomnia.rest/article/23-installation#ubuntu"
                        data-ga="Download:Linux:Ubuntu"
                        onClick={this.onClickDownload.bind(this)}
                        className="button">
                    <svg className="icon" viewBox="0 0 512 512">
                      <path
                        d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    {' '}
                    Ubuntu 14.04+
                  </Link>
                </p>
                <p className="subtle small" style={{maxWidth: '12rem', margin: 'auto'}}>
                  or
                  {' '}
                  <Link to="https://support.insomnia.rest/article/23-installation#linux"
                        onClick={this.onClickDownload.bind(this)}
                        data-ga="Download:Linux:AUR">
                    Other Linux Distros
                  </Link>
                </p>
              </div>
            </div>
            <div className="row center">
              <div className="col-12">
                <hr/>
              </div>
            </div>
            <div className="row center">
              <div className="col-3"/>
              <div className="col-6">
                <h2>One more thing before you go?</h2>
                <p>
                  Help out by spreading the word &#128522;
                </p>
                <div className="share-buttons">
                  <Twitter title="I just downloaded Insomnia! https://insomnia.rest"/>
                  &nbsp;
                  <Facebook title="I just downloaded Insomnia! https://insomnia.rest"/>
                  &nbsp;
                  <GooglePlus title="I just downloaded Insomnia! https://insomnia.rest"/>
                </div>
              </div>
            </div>
          </section>
        </article>
        <Contributors/>
      </React.Fragment>
    );
  }
}
