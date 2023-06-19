/* eslint-disable react/forbid-dom-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getSortedItems } from '@scandipwa/scandipwa/src/util/Menu/Menu';
import { ReactElement } from 'react';

import CompareIcon from 'Component/CompareIcon';
import Link from 'Component/Link';
import {
    MenuComponent as SourceMenuComponent,
} from 'SourceComponent/Menu/Menu.component';

import './Menu.override.style';

/** @namespace Demo/Component/Menu/Component */
export class MenuComponent extends SourceMenuComponent {
    menuClose = () => {
        document.body.classList.remove('overlay-active');
    };

    renderComparePageLink(): ReactElement {
        // const { device } = this.props;

        // if (!device.isMobile) {
        //     return null;
        // }

        return (
            <div block="Menu" elem="CompareLinkWrapper">
                <Link onClick={ this.menuClose } to="compare" block="Menu" elem="CompareLink">
                    <CompareIcon />
                    <h4>{ __('Compare products') }</h4>
                    { this.renderCompareCount() }
                </Link>
            </div>
        );
    }

    renderTopLevel(): ReactElement {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return <div block="Menu" elem="MainCategoriesPlaceholder" />;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));

        return (
            <>
                <div onClick={ this.menuClose } block="Menu" elem="MobileLayer" />
                <div block="Menu" elem="MainCategories">
                <header
                  block="Menu"
                  elem="MobileHeader"
                >
                    <Link to="/" block="Menu" elem="LogoWrapper" onClick={ this.menuClose }><img src="https://40kskudemo.scandipwa.com/media/logo/stores/1/us-_v4.png" alt="ScandiPWA logo" /></Link>
                    <button onClick={ this.menuClose } block="Menu" elem="MobileCloseIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
                    </button>
                </header>
                    { this.renderAdditionalInformation(true) }
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                      aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel.bind(this)) }
                    </ul>
                </div>
                { this.renderSubMenuDesktop(children) }
            </>
        );
    }
}

export default MenuComponent;
