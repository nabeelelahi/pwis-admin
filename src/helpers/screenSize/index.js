export function handleScreenChange(setCollapsed) {

    window.addEventListener('load', getWidth)
    window.addEventListener('resize', getWidth)

    function getWidth() {
        window.innerWidth > 768 ? setCollapsed(false) : setCollapsed(true)
    }

}