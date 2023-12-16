import { renderProjects, renderTasks } from "./DOMEvent";

const DOM_DRAW = () => {
    const container = document.getElementById('container');

    const headerDraw = () => {
        const header = document.createElement('header');
        header.setAttribute('id', 'header');

        // Header Navigation
        const headerNav = document.createElement('nav');
        headerNav.setAttribute('id', 'header-nav');
        const headerNavList = document.createElement('ul');
        headerNavList.setAttribute('id', 'header-nav-list');
        const headerNavListItems = ['Home'];
        headerNavListItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'header-nav-list-item');
            listItem.textContent = item;
            headerNavList.appendChild(listItem);
        });
        headerNav.appendChild(headerNavList);
        header.appendChild(headerNav);

        // Header Title
        const headerTitle = document.createElement('h1');
        headerTitle.setAttribute('id', 'header-title');
        headerTitle.textContent = 'Todo List';
        header.appendChild(headerTitle);

        // Header Search *TODO*
        const headerSearch = document.createElement('div');
        headerSearch.setAttribute('id', 'header-search');
        const headerSearchInput = document.createElement('input');
        headerSearchInput.setAttribute('id', 'header-search-input');
        headerSearchInput.setAttribute('type', 'text');
        headerSearchInput.setAttribute('placeholder', 'Search');
        headerSearch.appendChild(headerSearchInput);
        header.appendChild(headerSearch);

        container.appendChild(header);
    };

    const sideModalDraw = (mainContent) => {
        const sideModal = document.createElement('aside');
        sideModal.setAttribute('id', 'side-modal');

        // Upper Side Modal Content
        const upperSideModalContent = document.createElement('section');
        upperSideModalContent.setAttribute('id', 'upper-modal-content');
        sideModal.appendChild(upperSideModalContent);

        // Line Break
        const lineBreak = document.createElement('hr');
        lineBreak.setAttribute('id', 'line-break');
        sideModal.appendChild(lineBreak);

        // Lower Side Modal Content
        const lowerSideModalContent = document.createElement('section');
        lowerSideModalContent.setAttribute('id', 'projects-container');
        sideModal.appendChild(lowerSideModalContent);

        mainContent.appendChild(sideModal);
    };

    const taskContainerDraw = (mainContent) => {
        const taskContainer = document.createElement('section');
        taskContainer.setAttribute('id', 'task-container');

        mainContent.appendChild(taskContainer);
    };

    const mainContentDraw = () => {
        const mainContent = document.createElement('section');
        mainContent.setAttribute('id', 'main-content');

        sideModalDraw(mainContent);
        taskContainerDraw(mainContent);

        container.appendChild(mainContent);
    };

    headerDraw();
    mainContentDraw();
    renderProjects();
    // renderTasks();
};

export default DOM_DRAW;