export function urlToFileName(url) {
    return url.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html'
}
