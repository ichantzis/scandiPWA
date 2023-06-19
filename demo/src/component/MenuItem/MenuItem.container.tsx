import { scrollToTop } from '@scandipwa/scandipwa/src/util/Browser/Browser';
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MenuItemContainer as SourceMenuItemContainer,
} from 'SourceComponent/MenuItem/MenuItem.container';
import history from 'Util/History';

export {
    mapDispatchToProps,
    mapStateToProps,
};

/** @namespace Demo/Component/MenuItem/Container */
export class MenuItemContainer extends SourceMenuItemContainer {
    menuClose = () => {
        document.body.classList.remove('overlay-active');
    };

    onItemClick(): void {
        const {
            closeMenu,
            updateBreadcrumbs,
            activeMenuItemsStack,
            item: {
                url,
            } = {},
        } = this.props;

        const newPathname = this.getPathname(url || '');

        this.menuClose();
        scrollToTop();
        closeMenu();

        // keep the stack here, so later we can deconstruct menu out of it
        const { pathname } = location;

        history.push(pathname, { stack: activeMenuItemsStack });

        if (pathname !== newPathname) {
            updateBreadcrumbs();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
