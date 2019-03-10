import merge from 'deepmerge';

export default function(...extensions) {
    let base = {}

    for(const extension of extensions) {
        base = merge(base, extension)
    }

    return base
}