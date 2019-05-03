const scopedClassMaker = (prefix: string) => (name?: string) => {
    return [prefix, name].filter(Boolean).join('-');
}

export {scopedClassMaker}