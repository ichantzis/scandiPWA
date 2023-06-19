/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Page } from '@scandipwa/scandipwa/src/component/Header/Header.config';
import MenuIcon from '@scandipwa/scandipwa/src/component/MenuIcon';
import { isCrawler, isSSR } from '@scandipwa/scandipwa/src/util/Browser';

import Menu from 'Component/Menu';
import OfflineNotice from 'Component/OfflineNotice';
import {
    CartOverlay,
    HeaderComponent as SourceHeaderComponent,
    MyAccountOverlay,
} from 'SourceComponent/Header/Header.component';
import { ReactElement } from 'Type/Common.type';

import './Header.override.style';

export {
    CartOverlay,
    MyAccountOverlay,
};

/** @namespace Demo/Component/Header/Component */
export class HeaderComponent extends SourceHeaderComponent {
    menuClick = () => {
        document.body.classList.add('overlay-active');
    };

    renderMenu(): ReactElement {
        const { isCheckout } = this.props;

        if (isCheckout) {
            return null;
        }

        return <Menu />;
    }

    render(): ReactElement {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device: { isMobile },
        } = this.props;

        if (!isMobile) {
            // hide edit button on desktop
            stateMap[Page.CUSTOMER_WISHLIST].edit = false;
            stateMap[Page.CUSTOMER_WISHLIST].share = false;
            stateMap[Page.CART_OVERLAY].edit = false;
        }

        return (
            <section
              block="Header"
              elem="Wrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                <header
                  block="Header"
                  mods={ { name, isHiddenOnMobile, isCheckout } }
                  mix={ { block: 'FixedElement', elem: 'Top' } }
                  ref={ this.logoRef }
                >
                    { this.renderTopMenu() }
                    <nav block="Header" elem="Nav">
                        <div onClick={ this.menuClick }>
                            <MenuIcon />
                        </div>
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                </header>
                <OfflineNotice />
            </section>
        );
    }
}

export default HeaderComponent;
