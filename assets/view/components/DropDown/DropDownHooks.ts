function showDropDownByTaskId(taskId: number, e: React.MouseEvent) {
    const dropDown = document.getElementById('dropdown' + taskId) as HTMLElement
    const targetElementOffsets = (e.currentTarget as HTMLElement).getBoundingClientRect()
    dropDown.classList.toggle('dropdown__show')
    dropDown.classList.toggle('dropdown__open')
    dropDown.style.top = (targetElementOffsets.top - dropDown.clientHeight - 9) + 'px'
    dropDown.style.left = targetElementOffsets.left + 'px'
}


export { showDropDownByTaskId }