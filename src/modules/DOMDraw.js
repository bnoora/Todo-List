const DOM_DRAW = () => {
    const container = document.getElementById('container');

    const headerDraw = () => {
        const header = document.createElement('header');
        header.setAttribute('id', 'header');

        // Header Title
        const headerTitle = document.createElement('h1');
        headerTitle.setAttribute('id', 'header-title');
        headerTitle.textContent = 'Todo List';
        header.appendChild(headerTitle);

        // Header Navigation
        const headerNav = document.createElement('nav');
        headerNav.setAttribute('id', 'header-nav');
        const headerNavList = document.createElement('ul');
        headerNavList.setAttribute('id', 'header-nav-list');
        const headerNavListItems = ['Home', 'Projects', 'Tasks'];
        headerNavListItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('class', 'header-nav-list-item');
            listItem.textContent = item;
            headerNavList.appendChild(listItem);
        });
        headerNav.appendChild(headerNavList);

        // Header Search *TODO*
        const headerSearch = document.createElement('div');
        headerSearch.setAttribute('id', 'header-search');
        const headerSearchInput = document.createElement('input');
        headerSearchInput.setAttribute('id', 'header-search-input');
        headerSearchInput.setAttribute('type', 'text');
        headerSearchInput.setAttribute('placeholder', 'Search');
        headerSearch.appendChild(headerSearchInput);
        headerNav.appendChild(headerSearch);

        container.appendChild(header);
    };

    const sideModalDraw = () => {
        const sideModal = document.createElement('div');
        sideModal.setAttribute('id', 'side-modal');

        // Side Modal Content
        const sideModalContent = document.createElement('section');
        sideModalContent.setAttribute('id', 'task-modal-content');
        sideModal.appendChild(sideModalContent);

        // Upper Side Modal Content
        const upperSideModalContent = document.createElement('section');
        upperSideModalContent.setAttribute('id', 'upper-modal-content');
        sideModalContent.appendChild(upperSideModalContent);

        // Line Break
        const lineBreak = document.createElement('hr');
        lineBreak.setAttribute('id', 'line-break');
        upperSideModalContent.appendChild(lineBreak);

        // Lower Side Modal Content
        const lowerSideModalContent = document.createElement('section');
        lowerSideModalContent.setAttribute('id', 'projects-container');
        sideModalContent.appendChild(lowerSideModalContent);
    };

    const taskContainerDraw = () => {
        const taskContainer = document.createElement('section');
        taskContainer.setAttribute('id', 'task-container');
    };

    headerDraw();
    sideModalDraw();
    taskContainerDraw();
};

export default DOM_DRAW;