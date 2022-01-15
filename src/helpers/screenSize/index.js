export function handleScreenChange(setCollapsed) {

    window.addEventListener('load', getWidth)
    window.addEventListener('resize', getWidth)

    function getWidth() {
        window.innerWidth > 768 ? setCollapsed(false) : setCollapsed(true)
    }

}

export function handleModalSize(setWidth) {

    let width;
    window.addEventListener('load', getWidth)
    window.addEventListener('resize', getWidth)
    getWidth()

    function getWidth() {
        if (window.innerWidth < 600) {
            width = '90%'
            setWidth(width)

        } else {
            width = '35%'
            setWidth(width)
        }

    }

}