import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import { CookiePopupComponent as SourceCookiePopupComponent } from 'SourceComponent/CookiePopup/CookiePopup.component';
import { ReactElement } from 'Type/Common.type';

/** @namespace Demo/Component/CookiePopup/Component */
export class CookiePopupComponent extends SourceCookiePopupComponent {
    renderCookieText(): ReactElement {
        // const { cookieText } = this.props;
        const cookieText1 = 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας! ';
        const cookieText2 = ' σχετικά με τους κανόνες του GDPR στους όρους χρήσης.';

        return (
            <p block="CookiePopup" elem="Content">
                { cookieText1 }
                { this.renderCookieLink() }
                { cookieText2 }
            </p>
        );
    }

    renderCookieLink(): ReactElement {
        // const { cookieLink } = this.props;
        const cookieLink = '/privacy-policy-cookie-restriction-mode';

        if (!cookieLink) {
            return null;
        }

        return (
            <Link
              block="CookiePopup"
              elem="Link"
              to={ cookieLink }
            >
                { __('Μάθετε περισσοτερα') }
            </Link>
        );
    }

    renderCTA(): ReactElement {
        return (
            <div
              block="CookiePopup"
              elem="CTA"
            >
                <button
                  block="Button"
                  onClick={ this.acceptCookies }
                  onKeyDown={ this.acceptCookies }
                >
                    Αποδοχή
                </button>
            </div>
        );
    }

    render(): ReactElement {
        const { cookieText } = this.props;
        const { isAccepted } = this.state;

        if (!cookieText || isAccepted) {
            return null;
        }

        return (
            <div block="CookiePopup">
                <ContentWrapper
                  mix={ { block: 'CookiePopup', elem: 'Wrapper' } }
                  wrapperMix={ { block: 'CookiePopup', elem: 'ContentWrapper' } }
                >
                    { this.renderCookieText() }
                    { this.renderCTA() }
                </ContentWrapper>
            </div>
        );
    }
}

export default CookiePopupComponent;
