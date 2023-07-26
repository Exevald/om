const removeExtraBlanks = (str: string) => (
    str.replace(/\s+/g, " ").trim()
)

export {removeExtraBlanks}