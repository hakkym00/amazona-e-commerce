//  sidebar

const openSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('sidebar-cliked')
}

const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('sidebar-cliked')
}
console.log('working')